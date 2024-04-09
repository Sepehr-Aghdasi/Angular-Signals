import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../types/user.type';

@Pipe({
  name: 'userRole',
  standalone: true
})
export class UserRolePipe implements PipeTransform {

  transform(role: UserRole): string {
    switch (role) {
      case UserRole.CEO: return 'CEO';
      case UserRole.CTO: return 'CTO';
      case UserRole.FrontEndDeveloper: return 'Front-end Developer';
      case UserRole.BackEndDeveloper: return 'Back-end Developer';
      case UserRole.Designer: return "Designer";
      default: return "None"
    }
  }
}
