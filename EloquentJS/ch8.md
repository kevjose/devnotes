# BUGS AND ERRORS

- bugs are flaws in computer programs
- if program is a thougth, then bugs can creep in by the thoughts being confused/ inaccurate or while converting the thought to code.

#### LANGUAGE

- many mistakes can be ponted out to us by the computer, however javascripts loose-ness becomes a hindrance.
- the concepts of binding and values is so vague that bugs can be caught only after running the program, it would still allow some nonsensical things like `'monkey'* true` // this would return `NaN`, and not be error'ed
- writing a program that dows not follow the langauges' grammar will throw an error, such as calling something that is not a function, or looking up a property on a vlaue that is undefined.
- nonsensical operations mostly cause a `NaN` or `undefined`, and program continues.
- process of finding bugs is called debugging.

#### STRICT MODE

- JS can be made little more stricter by enabling strict mode. `use strict;`

```javascript
function canYouSpotTheProblem() {
  'use strict';
  for (counter = 0; counter < 10; counter++) {
    console.log('Happy happy');
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```

- normally JS would have created a global binding for `counter`

```javascript
// another example

function Person(name) {
  this.name = name;
}
let ferdinand = Person('Ferdinand'); // oops
console.log(name); // name , global scope
// → Ferdinand
```

```javascript
'use strict';
function Person(name) {
  this.name = name;
}
let ferdinand = Person('Ferdinand'); // forgot new
// → TypeError: Cannot set property 'name' of undefined
```

- constructors created with the class notation will always complain if they are called without new, making this less of a problem even in non-strict mode.

#### TYPES

- JavaScript considers types only when actually running the program, and even there often tries to implicitly convert values to the type it expects

#### TESTING

- Automated testing is a process of writing a program that tests another program.
- tests usually take the form of a labeled program that will verify some aspect of code.
- Generally, the more external objects that the code interacts with, the harder it is to set up the context in which to test it.

```javascript
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}
test('convert Latin text to uppercase', () => {
  return 'hello'.toUpperCase() == 'HELLO';
});
```

#### DEBUGGING

- figuring out what the problem is.
- Sometimes the error is obivious by the error message, however, need debugging when these are not useful.

- convert a whole number to a string in a given base (decimal, binary, and so on)

```javascript
// buggy code.
function numberToString(n, base = 10) {
  let result = '',
    sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…

// corrected code:
function numberToString(n, base = 10) {
  let result = '',
    sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 13…
```

- use console.log to peek, use debugger of the ide, use debugger of environment.

#### ERROR PROPAGATION

- if program communicates with outside world, possible to get malformed input, network errors, overload of work etc.
- For a program to be used by everyone, it should not crash
- show the user appropriate error messages

```javascript
function promptNumber(question) {
  let result = Number(promt(question));
  if (Number.isNaN(result)) return null;
  // return null or show appropriate error message
  else return result;
}
// program does not crash in any case.
console.log(promptNumber('How many trees do you see?'));
```

- what if function returns every possible value, returning `null` will lead to awkward code, instead wrap the error in an object.

```javascript
funciton lastElement(array){
  if(array.length === 0){
    return {failed: true}
  }else{
    return {element: array[array.length -1]};
  }
}
```

#### Exceptions

- when function does not proceed as desired, we want it to skip to the place that knows how to handle the problem -> `exception handling`

- the above allows to raise/ throw an exception. This resembles a return statement, it jumps out not only of current function, but also from its callers -> unwinding the stack
- exception can be any value
- exception zooms down the call stack, throwing away all the call context it encounters
- the power of exception lies in the fact that it can be caught.
- once caught we can do something with it to address the problem

```javascript
function promtDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == 'left') return 'L';
  if ((result, toLowerCase() == 'right')) return 'R';
  throw new Error(`Invalid direction ${result}`);
}
function look() {
  if (promptDirection('Which way?') == 'L') {
    return 'A house';
  } else {
    return 'Two angry bears';
  }
}

try {
  console.log('You see', look());
} catch (error) {
  console.log('Something went wrong', error);
}
```

- `throw` keyword raises the exception
- catching, is done by wraping the code in a try/catch block.
- the error param of catch is bound by the exception value.
- `Error` constructor is used to create exception value, this is standard , creates an object with a message property.
- Instance of the above also stores the info about the call stack that existed when exception was created -> stack trace, this info is stored in the stack property.

#### Cleaning up after exceptions

- almost every expression in a function can throw an exception
- this means a code that has several side effects, an exception may prevent even the regular control flow.

```javascript
const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = promt('Enter a account name');
  if (accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account name ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  acounts[from] -= amount;
  accounts[getAccount()] += amount;
}
```

- problem if accountName does not exists, money still got debited.
- solution1 , call get account before debiting
- the above way is not always possible, use the finally block to cleanup,
- finally , is like no matter what happens run this code, afte trying to run the try block

```javascript
function tansfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```

- the above one keeps track of each step and in finally block does the cleanup

#### Selective Catching

- when an exception makes its way to bottom of the stack without being caught , environment handles this, in browser using javascript , error gets printed to the console, in node js for an unhandled rejection, it aborts the whole process

- for problems that are expected to happen during the routine use, creashing with unhandled exception is terrible strategy.

- dont just blanket catch, catching specific excpetions is a better approach to know if the exception is the expected one, or something entirely that we missed out on.

- we can extend from the `Error` class to create new specific kind of errors

```javascript
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == 'left') return 'L';
  if (result.toLowerCase() == 'right') return 'R';
  throw new InputError('Invalid direction: ' + result);
}

for (;;) {
  try {
    let dir = promptDirection('Where?');
    console.log('You chose ', dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log('Not a valid direction. Try again.');
    } else {
      throw e;
    }
  }
}
```

- the above will catch only instances of `InputError` and let unrelated exceptions through. If you reintroduce the typo, the undefined binding error will be properly reported

#### Assertions

- checks inside program that verify something is the way its supposed to be.

- throwing an exception causes the call stack to be unwond until the next enclosing try/catch or until the bottom of the stack. The exception value will be given to the catch block that catches it, which should verify that it is actually the expected kind of exception, then do something about it. For the unpredictable flow use the finally block to run the clean up code.

- Say you have a function primitiveMultiply that in 20 percent of cases multiplies two numbers and in the other 80 percent of cases raises an exception of type MultiplicatorUnitFailure. Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.

Make sure you handle only the exceptions you are trying to handle.

```javascript
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) throw e;
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
```

- There is an array in the box, but you can get at it only when the box is unlocked. Directly accessing the private \_content property is forbidden.

Write a function called withBoxUnlocked that takes a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception.

```javascript
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  }
};

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push('gold piece');
});

try {
  withBoxUnlocked(function() {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised:', e);
}

console.log(box.locked);
// → true
```
