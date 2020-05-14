## Objects

- used to store keyed collection of various data
- creation using {} with an optional list of properties {key(String):value(any valid js type)}
- {} -> Object literal syntax
- `let user= new Object()` // object constructor syntax
- for multi-word properties use square notation
- `[]` notation , evaluate the expression within
- computed properties

```javascript
let fruit = prompt('Which fruit to buy', 'apple'); // apple is the default value to the prompt
let bag = {
  [fruit]: 5 // setting a computed property
};

alert(bag.apple); // 5 if fruit is apple
```

- property value shorthand

```javascript
function makeUser(name, age) {
  return {
    name,
    age // shorthand in case the key and variable name are the same.
  };
}
let user = makeUser('John', 42);
console.log(user.name); // John
```

- reserved keywords can also be used as property names, however, `__proto__` property cannot be set to a non object value
- key existence test using the `in` operator
- `key in object`, could have used the object.key === undefined check as well, however `in`, works well in case object.key is actually storing an undefined value.

- `for..in`, loop, to walk over the keys of the object

```javascript
let user = {
  name: 'john',
  age: 42,
  isAdmin: true
};
for (let key in user) {
  console.log(key, user[key]);
}
```

- the variable `let key` declaration is a convention only can use `for(let prop in obj)` or any other varaible name
- object key are ordered in a special fashion
- integer keys are listed in ascending order while the string keys preserve the order of creation
- to cheat the integer ordering problem prefix with a character to preserve the object order

### Object copying, references

- objects as opposed to other primitives are stored and copied via reference.

```javascript
let user = { name: 'John' };
let admin = user;
admin.name = 'Jane';
console.log(user.name); // Jane
```

- the `==` and `===` on objects work exactly the same, two objects are equal only if they are the same.
- for other comparisons the objects are converted to Primitives and then compared

- cloning and merging, Object.assign

```javascript
let user = {
  name: 'John',
  age: 42
};
let clone = {};
for (let key in user) {
  clone[key] = user[key];
}
clone.name = 'Jane';
console.log(user.name); // John

// Alternate
Object.assign(dest, [src1, src2, ..]);
let clone2 = Object.assign({}, user);
```

- nested cloning, Object.assign would only work if the keys of the object are primitive types, the non primitive keys will still be copied via reference while using object.assign

```javascript
// deep copy function

const deepCopyFunction = inObject => {
  let outObject, value, key;
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    outObject = deepCopyFunction(value);
  }
  return outObject;
};
```

- problems of deep clone with `JSON.parse(JSON.stringify(sampleObject))`

```javascript
// Only some of these will work with JSON.parse() followed by JSON.stringify()
const sampleObject = {
  string: 'string',
  number: 123,
  boolean: false,
  null: null,
  notANumber: NaN, // NaN values will be lost (the value will be forced to 'null')
  date: new Date('1999-12-31T23:59:59'), // Date will get stringified
  undefined: undefined, // Undefined values will be completely lost, including the key containing the undefined value
  infinity: Infinity, // Infinity will be lost (the value will be forced to 'null')
  regExp: /.*/ // RegExp will be lost (the value will be forced to an empty object {})
};

console.log(sampleObject); // Object { string: "string", number: 123, boolean: false, null: null, notANumber: NaN, date: Date Fri Dec 31 1999 23:59:59 GMT-0500 (Eastern Standard Time), undefined: undefined, infinity: Infinity, regExp: /.*/ }
console.log(typeof sampleObject.date); // object

const faultyClone = JSON.parse(JSON.stringify(sampleObject));

console.log(faultyClone); // Object { string: "string", number: 123, boolean: false, null: null, notANumber: null, date: "2000-01-01T04:59:59.000Z", infinity: null, regExp: {} }

// The date object has been stringified, the result of .toISOString()
console.log(typeof faultyClone.date); // string
```

### Garbage collection

- performed automatically
- reachable values, roots are not deleted and are stored in memory
- mark and sweep algorithm used for garbage collection

### Object method `this`

- objects usually created to represent entities in real world
- entities can act via methods, these are properties of object that hold function values

```javascript
let user = {
  name: 'John',
  age: 42,
  sayHi: function () {
    console.log('Hello');
  },
  // alternate method shorthand
  sayHiAlt() {
    console.log('Hello');
  }
};
```

- `this` in methods, its value is determined in runtime , depending on the context its called in
- In JavaScript this is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".
- arrow function donot have their own `this`, rather they reference the `this` of the its normal surrounding function

```javascript
let user = {
  name: 'John',
  age: 42,
  sayHi() {
    console.log(this.name);
  }
};

console.log(user.sayHi === 'John'); // true
```

