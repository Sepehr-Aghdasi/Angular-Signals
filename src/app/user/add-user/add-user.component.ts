import { NgForOf } from '@angular/common';
import { Component, signal, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { RoleModel, User } from '../shared/types/user.type';
import { AddUserForm } from './add-user.type';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
})
export class AddUserComponent implements OnInit {
  public form = new FormGroup<AddUserForm>({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    role: new FormControl(null)
  });

  public roleList = signal<RoleModel[]>([]);
  public userId: number = 3;

  @Output() addUser = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getRoleList();
  }

  getRoleList(): void {
    this.userService.getRoleList()
      .pipe(take(1))
      .subscribe(res => {
        this.roleList.set(res);
      });
  }

  saveUser(): void {
    this.userId += 1;

    const user = new User({
      userId: this.userId,
      name: this.form.controls.name.value.trim().charAt(0).toUpperCase() + this.form.controls.name.value.trim().slice(1),
      lastName: this.form.controls.lastName.value.trim().charAt(0).toUpperCase() + this.form.controls.lastName.value.trim().slice(1),
      age: this.form.controls.age.value,
      role: this.form.controls.role.value
    });

    this.form.reset();
    this.addUser.emit(user);
  }

  restForm(): void {
    this.form.reset();
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }
}
