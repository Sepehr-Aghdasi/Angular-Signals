import { NgForOf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { User, UserRole } from '../shared/types/user.type';
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
  public userList = signal<User[]>([]);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    this.getUserList();
    // }, 3000);
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
}