```javascript
function makeUser() {
  return {
    name: 'John',
    ref: this // since it is called as the function and not method, this is undefined if `use strict` inside a function
  };
}
let user = makeUer(); // we are calling this as a function not via dot notation hence value inside function will be undefined
user.ref.name; // Error cannot read property name of undefined

// alt case

function makeUser() {
  return {
    name: 'John',
    ref() {
      return this;
    }
  };
}
let user = makeUser();
user.ref().name; // 'John', calling .ref using as a method bind the context to the user object
```

- chaining

```javascript

let ladder = {
  step: 0,
  up(){
    this.step++;
    return this;
  },
  down(){
    this.step--;
    return this;
  }
  showStep(){
    console.log(this.step);
    return this;
  }
}
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```

### constructor operator - new

- new allows to create template based objects

```javascript
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User('Jack');
console.log(user.name, user.isAdmin); // Jack, false
```

- function executed with `new`, new empty object created and assigned to `this`, function body executes and mostly adds props to the this object,

```javascript
// calling fn with `new`
function User(name) {
  // capitalizing is just a convention
  // this = {} implicitly
  this.name = name;
  this.isAdmin = false;
  // return this implicity
}
let user = new User('Jack');
```

- to check if function was called with `new` using `new.target`, empty for regular calls and equals the function if called with `new`

```javascript
function User(name) {
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}
let john = User('John');
console.log(john.name); // John
```

- in constructor function, `return` called with object, the object is returned, if `return`, called with primitive, its ignored
- `methods` can also be added to `this`

```javascript
function User(name) {
  this.name = name;
  this.sayHi = function () {
    console.log(this.name);
  };
}
let john = new User('John');
john.sayHi(); // John
```

### Optional chaining `?.`

- optional chaining `?.` is an error-proof way to access nested objects.

```javascript
let user = null;
console.log(user?.address.street); // undefined and no error
```

- short circuting

```javascript
let user = null;
let x = 0;
user?.sayHi(x++); // nothing happens
console.log(x); // 0, value not incremented
```

- value before `?.` must exist.

```javascript
delete user?.name; // delete user.name if user exists.
```

- `?.` checks if the left part is `null/undefined`

### Symbols

- Symbol is a primitive type for unique identifiers.
- Symbols are created with Symbol() call with an optional description (name).
- Symbols are always different values, even if they have the same name.
- If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with key as the name. Multiple calls of `Symbol.for` with the same key return exactly the same symbol.

- Symbol usecase, hidden properties, symbolic property does not appear in `for..in`
- System symbols using `Symbol.*`, can be used to alter built in behaviors.
- Symbols can be displayed using `Object.getOwnPropertySymbols(obj)`, also Reflect.ownKeys(obj) returns all keys including symbols

### Object to primitive conversion

- what happens when objects are added subtracted or printed
- All objects are true in boolean context, there are only numeric and string conversion,
- numberic when we add or subtract or other mathematical functions.
- string conversions in case of displaying object

- fine tune string and numeric conversions using special object methods
- three variants of type conversions so called as `hints` in the specification - `string`, `number`, `default`(in case of uncertainity) eg: + can be used for addition and concat as well, so for object addition the hint is `default`.
- to do the conversion, JS tries to find and call the three object methods
  -- obj[Symbol.toPrimitive](hint)
  -- if hint is `string`, obj.toString() and obj.valueOf()
  -- if hint is `number`, obj.valueOf() and obj.toString()

```javascript
let user = {
  name: 'John',
  money: 1000,
  [Symbol.toPrimitive](hint) {
    console.log(hint);
    return hint === 'string' ? this.name : this.money;
  }
};

console.log(user); // John
console.log(+user); // 1000
console.log(user + 500); // 1500
```

- If there’s no `Symbol.toPrimitive` then JavaScript tries to find them and try in the order:
- toString -> valueOf for `string` hint.
- valueOf -> toString otherwise.

```javascript
let user = { name: 'John' };
alert(user); //[object Object]
alert(user.valueOf() === user); //true
```

```javascript
let user= {
  name: 'John',
  money: 1000,
  // for hint == 'string'
  toString(){
    return this.name;
  }
  // for hint == 'number' or default
  valueOf(){
    return this.money
  }
}

alert(user); // toString -> John
alert(+user); // valueOf -> 1000
alert(user+ 500); // valueOf -> 1500
```

- toString and valueOf must return a primitive (no error but will be ignored, Symbol.toPrimitive, will throw error is no primitive is returned)
