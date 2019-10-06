# BUGS AND ERRORS

- bugs are flaws in computer programs
- if program is a thougth, then bugs can creep in by the thoughts being confused/ iaacurate or while converting the thought to code.

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
unction numberToString(n, base = 10) {
  let result = '',
    sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n = Math.floor(n/base);
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 13…

```

- use console.log to peek, use debugger of the ide, use debugger of environment.

#### ERROR PROPAGATION
