import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole, User, RoleModel } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: User[] = [
    { userId: 1, name: "Saeed", lastName: "Saboui", age: 23, role: UserRole.CEO },
    { userId: 2, name: "Parsa", lastName: "Moghbeli", age: 20, role: UserRole.CTO },
    { userId: 3, name: "Aref", lastName: "Kadkhodaei", age: 20, role: UserRole.Designer }
  ];

  private roleList: RoleModel[] = [
    { roleId: UserRole.None, name: "None" },
    { roleId: UserRole.CEO, name: "CEO" },
    { roleId: UserRole.CTO, name: "CTO" },
    { roleId: UserRole.FrontEndDeveloper, name: "Front-End Developer" },
    { roleId: UserRole.BackEndDeveloper, name: "Back-End Developer" },
    { roleId: UserRole.Designer, name: "Designer" },
  ];

  constructor() { }

  getUserList(): Observable<User[]> {
    return of(this.userList);
  }

  getRoleList(): Observable<RoleModel[]> {
    return of(this.roleList);
  }
}
