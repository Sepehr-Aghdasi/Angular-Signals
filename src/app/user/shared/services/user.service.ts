import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole, User, RoleModel } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: User[] = [
    { userId: 1, name: "Sepehr", lastName: "Aghdasi", age: 20, role: UserRole.CEO },
    { userId: 2, name: "Saeed", lastName: "Sabouri", age: 23, role: UserRole.FrontEndDeveloper },
    { userId: 3, name: "Parsa", lastName: "Moghbeli", age: 20, role: UserRole.BackEndDeveloper },
    { userId: 4, name: "Aref", lastName: "Kadkhodaei", age: 21, role: UserRole.Designer }
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
