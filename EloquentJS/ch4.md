# Objects and Arrays

- Number, Boolean, String are atoms of data structures
- `Objects` allow to group these atoms to make more useful/complex data structures

## The weresquirrel

> Between 8PM and 10PM, Jacques finds himself transformed to a squirrel. These transfoemations are irregular, making Jacques suspect that these trasnformations are caused by some stimulus. Approaching scientifically, he started logging all activities, at a given time and that he transformed or not.

- the above requires efficient data structures to be used to log the information.

#### Data sets

- `Array`, JS provides this data type for storing sequence of values. Represented as a list of values between square brackets
- For extracting the values out of the arary, use the square bracket notation

```javascript
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```

- Array is 0 index based. Think of index as the number of items to be skipped to reach the current item

#### Properties

- all javascript values have properties, except for `null` and `undefined`, eg: mystring.length, Math.max, here `.length` and `.max` are properties
- two ways to access javascript properties are square bracket and dot notation
- dot notation only works with property names that look like valid binding name, meaning it cannot have space in between the name etc.

#### Methods

- these are properties that hold `function` values, eg: the `toUpperCase` property.

```javascript
let doe = 'Doe';
console.log(typeof doe.toUpperCase);
// → function
console.log(doe.toUpperCase());
// → DOE

// Some array methods

let sequence = [1, 2, 3];
sequence.push(4); // adds values at the end of the array
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop()); // removes the last value from array and returns the same
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```

> Note: toUppercase is not passed the value of the binding and still has access to it, more on this later in the secret life of Objects

#### Objects

- a set of weresquirrel logs can be represented as an array, however, each entry is more than just a string or a number, for this object type is required.
- Values of type object are arbitrary collection of properties
- ways to create object
- - use braces as expression, inside braces and list of properties and its values separated by commas, each property has a name followed by a colon followed by its value. Properties with not valid binding name has to be quoted. Reading a property not defined returns `undefined`. Value to a property can be assigned using the `=` operator (replaces existing value else creates new by default).

```javascript
let day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza', 'running']
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
```

- - `objects as octopuses with any number of tentacles, each of which has a name tattooed on it`
- - `delete` can be used to remove a existing property
- - binary `in` operator tells wether object has property with said name
- - to see what properties are present on the object with `Object.keys`, returns array of string property names

```javascript
let anObject = { left: 1, right: 2 };
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log('left' in anObject);
// → false
console.log('right' in anObject);
// → true

console.log(Object.keys({ x: 0, y: 0, z: 2 }));
// → ["x", "y", "z"]
```

- `Object.assign`, copies all properties from one object to another

```javascript
let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);
// → {a: 1, b: 3, c: 4}
```

- Arrays are special kind of objects meant to store sequence of things. You can see them as long, flat octopuses with all their tentacles in a neat row, labeled with numbers

```javascript
// Jacques Journal as array of objects
let journal = [
  {
    events: ['work', 'touched tree', 'pizza', 'running', 'television'],
    squirrel: false
  },
  {
    events: [
      'work',
      'ice cream',
      'cauliflower',
      'lasagna',
      'touched tree',
      'brushed teeth'
    ],
    squirrel: false
  },
  { events: ['weekend', 'cycling', 'break', 'peanuts', 'beer'], squirrel: true }
  /* and so on... */
];
```

#### Mutability

- Objects can be modified, other types Strings, Boolean, Numbers are immutable, their values cannot be changed, we can combine them and derive new values, however, given a specific value, that values will remain the same
- for objects we can change the propert values, causing single object values to have different content at different times.
- with objects, there is a difference between having two references to the same object and having two different objects that contain the same properties
- when we compare javscript objects using `==` it compare by the identity, it will produce `true` only if both objects are precisely the same value. Comparing different objects will return `false`, even if they have identical properties. There is no “deep” comparison operation built into JavaScript, which compares objects by contents

```javascript
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2); // same identity
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value); // object2 point to same object as object 1 hence value update is reflected in object2 even when only object1 .value has been updated.
// → 15
console.log(object3.value);
// → 10

// Objects can be constants , however not in a traditional way
const score = { visitors: 0, home: 0 };
// This is okay
score.visitors = 1;
// This isn't allowed
score = { visitors: 1, home: 1 };
```

#### The Lycanthrope's logs

- setting the environment to log the journal entries, meaning, initialise the data structure and helper methods etc.

