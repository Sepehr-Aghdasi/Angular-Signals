import { ChangeDetectionStrategy, Component, OnInit, computed, effect, signal } from '@angular/core';
import { NgForOf } from '@angular/common';
import { take } from 'rxjs';
import { User } from '../shared/types/user.type';
import { UserRolePipe } from '../shared/pipes/user-role.pipe';
import { UserService } from '../shared/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [NgForOf, AddUserComponent, UserRolePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  public search = signal<string>("");
  private searchChangeEffect = effect(() => console.log("Search change", this.search()));

  public filteredUserList = computed(() => {
    return this.userList().filter(user => {
      const username: string = `${user.name} ${user.lastName}`;
      return username.trim().toLocaleLowerCase().includes(this.search().trim().toLocaleLowerCase());
    });
  });

  public userList = signal<User[]>([]);
  public userListTotal = computed<number>(() => {
    return this.filteredUserList().length;
  });
  private userListChangeEffect = effect(() => console.log("User list change", this.userList()));

  public editUserMode: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getUserList();
    }, 1000);
  }

  userAdded(newUser: User): void {
    this.userList.update(oldValue => {
      const userExist: boolean = oldValue.some(user => user.userId === newUser.userId);

      if (userExist) {
        const userIndex: number = oldValue.findIndex(x => x.userId === newUser.userId);

        oldValue[userIndex] = structuredClone(newUser);
        return [...oldValue];
      }

      return [...oldValue, newUser];
    });

    this.editUserMode = null;
  }

  getUserList(): void {
    this.userService.getUserList()
      .pipe(take(1))
      .subscribe(res => {
        this.userList.set(res);
      });
  }

  editUserViaId(user: User): void {
    this.editUserMode = structuredClone(user);
  }

  searchChanges(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }
}
