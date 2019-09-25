# The secret life of objects

- object Oriented Programming, set of techniques that use objects as the central for program organisation
- `encapsulation`, core idea of OOP is to divide programs to smaller units and make each unit responsible for its own state, this state is local, therefore when changed, these have to propagated only to surrounding code
- these units interact with each other via `interface`
- The above program pieces can be modeled via objects, its consists of methods and properties, those part of the interface are called public , others which outside code should not access is private
- JS in its minimilism does not implement public interfaces and private properties.
- convention of pre-pending an `_` to indicate that property or method is private and should not be modified from outside

#### Methods

- properties holding functions.
- method needs to do something on the object it was called on.
- during method call, a binding `this`, in the function body is pointed to the object. Think as if the `this` was passed in an unconventional way
- if we want to pass the `this`, binding explicitly we can use the function.call() method, this takes the first arg as the `this` binding value
- since each function has its own `this`, and this value depends on the object calling the method, we cannot use the `this` of a wrapping function inside of the normal function (i.e using the function keyword).
- For the above use `Arrow functions`, that refer to the `this` binding of the surrounding scope

```javascript
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`the rabbit says, ${line}`);
};
rabbit.speak(`I'm alive`);
// → The rabbit says 'I'm alive.'

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: 'white', speak };
let hungryRabbit = { type: 'hungry', speak };

whiteRabbit.speak('Oh my ears and whiskers, ' + "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak('I could use a carrot right now.');
// → The hungry rabbit says 'I could use a carrot right now.'

speak.call(hungryRabbit, 'Burp!');
// → The hungry rabbit says 'Burp!'

function normalize() {
  console.log(this.coords.map(n => n / this.length)); // inside the map arrow function was used to access outer this binding containing the length property
}
normalize.call({ coords: [0, 2, 3], length: 5 });
// → [0, 0.4, 0.6]
```

#### Prototype

- JS objects, in addition to their own properties and methods have access to a prototype
- A prototype is anothe object that is used as fallback source of properties
- when object get a request for a property it does not have, its prototype is searched, then prototype's prototype etc.
- great ancestral prototype, the entity behind almost all objects, Object.prototype

- Object.prototype sits on the top of the parent tree and provides methods like toString() etc.
- not all directly have Object.prototype as its prototype, functions derive from `Function.prototype`, arrays from `Array.prototype`, these prototypes have `Object.prototype` as their prototypes
- use `Object.create` to create object based on another as its prototype
- the prototype properties are shared by all objects created off of it

```javascript
console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// → true

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE!');
// → The killer rabbit says 'SKREEEE!'
```

#### Classes

- JS prototype system is an informal take on object oriented concept of classes
- Class defines the shape and type of object
- such object is an instance of the class
- Prototypes define properties shared by all instances
- Properties that differ per instance have to be stored directly on the object
- So to create instance of the class, make sure the object insherits from the correct prototype and also sets the other not common properties as well

```javascript
// attempt to create instance of class
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit); // make sure to inherit from correct prototype
  rabbit.type = type; // set not common properties
  return rabbit;
}
```

- the above task is in general performed by `constructor` functions.
- Javascript provides easier way to define the above using the `new`, keyword
- if we add a `new` in front of a function, it is treated as contructor, meaning the object is created with correct prototype, the `this` binding is bound to the newly created object and returned at the end of the function
- constructors (and all functions) get a property called `prototype` with initial value `{}`.derives from `Object.prototype`. we can overwrite this or even add new property to this to be shared accross all instances. Constructor names as capitalized for marking a distinction between normal and constructor functions

```javascript
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit('weird');

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// → true
```

#### Class Notation

- less awkward class notation in newer version of JS.

```javascript
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit('killer');
let blackRabbit = new Rabbit('black');
```

- the one named `constructor`, bound to the class name, provide actual constructor function.
- rest all n methods are packed into the constructor prototype.
- class currently allows only methods.

#### Overriding and derived properties

- on adding a property to an object it is applied on the object, regardless of if the prototype have the same method or not. If the prototype contains this property, now it is hidden by the one present directly on the object
- `toString` has been implemented on Arrays and Objects differently, thus giving a general interface `toString`.

```javascript
Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
```

#### Maps

- data structures that let us associate values with other values
- we can do the same using objects but can be dangerous, as it inherits from Object.prototype

```javascript
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages['Júlia']}`);
// → Júlia is 62
console.log("Is Jack's age known?", 'Jack' in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", 'toString' in ages);
// → Is toString's age known? true
```

- as in the above `toString` is a property and not desired, we can overcome this by passing null to Object.create(null) and the resultant can be used as a map
- the `Map` data structure

