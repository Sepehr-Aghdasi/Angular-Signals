import { FormControl } from "@angular/forms";
import { UserRole } from "../shared/types/user.type";

export interface AddUserForm {
  name: FormControl<string>;
  lastName: FormControl<string>;
  age: FormControl<number>;
  role: FormControl<UserRole>;
}
