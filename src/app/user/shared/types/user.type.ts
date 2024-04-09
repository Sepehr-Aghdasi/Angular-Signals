export class User {
  userId: number = 0;
  name: string = "";
  lastName: string = "";
  age: number = 0;
  role: UserRole = UserRole.None;

  constructor(model: User) {
    this.userId = model.userId;
    this.name = model.name;
    this.lastName = model.lastName;
    this.age = model.age;
  }
}

export enum UserRole {
  None = 0,
  CEO = 1,
  CTO = 2,
  FrontEndDeveloper = 3,
  BackEndDeveloper = 4,
  Designer = 5
}

export interface RoleModel {
  roleId: UserRole;
  name: string;
}
