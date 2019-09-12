# Higher Order Functions

- `Abstraction`, this hides the details and enables to talk about the problem at a higher(abstract) level
- abstracting repetition, Since doing something can be represented as functions and functions can be passed as values

```javascript
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, console.log);
// 0
// 1
// 2

let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```

#### Higher-order functions

- functions that operate on other functions by taking them as args, or returning them, these help to abstract over actions

```javascript
function greaterThan(n) {
  return m => m > n;
}
const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

// functions changing other functions
function noisy(f) {
  return (...args) => {
    let result = f(...args);
    console.log('called with', args, 'returned', result);
  };
}

noisy(Math.min)(1, 2, 3);

// functions that modify control flow
function unless(test, then) {
  if (!test) then();
}

repeat(
  3,
  unless(n % 2 === 1, () => {
    console.log(`${n} is even`);
  })
);
```

#### Script data set

- higher order functions can be used in data processing
- sample doc from `SCRIPTS` binding

```javascript
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]], // array of unicode character ranges, inclusive lower bound, exclusive upper bound
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```

#### Flitering arrays

- find scripts still in use

```javascript
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPS, script => script.living));
```

- the above function, instead of deleting from the current array creates a new one and appends the relevant ones based on the test function passed. the `function` is `pure`.
- like forEach, `filter`, is a standard array method, and is used as below

```javascript
console.log(SCRIPTS.filter(s => s.living));
console.log(SCRIPTS.filter(s => s.direction === 'ttb'));
```

#### Transforming with map

- extracting certain properties

```javascript
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}
let rtlSCripts = SCRIPTS.filter(s => s.direction === 'rtl');
console.log(map(rtlSCripts, s => s.name));
```

- like forEach and filter, map is a standard array method.

#### Summarizing with reduce

- compute a single value with members in an array, eg: summing a collection of numbers, or finding the script with max characters

```javascript
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
console.log(reduce([1, 2, 3], (a, b) => a + b), 0);
```

- the reduce array helper leaves the start param optional in case the array has ateast one element, the method will take the first element as its start value and start combining at the second

```javascript
/*
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]], // array of unicode character ranges, inclusive lower bound, exclusive upper bound
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
*/

function characterCount(a) {
  return a.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
);
```

#### Composibility

- higher order functions help abstract and make the pipeline readable, extracting operations becomes easier
- try finding the average life of scripts both living and dead

```javascript
function average(arr) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(average(SCRIPTS.filter(s => s.living)).map(s => s.year));
console.log(average(SCRIPTS.filter(s => !s.living)).map(s => s.year));
```

- the above could have been written using loops, however , extracting the average function in that case would be difficult, this composibilty helps in reusing the functions built

```javascript
let total = 0,
  count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// this approach would be a better choice in case of large computation
// though less readable it has lesser computations
// The first will build up new arrays when running filter and map, whereas the second computes only some numbers, doing less work
```

#### Strings and character codes

- figuring out what script a piece of text is using
- `some` is another higher order function, takes a test function, tells wether function returns true for any element in the array

```javascript
function characterScript(code){
  if(let script of SCRIPTS){
    if(script.ranges.some([from, to]=>{
      return code>= from|| code<to;
    })){
      return script
    }
  }
  return null;
}

// If you have a character (which will be a string of one or two code units), you can use codePointAt(0) to get its code.
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉
```

- how to get character code of a string
- JavaScript’s charCodeAt method gives you a code unit, not a full character code. The codePointAt method, added later, does give a full Unicode character
- for/of loop can also be used on strings. Like codePointAt, this type of loop was introduced at a time where people were acutely aware of the problems with UTF-16. When you use it to loop over a string, it gives you real characters, not code units

#### Recognizing text

- count the characters that belong to each script
- `findIndex`, This method is somewhat like indexOf, but instead of looking for a specific value, it finds the first value for which the given function returns true. Like indexOf, it returns -1 when no such element is found.

```javascript
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name === name);
    if (known === -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : 'none';
  });
  let total = scripts.reduce((n, { count }) => {
    n = n + count;
  }, 0);
  if (total === 0) {
    return `No scripts found`;
  }
  return scripts
    .map(({ name, count }) => {
      return `${(count * 100) / total}% ${name}`;
    })
    .join(', ');
}
```

```javascript
// flatten array one level deep

let array = [[1, 2, 3], [4, 5], [6]];
let flatArr = array.reduce((flat, current) => {
  flat.concat(current);
}, []);

// Own Loop
function loop(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
}
loop(
  3,
  n => {
    n > 0;
  },
  n => {
    n - 1;
  },
  n => {
    console.log(n);
  }
);

// implement every method

function every(array, predicate) {
  for (let element of array) {
    if (!predicate(element)) return false;
  }
  return true;
}

// implement every using some
function every2(array, predicate) {
  return !array.some(element => {
    return !predicate(element);
  });
}
```
