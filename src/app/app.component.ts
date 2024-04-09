import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { UserListComponent } from './user/user-list/user-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, SignalsComponent, UserListComponent],
})
export class AppComponent {
  title = 'Angular-Signals';
}
