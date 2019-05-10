# Object Oriented Programming in Javascript

Js objects simple collection of name value pairs.
Two ways of creating object:

```
var obj = new Object();
second way
var obj = {}
```

in oop object is an instance of class

Below is a class representation of a book:

```
function Book(title, pages, isbn){
  this.title = title;
  this.pages = pages;
  this.isbn = isbn;
}
```

to instantiate the above
`var book = new Book('title', 100, '1b1b2')`
then we can access/update the attributes via dot notation

```
console.log(book.title) //title
book.title = "Harry Potter"
console.log(book.title) //Harry Potter
```

A class can also contain functions:

```
Book.prototype.printTitle =  function(){
  console.log(this.title)
}
// the above can be invoked by the instance as follows:
book.printTitle // Harry Potter
```

we can declare the function in the class definition as well

```
function Book(title, pages, isbn){
  this.title = title;
  this.pages = pages;
  this.isbn = isbn;
  this.printPages = function(){
    console.log(this.pages)
  }
}
book.printPages() // 100
```

> Using the prototype method only one instance is created and shared accross all instance as opposed to the class decalaration where each instance will have its own copy of functions

# ECMAScript

ECMAScript is a scripting language specification. Javascript is an implementation of this specification.

#### ECMAScript functionalities

1. `let` and `const`
2. Template literals
3. Destructuring
4. Spread operator
5. Arrow functions
6. Classes

`let` is the new `var` except that it cannot be re-declared within the same scope.

```
var framework = "Vue";
var framework = "Angular"
console.log(framework); //Angular

let language = "Javascript";
let language = "Ruby"; // throws error
```

#### scope with `let`

```
let movies = "Lord of Rings";

function marvel(){
  let movie = "Captian America";
  return movie;
}

function dc(){
  movie = "Aquaman"
  return movie;
}

function blizzardFan(){
    let isFan = true;
    let phrase = 'Warcraft';
    console.log('Before if: ' + phrase);
    if (isFan){
        let phrase = 'initial text';
        phrase = 'For the Horde!';
        console.log('Inside if: ' + phrase);
    }
    phrase = 'For the Alliance!';
    console.log('After if: ' + phrase);
}

console.log(movie); // Lord of Rings;
console.log(marvel()); // Captain America
console.log(dc());// Aquaman
console.log(movie); // Aquaman
blizzardFan(); // Before if: Warcraft
// Inside if : For the Horde (`let` is block scoped)
// After if: For the Alliance
```

#### Constants

ECMASript instroduced keyword `const`
behavior same as `let` except that the variable cannot be reassigned hence constant value, this cannot be re-declared as well

```
const life = 42
life = 43 // thows error
```

#### Template Literals

used to create strings without concatenating values

```
const life = 42;
console.log(`the answer to life the universe and everything ${life}`) // the answer to life the universe and everything 42
```

Template literals, enclosed within backticks (`)
to interpolate the variable enclose within \${}, these can be used for multiline strings without specifying \n, just hit enter.

#### Arrow functions

A way of simplifying the syntax of javascript functions in ES6.

```
var areaOfCircle1 = function(r){
  var PI = 3.14;
  return PI*(r^2);
}

// using arrow function the above can be transformed to:
let areaOfCircle2 = (r) => {
  const PI = 3.14;
  return PI * r * r;
}

or even simpler

let areaOfCircle3 = (r) => 3.14*r*r;
```

#### Default parameter values for functions

```
function sum (x=1, y=2){
  return x+y;
}

console.log(sum(2)) // 4
```

earlier we had to check if the incoming value passed is `undefined` and then assign a default value.

#### Spread and rest operators

`...` can be used as rest parameter of spread operator
Rest parameter: collects all remaining elements into an array

```
function add(...args) {
  let result = 0;
  for (let arg of args) result += arg;
  return result
}
add(1) // returns 1
add(1,2) // returns 3
add(1, 2, 3, 4, 5) // returns 15
```

> Rest paramter should be last as it collects access elements, putting this in between does not make sense

Spread operator: allows us to expand elements. It lets us unpack elements in an array to single/individual argument.

```
var a = [1,2,3]
var b = [...a, 4] // add in end
var c = [0, ...a] // add in begining
var d = [...c] // copying array without reference
```

#### Array destucturing

way of initializing variables at once.

```
var [x, y] = ['a', 'b']
// the above is same as
var x = 'a';
var y = 'b';
// this can be used for swaping
[x, y] = [y, x]
// the above is same as
var temp = x;
x = y;
y = temp;
```

method property: functions can be declared inside objects as if they are properties.

# Object oriented programming with classes

ES6 has a cleaner syntax for declaring class

```
class Book{
  constructor(title, pages){
    this.title = title;
    this.pages = pages;
  }
  printTitle(){
    console.log(this.title)
  }
}

let book = new Book('title', 100);
console.log(book.title); //outputs the book title
book.title = 'new title'; //update the value of the book title
console.log(book.title); //outputs the book title
```

#### Inheritance using new class based syntax

We can extend another class and inherit its behavior using the keyword `extends`. Inside the constructor, we can also refer to the constructor superclass using the keyword `super`

```
class ScienceBooks extends Book {
  constructor(title, pages, branch){
    super(title, pages);
    this.branch = branch;
  }
  printBranch(){
    console.log(this.branch);
  }
}
```

JS inheritance is done using `prototype`, therefore the `printBranch()` will be shared across instances.
