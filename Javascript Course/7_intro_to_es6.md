# Next generation javascript: into to ES6/ES2015

#### Whats new in ES6

- Can use most of the new ES6 features in production as long as we transpile and use polyfills(converting to ES5)
- thing to be covered in the section
- variable declaration with `let` and `const`
- blocks and IIFEs
- Strings
- Arrow Functions
- Destructuring
- Arrays
- The Spread Operator
- rest and default parameter
- Maps
- classes and subclasses

#### variable declaration with let and const

- replaces the var declaration
- const is for constants these values cannot be mutated later
- let is similar to var and its values can be mutated later after declaration.

```javascript
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller'; // can mutate the name5 variable
console.log(name5); //Jane Miller

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6); // Assignment to const variable error, const varaibles are not mutatable
```

- var is function scoped
- let and const are block scoped

```javascript
//ES5
function driversLicense5(passTest) {
  if (passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
    console.log(
      firstName + yearOfBirth + ' is officially allowed to drive now'
    );
  }
}

// ES6
function driversLicense6(passTest) {
  if (passedTest) {
    let firstName = 'John';
    const yearOfBirth = 1990;
    console.log(
      firstName + yearOfBirth + ' is officially allowed to drive now'
    );
  }
  /*
   * console.log(
      firstName + yearOfBirth + ' is officially allowed to drive now'
    );
    the above will not work outside the if block as these are block scoped,

    if these were declared as `var` then the log would have worked
    or declare these before the if block in case of let
    const has to be declared and defined outside the block
   */
}

let i = 23;
for (let i = 0; i < 5; i++) {
  console.log(i); // 0,1,2,3,4
}
console.log(i); // 23 - since i is block scoped, both the i's have different scopes

var j = 42;
for (var j = 0; j < 5; j++) {
  console.log(j); // 0,1,2,3,4
}
console.log(j); //6 since j is function blocked both the j's have same scopes
```

- in execution context all variables are hoisted and set to undefined
- in case of let and const we cannot use a varibale before it is declared `temporal dead zone`

#### Blocks and IIFEs

- new way of creating IIFEs
- block scope provides data privacy as the variabled declared inside the block by let and const have access only within the block, this concept can be used to create IIFEs

```javascript
//ES5
(function() {
  var c = 5;
})();
console.log(c); // error as c is not accessible outside the IIFE

//ES6 new style of defining an IIFE
{
  const a = 1;
  let b = 2;
}
console.log(a + b); // error as a nd b are not accessible outside the block
// if we decalare a var inside the block it will be still accessible
```

#### Strings in ES6

- till ES5 concate string with varibale using +
- Template Literals, `${variable}`, using backticks \$ and {}

```javascript
let firstName = 'john';
let lastName = 'smith';
const yearOfBirth = 1990;
function calcAge(year) {
  return 2019 - year;
}
console.log(`${firstName} ${lastName} is of ${calcAge(yearOfBirth)}`);
```

- new string methods startWith(), endsWith(), includes(), repeat(n), here n is number of times we want the string to repeated

#### Arrow functions basics

```javascript
const years = [1990, 1992, 1994];
// ES5
var ages5 = years.map(function(el) {
  return 2019 - el;
});
console.log(ages); // 29, 27, 26

//ES6
const ages6 = years.map(el => 2019 - el); // this is a shorthand in case of only one parameter and only line ie the return statement
/**
 * full version
 * const ages6 = years.map((el) => {
 *  return 2019-el
 * })
 */
const ages66 = years.map((el, index) => {
  let year = new Date().getFullYear();
  return year - el;
});
```

#### Arrow functions: Lexical `this` Keyword

- Arrow function shares the surrounding `this`
- unlike normal functions, arrows does not get their own this keyword
- Arrow use the `this` of the function they are written within

- in ES5 we since the function in the addEventListener is not a method hence will have the global scope, hence color and position will be undefined in eventListener's callback

- in ES5 this can be resolved by explicity using the bind with outer `this` which is of the clickMe which is a method hence this is the box5 object
- another method is to assign to a self variable and pass it to the callback of the addEventListener

```javascript
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener(
      'click',
      function() {
        var str = this.position + ' ' + this.color;
        console.log(str);
      }.bind(this)
    );
  }
};
//ES6

const box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener(
      'click',
      () => {
        let str = this.position + ' ' + this.color;
        console.log(str);
      } // here the outer this is shared with the inner arrow function
    );
  }
};
```

- the outer function is still required, if we use the arrow function here `this` will again point to the global window object

#### Destructuring

- gives us a easy way to extract data from data strtucture like objects and arrays
- destructing makes it easy to return multiple value, usually we return object in case of ES5

```javascript
// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
const [name6, year6] = ['John', 23];
console.log(name6, year6);

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};

const { firstName, lastName } = obj; // the new variables have to match the key names
// if we do not want key names to be same
const { firstName: a, lastName: b } = obj;

// destructing makes it easy to return multiple value, usually we return object in case of ES5
function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}
const [age, retirement] = calcAgeRetirement(1990);
```

#### Arrays in ES6

- new methods and loop for arrays
- Array.from
- loop, normally forEach, map: problem no break, continue instead we have to used for loop in ES5
- ES6 has for..of loop
- ES5 has indexOf to find elements in Array
- ES6 find and findIndex method

