import { NgForOf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, signal, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, computed } from '@angular/core';
import { take } from 'rxjs';
import { RoleModel, User, UserRole } from '../shared/types/user.type';
import { UserService } from '../shared/services/user.service';
import { AddUserForm } from './add-user.type';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
})
export class AddUserComponent implements OnInit, OnChanges {
  public form = new FormGroup<AddUserForm>({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    role: new FormControl(null)
  });

  public roleList = signal<RoleModel[]>([]);

  private userList = signal<User[]>([]);
  private lastUserId = computed(() => {
    return this.userList()[this.userList().length - 1].userId;
  });

  public selectedRole: UserRole = UserRole.None;
  public userModel: User | null = null

  @Input() user: User; // For editing a user
  @Input({ alias: "userList" }) _userList: User[] = [];
  @Output() addUser = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getRoleList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { user, _userList } = changes;

    if (user && user.currentValue) {
      this.userModel = user.currentValue;
      this.initializeForm(user.currentValue);
    }

    if (_userList) {
      this.userList.set(_userList.currentValue);
    }
  }

  getRoleList(): void {
    this.userService.getRoleList()
      .pipe(take(1))
      .subscribe(res => {
        this.roleList.set(res);
      });
  }

  selectRole(event: Event): void {
    const value = +(event.target as HTMLSelectElement).value as UserRole;
    this.selectedRole = value;
  }

  saveUser(): void {
    const userExist: boolean = this.userList().some(user => user.userId === this.user?.userId);

    if (userExist) {
      const userIndex: number = this.userList().findIndex(x => x.userId === this.user.userId);

      this.userList()[userIndex] = {
        userId: this.userList()[userIndex].userId,
        name: this.form.controls.name.value.trim().charAt(0).toUpperCase() + this.form.controls.name.value.trim().slice(1),
        lastName: this.form.controls.lastName.value.trim().charAt(0).toUpperCase() + this.form.controls.lastName.value.trim().slice(1),
        age: this.form.controls.age.value,
        role: this.selectedRole
      };

      this.addUser.emit(this.userList()[userIndex]);
      this.resetForm();
      return;
    }

    const userId: number = this.lastUserId() + 1;

    const user = new User({
      userId: userId,
      name: this.form.controls.name.value.trim().charAt(0).toUpperCase() + this.form.controls.name.value.trim().slice(1),
      lastName: this.form.controls.lastName.value.trim().charAt(0).toUpperCase() + this.form.controls.lastName.value.trim().slice(1),
      age: this.form.controls.age.value,
      role: this.selectedRole
    });

    this.addUser.emit(structuredClone(user));
    this.resetForm();
  }

  initializeForm(user: User): void {
    this.selectedRole = this.roleList().find(x => x.roleId === user.role).roleId;

    this.form.controls.name.setValue(user.name);
    this.form.controls.lastName.setValue(user.lastName);
    this.form.controls.age.setValue(user.age);
    this.form.controls.role.setValue(this.selectedRole);
  }

  resetForm(): void {
    this.userModel = null;
    this.selectedRole = UserRole.None;
    this.form.reset();
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }
}