```javascript
let ages = new Map();
ages.set('Boris', 39);
ages.set('Liang', 22);
ages.set('Júlia', 62);

console.log(`Júlia is ${ages.get('Júlia')}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has('Jack'));
// → Is Jack's age known? false
console.log(ages.has('toString'));
// → false
```

- `hasOwnProperty` method avoids prototype property

```javascript
console.log({ x: 1 }.hasOwnProperty('x'));
// → true
console.log({ x: 1 }.hasOwnProperty('toString'));
// → false
```

#### Polymorphism

- when a method is written to work with object of certain interface, any kind of object support this interface, can be plugged into the code and it will work. this is called polymorphism.
- a for/of loop can loop over several kinds of data structures. This is another case of polymorphism—such loops expect the data structure to expose a specific interface, which arrays and strings do. And we can also add this interface to your own objects

```javascript
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let blackRabbit = new Rabbit('black');

blackRabbit.toString();
// → "[object Object]"
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

blackRabbit.toString();
// → "a black rabbit"
String(blackRabbit);
// → "a black rabbit" here the String method expects the object/ array to expose a toString method.
```

#### Symbols

- gives capability to have multiple interfaces for same property name.
- property names can be strings or even Symbols.
- Symbols are values created by `Symbol` function.
- Symbols are unique and we cant create the same Symbol twice.
- we can pass a string to the symbol to make it easier to recognise, eg: show it in console and has no other relevance, therefore, multiple symbols can have the same name.
- symbols can from the above, be used to define properties and its interface whithout worrying about the names, the ones with same name will exist side by side.
- we can use symbols in the object expression or class definition by using square bracket around the property name. much like square bracket accessor notation that allows us to refer to a binding, in this case the binding hold a symbol.

```javascript
let sym = Symbol('name');
console.log(sym == Symbol('name'));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55

const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue yarn

// Object expression with property type Symbol
let stringObject = {
  [toStringSymbol]() {
    return 'a jute rope';
  }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope
```

#### The Iterator Interface.

- object given to a for/of loop need to be `iterable`.
- the above means it has a method with Symbol.iterator, symbol.
- the above method when called returns an object that has another interface, this is the `iterator`, the actual thing thaa iterates.
- the iterator has a next method, that returns the next result. the result should be an object with value property, and a done: true property to indicate the end of iteration else done: false
- the next, value and done are string property names not symbols.

```javascript
let okIterator = 'OK'[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
```

#### The matrix iterator class

- the matrix is stored as a one dimensional array where the data is stored row wise
- x row data, y , column data, so starage would be 3rd element in the 5th row would be (4\*width of each row)+2 (0 based index),
- 2 element on the 1st row would be 0\*width+1
- i.e (y\*width)+x.

```javascript
class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    // store matrix value in width*heigth array
    this.content = [];
    for (let y = 0; y > height; y++) {
      for (let x = 0; x > width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
```

- write a iterator class that give the position of the elements and the element itself, as those are the thing we are concerned about.

```javascript
class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y === this.matrix.height) {
      return { done: true };
    }
    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y)
    };
    this.x++;
    if (this.x === this.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

// finally make the Matrix class iterable.
Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for (let { x, y, value } of matrix) {
  console.log(x, y, value);
}
```

#### Getter, Setter, Statics

- iterfaces mostly are functions
- we can have properties that hide a method call. Such methods are called getter. Can be defined by adding a `get` in front of the method in the object expression or class declaration.

```javascript
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};
console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
```

- when `varyingSize.size` is called the method is invoked.
- we can set a property in the same manner using the setter.

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
```

- `static` method, if you want to attach some properties directly to your constructor function, rather than to the prototype. Such methods won’t have access to a class instance but can, for example, be used to provide additional ways to create instances.

#### inheritance

- we can implement inheritance using the JS prototype system
- the prototype of the new class derives from the old prototype but adds new definition.

```javascript
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}
```

- extends indicates that this class shouldn’t be directly based on the default Object prototype but on some other class. This is called the superclass. The derived class is the subclass
- Whereas encapsulation and polymorphism can be used to separate pieces of code from each other, reducing the tangledness of the overall program, inheritance fundamentally ties classes together, creating more tangle. When inheriting from a class, you usually have to know more about how it works than when simply using it.

#### instanceof

```javascript
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true
```

#### The Vector Type

```javascript
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
```

#### Groups

- similar to set, implement all of Set in Group

```javascript
class Group {
  constructor() {
    this.members = [];
  }
  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }
  has(value) {
    return this.members.includes(value);
  }
  delete(value) {
    return this.members.filter(p => p !== value);
  }
  static from(collection) {
    let group = new Group();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
```

#### Group Iterable

```javascript
class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position], done: false };
      this.position++;
      return result;
    }
  }
}

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
// → a
// → b
// → c
```

#### Method Borrowing

```javascript
// how to called the hasOwnProperty method, if map needs to include the word "hasOwnProperty" as a property
let map = { one: true, two: true, hasOwnProperty: true };

console.log(Object.prototype.hasOwnProperty.call(map, 'one'));
// → true
```