```javascript
const boxes = document.querySelectorAll('.box'); // return a nodeList
// uses the trick to convert nodelist to array
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes); // converts to array
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArray6 = Array.from(boxes); // instead of the prototype slice call hack
boxesArray6.forEach(cur => {
  cur.style.backgroundColor = dodgerblue;
});

// ES5
for (var i = 0; i < boxesArray5.length; i++) {
  // if second box continue
  if (boxesArray5[i].className === 'box blue') {
    continue;
  }
  boxesArray5[i].textContent = 'I changed to blue';
}

// ES6
for (const cur of boxesArray6) {
  if (cur.className === 'box blue') {
    continue;
  }
  /* or
  if(cur.className.includes('blue')){
    continue;
  }
  */
  cur.textContent = 'I changed to blue';
}

// ES5
var ages = [12, 17, 8];
var full = ages.map(function(cur) {
  return cur >= 18;
});

ages[full.indexOf(true)];

// ES6
ages.findIndex(cur => return cur >=18); // return the index for which callback is true
ages.find(cur =>  return cur >= 18); // retrieves the element instead if just the index
```

#### the spread operator

- convienient way to expand the array in place like args and funciton calls
- ...arrayElem -> spreads and expands the array
- more use case, to join arrays
- the spread can be used on the nodeList as well

```javascript
function addAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addAges(12, 12, 34, 23);

// ES5
var ages = [12, 12, 34, 23];
var sum2 = addAges.apply(null, ages);

// ES6
const sum3 = addAges(...ages);
const familySmith = ['John', 'Jane'];
const familyMiller = ['Mark'];
const bigFamily = [...familySmith, ...familyMiller];

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes]; // Nodelist
Array.from(all).forEach(cur => {
  cur.style.color = 'purple';
}); // returns an array
```

#### the rest operator

- all about function params
- rest operator allow to pass arbitary number of params to a function
- these look exactly the same as spread operator but are different (uses the same notation)
- spread takes an array and transforms to single values, rest takes couple of single values transforms to array when we call function with multiple params
- difference between the spread and rest is majorily at the place where it is used, spread is used in the function call, whereas the rest is used in function decalaration where random number of args is used

```javascript
// ES5
function isFullAge5() {
  // use arguments variable to get n number of params
  // console.log(arguments); // this is an object {'0':1990,'1':1992,'2':1994}
  var argsArr = Array.prototype.slice.call(arguments);
  argsArr.forEach(function(cur) {
    console.log(2019 - cur >= 18);
  });
}
isFullAge5(1990, 1992, 1994);
isFullAge5(1990, 1992, 1994, 1986); // varibale number of args

// ES6
function isFullAge6(...years) {
  // ...years will transform the args passed to an array
  console.log(years); // this is now an array not like arguments object
  year.forEach(cur => console.log(2019 - cur >= 18));
}
isFullAge6(1990, 1992, 1994);
isFullAge6(1990, 1992, 1994, 1986);

// ES5 fixed + arbitary params
function isFullAge55(limit) {
  // use arguments variable to get n number of params
  // console.log(arguments); // this is an object {'0':1990,'1':1992,'2':1994}
  var argsArr = Array.prototype.slice.call(arguments, 1);
  argsArr.forEach(function(cur) {
    console.log(2019 - cur >= limit);
  });
}

// ES6 easier syntax in ES6
function isFullAge66(limit, ...years) {
  // ...years will transform the args passed to an array
  console.log(years); // this is now an array not like arguments object
  year.forEach(cur => console.log(2019 - cur >= limit));
}
```

#### Default Parameters

- we use these when function params needs to have a default value

```javascript
// ES5
function SmithPerson(firstName, yearOfBirth, lastName) {
  lastName === undefined ? (lastName = 'Smith') : (lastName = lastName);
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
}
var john = new SmithPerson('John', 1990); // JS allows a function to be called without specifying all the params. JS assigns the usassigned params as undefined
console.log(john); // SimthPerson > {firstName:'John', yearOfBirth: 1990, lastName:'Smith'} // lastName is Smith instead of undefined due to the conditional statement
// if we specify the params in the function call this will overwrite the defaults

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith') {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
}
```

#### Maps

- new data structure
- objects have been used as hash maps, use string keys mapped to arbitary values
- in ES6 we can use maps,
- object keys are restricted to strings in maps we can use any primitive type, functions as keys
- maps can be loop'ed with forEach and for..of methods as well

```javascript
const question = new Map();
question.set('question', 'What is lastest JS version name?');
question.set(1, 'ES5'); // key does not have to be a string it can be any primitive
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');
console.log(question.get('question'));
//console.log(question.size); // size not length
if (question.has(4)) {
  // .has() checks if a key is there
  //question.delete(4); // removes a key value by key
  //console.log('Answer 4 is here')
}
//question.clear(); // removes all keys from map
//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));
for (let [key, value] of question.entries()) {
  // another use case of destructuring [key, value] of question.entries()
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));
```

#### Classes

- syntactic sugar over prototypal inheritance
- in ES5 this is done via function constructor
- static methods, attached to class but not inherited by class instances
- unlike function constructors, class definitions are not hoisted
- can add only methods to classes no properties

```javascript
// ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calcAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  calcAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
  static greeting() {
    console.log('Hello World');
  }
  // the static method can be used as helper function as className.methoName - Person.greeeting();
}
const john6 = new Person6('John', 1990, 'teacher');
```

#### classes and subclasses

- inheriting one class to another

```javascript
//ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};
Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};
var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olymicGames = olymicGames;
  this.medals = medals;
};

// the order of prototype assignment has to be in the order below else Object.create will try to overwrite the Athlete5.prototype existing methods
Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function() {
  this.medals++;
  console.log(this.medals);
};
var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();
//ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
}
class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
    console.log(this.medals);
  }
}
const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
```
