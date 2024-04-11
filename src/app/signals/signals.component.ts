import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  public counter = signal<number>(0);

  constructor() { }

  increment(): void {
    this.counter.update((oldCounter) => oldCounter + 1);
  }

  decrement(): void {
    this.counter.update((oldCounter) => oldCounter - 1);
  }
}
