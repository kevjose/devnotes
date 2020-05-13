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
