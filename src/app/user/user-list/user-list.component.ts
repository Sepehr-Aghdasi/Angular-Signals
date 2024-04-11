import { NgForOf } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../shared/types/user.type';
import { UserService } from '../shared/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserRolePipe } from '../shared/pipes/user-role.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [NgForOf, AddUserComponent, UserRolePipe]
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

  private userList = signal<User[]>([]);
  private userListChangeEffect = effect(() => console.log("User list change", this.userList()));
  public userListTotal = computed<number>(() => {
    return this.filteredUserList().length;
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getUserList();
    }, 1000);
  }

  userAdded(newUser: User): void {
    this.userList.update(oldValue => {
      return [...oldValue, newUser];
    });
  }

  getUserList(): void {
    this.userService.getUserList()
      .pipe(take(1))
      .subscribe(res => {
        this.userList.set(res);
      });
  }

  searchChanges(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }
}
