# AngularSignals

So how Angular is working?? Angular uses life-cycle hooks to detect changes in your Angular app and after that, if something is changing Angular doesn’t know what changes, maybe some event happened or some variable changed in some component so to detect changes Angular has to check all components from the top to bottom to find out an event happened or some variable is changed to update UI and as you can understand this is a magical process because you don’t have to do anything you just change some value and then Angular re-renders the whole application but when you have a lot of components and lots of things to check Angular becomes slow this is where you are getting things like on push change-detection which is not fixed but hack.

This is why we have something new which is called Angular-Signals.

Signals have an easy-to-understand API for reporting data changes to the framework, allowing the framework to optimize change detection and re-rendering in a way that so far was just not possible.

## set()

Let's start with a set to update the signal. The set method is used for updating basic data types such as numbers. For example:

```
export default class SignalExampleComponent {
  name = signal('John Michel');

  updateName(name: string) {
    this.name.set(name);
  }
}
```

## update()

We can use update() to update the signal when the new value of the signal depends on the old value of the signal:

```
export default class SignalExampleComponent {
  count = signal(0);

  increaseCount() {
    this.count.update(() => this.count() + 1);
  }
}
```

## mutate()

The difference between update and mutate is that update returns the updated value while mutate modifies the object itself:

> **Note:** mutate is not available in the Angular V17.

```
messages = signal<object[]>([{message: 'Hello World!'}]);

ngOnInit(): void {
   this.messages.mutate(values => values[0].message = 'Hello Signals!');
}
```

One important point to note here is that the updated object (in this example, an array) is not required to be returned. Furthermore, we are not replacing the entire object, but rather modifying one of its contents. Invoking the mutate function indicates that the object has changed and that any further modifications must be performed.

## effect()

Effects: An effect is a process that is triggered whenever there is a change in one or more signal values. This functionality is implemented using the effect() function.

```
// Create a signal for user authentication status
   isAuthenticated = signal(false);

// Create an effect to perform actions based on authentication status
   effect(() => {
   if (this.isAuthenticated()) {
    console.log('User is authenticated. Redirecting to dashboard…');
 // Code to redirect to the dashboard can be added here
   } else {
     console.log('User is not authenticated. Redirecting to login page…');
 // Code to redirect to the login page can be added here
  }
 });

// Simulate authentication status change
 this.isAuthenticated.set(true);
```

## computed()

Computed Signals: These signals get their value from other signals. You set up a computed signal using the computed() function and tell it how to derive its value. When any of the signals depends on changes, the computed signal updates accordingly.

```
// Create two signals: price and quantity
const price = signal(10);

const quantity = signal(5);

// Create a computed signal for total cost based on price and quantity
const totalCost = computed(() => price() * quantity());

console.log(totalCost()); // Output: 50
```

## model()
Before Angular V17, we used the [(ngModel)] directive for two-way binding. It offered a convenient way to connect input elements to the properties. However [(ngModel)] had limitations such as Performance Overhead: Extensive use of [(ngModel)] could impact performance due to change-detection overhead.

**New Approach with Model Signals:** Angular V17 introduces model signals, providing a more flexible approach to two-way binding.

> Old Approach
```
// child.component.ts
@Component({
  selector: 'app-child',
  ...
})
export class ChildComponent {
  @Input() counter: number = 0;

  @Output() counterChange = new EventEmitter<number>();

  changeValue(newValue: number): void {
    this.counterChange.emit(newValue)
  }
}

// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `
    <app-child [(counter)]="currentCount" />
  `
})
export class ParentComponent {
  currentCount = 0;
}
```

> New Approach
```
// child.component.ts
@Component({
  selector: 'app-child',
  ...
})
export class ChildComponent {
  counter= model(0); 

  changeValue(newValue: number) {
    this.counter.set(newValue) 
  }
}

// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `      
    <app-child [(counter)]="currentCount" />
  `,
})
export class ParentComponent {
  currentCount = 0;
}
```

## Signal-based Components:

With the release of Angular 17.3, signal-based components have become a reality. A signal-based component is one in which all input, outputs etc..., are independent of RX.js and use Angular Signals instead.

In other words, here is how we used to write Angular components:

```
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
//...
})
export class AppComponent {

  @Input()
  name = 'World';

  @Output()
  greetingClicked = new EventEmitter<string>();

  @ViewChild(ProfileComponent)
  profileComponent: ProfileComponent;
}
```

Here is what the same component looks like with the signal-based approach:

```
import { Component, input, output, viewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
//...
})
export class AppComponent {

  name = input<string>('World');

  greetingClicked = output<string>();

  profileComponent = viewChild(ProfileComponent);
}
```

The main difference is that all decorators (@Input, @Output, @ViewChild, @ViewChildren, @ContentChild, @ContentChildren) can now be replaced with functions.

We also have an additional function called **model()**, which is both an input and an output and is perfect for two-way binding.

## Why signal-based components?

In short, for better performance and change detection. When we use signal-based components, **Angular knows** which view (section of component template) depends on which signal. this means updating a signal's value tells Angular **exactly which part of our DOM structure to update**. There is no need to go through the entire component tree and check everything!

> In nutshell less relies on RX.js.

## What about RX.js?

Note that signals are designed to be compatible with RX.js through serval functions:

1. **toObservable()** turns a signal into an Observable.
2. **toSignal** turns an Observable into the signal.
3. **outputToObservable** turn and OutputRef(the new object returned by the output() function) into an Observable.
4. **outputFromObservable()** turns an Observable into an output.

You can keep using RX.js if you want to, especially if your services have complex operator chains. As long as you turn your result into a signal for your component, you're good to go!

## Articles to read

1. [Future of change-detection with signals](https://medium.com/ngconf/future-of-change-detection-in-angular-with-signals-fb367b66a232)
2. [Angular signals best practices](https://blog.angulartraining.com/angular-signals-best-practices-around-exposing-signals-5385452150a1)
