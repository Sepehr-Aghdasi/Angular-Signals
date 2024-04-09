# AngularSignals

Angular 16 Signals - mutate & update examples
You can use the mutate method to update a signal. Along the set and update methods mutate is used to update the signal' value with a little difference, let's see how to use each each one of them.

## set()

Let's start with set to update the signal. The set method is used for updating basic data types such as numbers. For example:

```
export default class SignalExample3Component {
  name = signal('John Michel');

  updateName(name: string) {
    this.name.set(name);
  }
}
```

## update()

We can use update() to update the signal when the new value of the signal depends on the old value of the signal:

```
export default class SignalExample4Component {
  count = signal(0);

  increaseCount() {
    this.count.update(() => this.count() + 1);
  }
}
```

## mutate()

The different between update and mutate is that update returns the updated value while mutate modifies the object itself:

#### Note: mutate is not available in the Angular V17

```
messages = signal<object[]>([{message: 'Hello World!'}]);

ngOnInit(): void {
   this.messages.mutate(values => values[0].message = 'Hello Signals!');
}
```

One important point to note here is that the updated object (in this example, an array) is not required to be returned. Furthermore, we are not replacing the entire object, but rather modifying one of its contents. Invoking the mutate function indicates that the object has changed and that any further modifications must be performed.
