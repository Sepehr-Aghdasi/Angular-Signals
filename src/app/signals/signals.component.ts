import { Component, signal } from '@angular/core';
import { User } from '../user/shared/types/user.type';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  public counter = signal<number>(0);
  public userList = signal<User[]>;

  constructor() { }

  increment(): void {
    this.counter.update((oldCounter) => oldCounter + 1);
  }

  decrement(): void {
    this.counter.update((oldCounter) => oldCounter - 1);
  }
}


// Signal method
/*
  this.counter.set(VALUE);    => Set new value;
  this.counter.update(CALLBACK);   => Update current value using callback function;
  this.counter.mutate()           => Allow us to assign new value but by editing an existing value
                                    (Used only for mutable data strictures like arrays object etc...)
                                    Not available in Angular V17;
*/