```javascript
let journal = [];

function addEntry(events, squirrel) {
  journal.push({ events, squirrel }); // shorthand for {events: events, squirrel:squirrel} this means if a property name in brace notation is not followed by a value, then its value is taken from same name binding.
}

addEntry(['work', 'touched tree', 'pizza', 'running', 'television'], false);
addEntry(
  [
    'work',
    'ice cream',
    'cauliflower',
    'lasagna',
    'touched tree',
    'brushed teeth'
  ],
  false
);
addEntry(['weekend', 'cycling', 'break', 'peanuts', 'beer'], true);
```

- Once enough data from the above is gathered then use stats to determine which event is related to the squirrelification

> Correlations, measure of dependence between statistical variables. A statistical variable is not quite the same as a programming variable. In statistics you typically have a set of measurements, and each variable is measured for every measurement. Correlation between variables is usually expressed as a value that ranges from -1 to 1. Zero correlation means the variables are not related. A correlation of one indicates that the two are perfectly related—if you know one, you also know the other. Negative one also means that the variables are perfectly related but that they are opposites—when one is true, the other is false

> To compute the measure of correlation between two Boolean variables, we can use the phi coefficient (ϕ). This is a formula whose input is a frequency table containing the number of times the different combinations of the variables were observed. The output of the formula is a number between -1 and 1 that describes the correlation.

- We could take the event of eating pizza and put that in a frequency table, where each number indicates the amount of times that combination occurred in our measurements
- - No squirrel, No Pizza - 76
- - No squirrel, Pizza - 9
- - squirrel, No Pizza - 4
- - squirrel, Pizza - 1

<pre>
  If we call that table n, we can compute ϕ using the following formula:
  ϕ =	(n11n00 − n10n01)/(√ n1•n0•n•1n•0)
</pre>

- The notation n01 indicates the number of measurements where the first variable (squirrelness) is false (0) and the second variable (pizza) is true (1). In the pizza table, n01 is 9.

- The value n1 refers to the sum of all measurements where the first variable is true, which is 5 in the example table. Likewise, n•0 refers to the sum of the measurements where the second variable is false.

- So for the pizza table, the part above the division line (the dividend) would be 1×76−4×9 = 40, and the part below it (the divisor) would be the square root of 5×85×10×80, or √340000. This comes out to ϕ ≈ 0.069, which is tiny. Eating pizza does not appear to have influence on the transformations.

- the 2\*2 table can be represented as an array [76, 9, 4, 1], compute the ϕ coefficient from such an array as below

```javascript
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}

console.log(phi([76, 9, 4, 1]));
// → 0.068599434
```

- To extract a two-by-two table for a specific event from the journal, we must loop over all the entries and tally how many times the event occurs in relation to squirrel transformations

```javascript
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i],
      index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor('pizza', JOURNAL));
// → [76, 9, 4, 1]
```

- Array `includes` method checks wether given value exists in the array
- Array `for` loops, rather than using the traditional for loop use the for of loop

```javascript
// JOURNAL contains all the logs as an array of objects
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```

- Getting all event types

```javascript
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]
```

- Getting correlations for each

```javascript
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ':', phi(tableFor(event, JOURNAL)));
}
// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...
```

- Narrowing the results down

```javascript
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ':', correlation);
  }
}
// → weekend:        0.1371988681
// → brushed teeth: -0.3805211953
// → candy:          0.1296407447
// → work:          -0.1371988681
// → spaghetti:      0.2425356250
// → reading:        0.1106828054
// → peanuts:        0.5902679812
```

```javascript
/*There are two factors with a correlation that’s clearly stronger than the others. Eating peanuts has a strong positive effect on the chance of turning into a squirrel, whereas brushing his teeth has a significant negative effect.*/

for (let entry of JOURNAL) {
  if (
    entry.events.includes('peanuts') &&
    !entry.events.includes('brushed teeth')
  ) {
    entry.events.push('peanut teeth');
  }
}
console.log(phi(tableFor('peanut teeth', JOURNAL)));
// → 1

// The phenomenon occurs precisely when Jacques eats peanuts and fails to brush his teeth
```

#### Further on arrays

```javascript
let todoList = [];
function remember(task) {
  todoList.push(task); // adds at end
}
function getTask() {
  return todoList.shift(); // adds at start
}
function rememberUrgently(task) {
  todoList.unshift(task); // removes from start
}

console.log([1, 2, 3, 2, 1].indexOf(2)); // returns index , else -1
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3

// Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching.
```

- `slice`, takes start and end indices and returns an array that has only the elements between them. The start index is inclusive, the end index exclusive. When the end index is not given, slice will take all of the elements after the start index. You can also omit the start index to copy the entire array

```javascript
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```

- The concat method can be used to glue arrays together to create a new array, similar to what the + operator does for strings.

- The following example shows both concat and slice in action. It takes an array and an index, and it returns a new array that is a copy of the original array with the element at the given index removed.

```javascript
function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(['a', 'b', 'c', 'd', 'e'], 2));
// → ["a", "b", "d", "e"]
```

#### String and its properties

- can read properties like .length and .toUpperCase() of a string, however cannot add new properties to string

```javascript
let kim = 'Kim';
kim.age = 88;
console.log(kim.age);
// → undefined , as mentioned earlies Strings are immutable
```

- Strings do have some inbuilt methods/properties `slice`, `indexOf` similar to array, these operate on each character of the string value. `trim()`, remove whitespace around.
- One difference in String `indexOf` is that it can search for a string containing more than one character, whereas the corresponding array method looks only for a single element.
- `padStart()`

```javascript
console.log(String(6).padStart(3, '0'));
// → 006
```

- Split and join, repeat (A string can be repeated with the repeat method, which creates a new string containing multiple copies of the original string, glued together)

```javascript
let sentence = 'Secretarybirds specialize in stomping';
let words = sentence.split(' ');
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join('. '));
// → Secretarybirds. specialize. in. stomping

console.log('LA'.repeat(3));
// → LALALA
```

#### Rest Parameters

- for functions to accept any number of params easily.
- `...binding_name`, this is a rest parameter when placed in the function definition args.
- the rest parameter is bound to an array that contains all further arguments
- when pass in the function call this is the spread operator, this spreads the array into the function call, passing it elements as separate args.
- when used inside square brackets triple dot spread array into new array

```javascript
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9

let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

let words = ['never', 'fully'];
console.log(['will', ...words, 'understand']);
// → ["will", "never", "fully", "understand"]
```

#### Math Object

- used as a container to group a bunch of related funcitonalities. The object serves as a namespace sort of
- some Math functionalities are as under
- `Math.round()`, returns b/w 0 and 1
- `Math.floor()`, rounds down to nearest whole number
- `Math.ceil()`, rounds up to neares whole number

```javascript
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
console.log(randomPointOnCircle(2));
// → {x: 0.3667, y: 1.966}

console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335

console.log(Math.floor(Math.random() * 10));
// → 2
```

#### Destructuring

- trying to destructure `null`, or `undefined` results in an error, same as trying to access any property of null or undefined
- Object destructuring is as below

```javascript
let { name } = { name: 'Faraji', age: 23 };
console.log(name);
// → Faraji
```

#### JSON

- properties, only grasp the values and not contain them, these just contain memory address containing the actual value, we need a mechanism to send the data over to another system via network etc. For this reason, we have to serialize the data, i.e. convert to flat desscription
- Most popular serialisation format is `JSON`.
- JSON looks similar to JavaScript’s way of writing arrays and objects, with a few restrictions. All property names have to be surrounded by double quotes, and only simple data expressions are allowed—no function calls, bindings, or anything that involves actual computation. Comments are not allowed in JSON.
- javascript provides the `.stringify` to convert to JSON string, and `.parse`, to convert it back to JS objects.

```javascript
/**
 * The sum of range
 **/
function range(start, end, step = start < end ? 1 : -1) {
  let array = [];
  if (step > 0) {
    for (let i = start; start <= end; i += step) {
      array.push(i);
    }
  } else {
    for (let i = start; start > end; i += step) {
      array.push(i);
    }
  }
  return array;
}

function sum(arr) {
  let sum = 0;
  for (let ele of arr) {
    sum += ele;
  }
  return sum;
}

/**
 * Reversing an array
 **/
function reverse(arr) {
  let output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i]);
  }
  return output;
}

function reverseInPlace(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let old = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = old;
  }
  return arr;
}


/**
* A list
**/
funtion arrToList(arr){
  let list = null;
  for(let i = arr.length-1;i>=0;i--){
    list = {value: arr[i], next:list};
  }
  return list;
}

function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
}

/**
* Deep equal
**/
function deepEqual(a, b){
  if(a===b) return true;
  if(a===null || typeof a!== 'object'|| b === null|| typeof b!== 'object') return false;
  let keyA = Obejct.keys(a), keyB = Object.keys(b)
  if(keyA.length !== keyB.length) return false;
  for(let key of keyA){
    if(!keyB.includes(key)|| ! deepEqual(a[key], b[key])) return false;
  }
  return true;
}

```
