# Max Char Problem

- Directions
- Given a string, return the character that is most commonly used in the string.
- Examples
- maxChar("abcccccccd") === "c"
- maxChar("apple 1231111") === "1"
- similar questions
- most common character in the string
- does string A have same characters as string B
- does given string have repeated characters in it

```javascript
function maxChar(str) {
  const charMap = {};
  let max = 0;
  let maxChar = '';
  for (char of str) {
    if (charMap[char]) charMap[char]++;
    else charMap[char] = 1;
  }

  for (let char in charMap) {
    if (charMap[char] > map) {
      map = charMap[char];
      maxChar = char;
    }
  }
  return maxChar;
}
```

# FizzBuzz

- Directions
- Write a program that console logs the numbers from 1 to n. But for multiples of three print “fizz” instead of the number and for the multiples of five print “buzz”. For numbers which are multiples of both three and five print “fizzbuzz”.
- Example
- fizzBuzz(5);
- 1
- 2
- fizz
- 4
- buzz

```javascript
function fizzbuzz(n) {
  for (let i = 0; i < n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}
```

# Array chunk problem

- Directions
- Given an array and chunk size, divide the array into many subarrays where each subarray is of length size
- Examples
- chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
- chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
- chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
- chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
- chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

#### solution 1

```javascript
function chunk(array, size) {
  const chunked = [];
  for (let element of array) {
    const last = chunked[chunked.length - 1];
    if (!last || last.length === size) {
      chunked.push([element]);
    } else {
      last.push(element);
    }
  }
  return chunked;
}
```

#### solution 2

```javascript
function chunk(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index = index + size;
  }
  return chucked;
}
```

# Anagrams

- Directions
- Check to see if two provided strings are anagrams of eachother. One string is an anagram of another if it uses the same characters in the same quantity. Only consider characters, not spaces or punctuation. Consider capital letters to be the same as lower case
- Examples
- anagrams('rail safety', 'fairy tales') --> True
- anagrams('RAIL! SAFETY!', 'fairy tales') --> True
- anagrams('Hi there', 'Bye there') --> False

#### Solution 1

```javascript
function anagrams(stringA, stringB) {
  const charMapA = buildCharMap(stringA);
  const charMapB = buildCharMap(stringB);
  if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
    return false;
  }
  for (let char in charMapA) {
    if (charMapA[char] !== charMapB[char]) {
      return false;
    }
  }
  return true;
}

function buildCharMap(str) {
  const charMap = {};
  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    charMap[char] = charMap + 1 || 1;
  }
  return charMap;
}
```

#### Solution 2

```javascript
function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB);
}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}
```

# Sentence Capitalization

- Directions
- Write a function that accepts a string. The function should capitalize the first letter of each word in the string then return the capitalized string.
- Examples
- capitalize('a short sentence') --> 'A Short Sentence'
- capitalize('a lazy fox') --> 'A Lazy Fox'
- capitalize('look, it is working!') --> 'Look, It Is Working!'

#### solution 1

```javascript
function capitalize(str) {
  const words = [];
  for (let word in str.split(' ')) {
    words.push(word[0] + word.slice(1));
  }
  return words;
}
```

#### solution 2

```javascript
function capitalize(str) {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}
```

# Printing Steps

- Directions
- Write a function that accepts a positive number N. The function should console log a step shape with N levels using the # character. Make sure the step has spaces on the right hand side!
- Examples
- steps(2)
- '# '
- '##'
- steps(3)
- '# '
- '## '
- '###'

#### solution 1

```javascript
function steps(n) {
  for (let row = 0; row < n; row++) {
    let stair = '';
    for (let coloumn = 0; column < n; column++) {
      if (columns <= row) {
        stair += '#';
      } else {
        stair = ' ';
      }
    }
    console.log(stair);
  }
}
```

#### solution 2

- recursive solution
- identify base case, time to return
- sample example below

```javascript
function printNumber(n, dec = 1) {
  // reasonable default dec by 1
  if (n === 0) {
    // base case
    return;
  }
  console.log(n); // work done
  printNumber(n - dec); // bare minimum info, the default handles the rest, make sure args have changed
}
printNumber(10);
```

- Recursion tips
- figure out the bare minimum pieces of information to represent the problem
- Give resonable defaults to the bare minimum pieces of info
- Check the base case, is there any work left to do? if not return
- Do some work. Call your function again, making sure the arguments have changed in some fashion

* if row === n then we have hit the end of our problem
* if the stair string has a length === n then we are the end of a row
* if the lenght of the stair string is less than or equal to the row number we're working on, we add a # else space

```javascript
function steps(n, row = 0, stair = '') {
  if (row === n) {
    return;
  }
  if (n === stair.lenght) {
    console.log(stair);
    steps(n, row - 1);
  }
  const add = stair.length <= row ? '#' : ' ';
  steps(n, row, stair + add);
}
```

# Two sided steps - Pyramid

- Directions
- Write a function that accepts a positive number N. The function should console log a pyramid shape with N levels using the # character. Make sure the pyramid has spaces on both the left _and_ right hand sides
- Examples
- pyramid(1)
- '#'
- pyramid(2)
- ' # '
- '###'
- pyramid(3)
- ' # '
- ' ### '
- '#####'

```javascript
function pyramid(n) {
  const midpoint = Math.floor((2 * n - 1) / 2);

  for (let row = 0; row < n; row++) {
    let level = '';

    for (let column = 0; column < 2 * n - 1; column++) {
      if (midpoint - row <= column && midpoint + row >= column) {
        level += '#';
      } else {
        level += ' ';
      }
    }

    console.log(level);
  }
}
```

```javascript
function pyramid(n, row = 0, level = '') {
  if (row === n) {
    return;
  }

  if (level.length === 2 * n - 1) {
    console.log(level);
    return pyramid(n, row + 1);
  }

  const midpoint = Math.floor((2 * n - 1) / 2);
  let add;
  if (midpoint - row <= level.length && midpoint + row >= level.length) {
    add = '#';
  } else {
    add = ' ';
  }
  pyramid(n, row, level + add);
}
```

# Find the Vowels

- Directions
- Write a function that returns the number of vowels used in a string. Vowels are the characters 'a', 'e''i', 'o', and 'u'.
- Examples
- vowels('Hi There!') --> 3
- vowels('Why do you ask?') --> 4
- vowels('Why?') --> 0

```javascript
function vowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
```

```javascript
function vowels(str) {
  let count = 0;
  const checker = ['a', 'e', 'i', 'o', 'u'];

  for (let char of str.toLowerCase()) {
    if (checker.includes(char)) {
      count++;
    }
  }

  return count;
}
```

# Matrix Spiral

- Directions
- Write a function that accepts an integer N and returns a NxN spiral matrix.
- Examples
- matrix(2)
-     [[1, 2],
-     [4, 3]]
- matrix(3)
-     [[1, 2, 3],
-     [8, 9, 4],
-     [7, 6, 5]]
- matrix(4)
-     [[1,   2,  3, 4],
-     [12, 13, 14, 5],
-     [11, 16, 15, 6],
-     [10,  9,  8, 7]]

- maintain counters start_row, start_coloumn, start_row, end_row
- while (startColumn <= endColumn && startRow <= endRow)
- traverse start_col to end_col increment start_row
- traverse start_row to end_row, decrement end_col
- traverse end_col to start_col, decrement end_row
- traverse end_row to start_row, increment start_col

```javascript
function matrix(n) {
  const results = [];

  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  let counter = 1;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;
  while (startColumn <= endColumn && startRow <= endRow) {
    // Top row
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter++;
    }
    startRow++;

    // Right column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter++;
    }
    endColumn--;

    // Bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++;
    }
    endRow--;

    // start column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++;
    }
    startColumn++;
  }

  return results;
}
```

# Runtime Complexity

- how performant algo is?
- linear runtime (n), string reversal via for loop
- steps algorithm, quadratic runtime (n^2) for nested for loop solution

- Common runtimes
- Constant time, 1, No matter how many elements we're working with the algorithm will always take the same amount of time
- Logarithmic, log(n), You have this if doubling the number of elements you are iterating over doesnt double the amount of work, always assume search operation is log(n)
- linear time, n, Iterating over all elements in a collection of data. If you see a for loop spanning from 0 to length-1, you have a linera runtime
- Qasilinear runtime, `n*log(n)`, Ypu hvae this if doubling the number of elements you are iterating doesnt double the amount of work, sorting opertaions are `n*log(n)`
- Quadratic runtime, n^2, Every element in a collection has to be compared to every other element. the handshake problem
- Exponential time, 2^n, if you add a single elment to the collection, the processing power doubles

- Big 'O' notation also used for runtime complexity
- O(n) -> linear, O(1) -> constant, O(n^2) -> quadratic
- Iterating with simple loop -> Probably O(n)
- Iterating via half the collection -> Still O(n), there is no constant in runtime
- iterating through two different collections with separate for loops -> O(n+m)
- nested for loops -> O(n^2)
- two nested loops iterating over different collections -> O(n\*m)
- Sorting -> O(nlogn)
- Searching a sorted array -> O(log(n))

- Space Complexity, how much memory is required by dobuling the input, most cases similar to time complexity (eg. steps problem)

# The Fibonacci Series

- Directions
- Print out the n-th entry in the fibonacci series.
- The fibonacci series is an ordering of numbers where each number is the sum of the preceeding two. For example, the sequence [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] forms the first ten entries of the fibonacci series.
- Example:
- fib(4) === 3

```javascript
function fib(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(i - 2 + i - 1);
  }
  return result[n];
}
```

```javascript
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
```

- many duplicate calls to fib function, enter memoization
- store the arguments of each function call along with the result. if function called again with same args, return pre-computed result, rather that running function again

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    if (cache[args]) {
      return cache[args];
    }

    const result = fn.apply(this, args);
    cache[args] = result;

    return result;
  };
}

function slowFib(n) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fib = memoize(slowFib);
```

# The Queue

- what is a Data Structure ?
- ways of organizing information with optimal runitme complexity for adding or removing records
- JS natively implements several data structure, you will still be asked about inferior data structures

- Description
- Create a queue data structure. The queue should be a class with methods 'add' and 'remove'. Adding to the queue should store an element until it is removed
- Examples
- const q = new Queue();
- q.add(1);
- q.remove(); // returns 1;

- first in first out principle

```javascript
class Queue {
  constructor() {
    this.data = [];
  }
  add(record) {
    this.data.unshift(record);
  }
  remove() {
    return this.data.pop();
  }
  peek() {
    return this.data[this.data.length - 1];
  }
}

module.exports = Queue;
```

# Queue Weaving

- Directions
- Implement the 'weave' function. Weave receives two queues as arguments and combines the contents of each into a new, third queue. The third queue should contain the _alterating_ content of the two queues. The function should handle queues of different lengths without inserting 'undefined' into the new one. _Do not_ access the array inside of any queue, only use the 'add', 'remove', and 'peek' functions.
- Example
- const queueOne = new Queue();
- queueOne.add(1);
- queueOne.add(2);
- const queueTwo = new Queue();
- queueTwo.add('Hi');
- queueTwo.add('There');
- const q = weave(queueOne, queueTwo);
- q.remove() // 1
- q.remove() // 'Hi'
- q.remove() // 2
- q.remove() // 'There'

```javascript
const Queue = require('./queue');

function weave(sourceOne, sourceTwo) {
  const q = new Queue();

  while (sourceOne.peek() || sourceTwo.peek()) {
    if (sourceOne.peek()) {
      q.add(sourceOne.remove());
    }

    if (sourceTwo.peek()) {
      q.add(sourceTwo.remove());
    }
  }

  return q;
}
```

# Stacks

- Directions
- Create a stack data structure. The stack should be a class with methods 'push', 'pop', and 'peek'. Adding an element to the stack should store it until it is removed.
- Examples
- const s = new Stack();
- s.push(1);
- s.push(2);
- s.pop(); // returns 2
- s.pop(); // returns 1

```javascript
class Stack {
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

module.exports = Stack;
```

# Two become one queue from stack

- Directions
- Implement a Queue datastructure using two stacks. _Do not_ create an array inside of the 'Queue' class. Queue should implement the methods 'add', 'remove', and 'peek'.
- Examples
- const q = new Queue();
- q.add(1);
- q.add(2);
- q.peek(); // returns 1
- q.remove(); // returns 1
- q.remove(); // returns 2

```javascript
const Stack = require('./stack');

class Queue {
  constructor() {
    this.first = new Stack();
    this.second = new Stack();
  }

  add(record) {
    this.first.push(record);
  }

  remove() {
    while (this.first.peek()) {
      this.second.push(this.first.pop());
    }

    const record = this.second.pop();

    while (this.second.peek()) {
      this.first.push(this.second.pop());
    }

    return record;
  }

  peek() {
    while (this.first.peek()) {
      this.second.push(this.first.pop());
    }

    const record = this.second.peek();

    while (this.second.peek()) {
      this.first.push(this.second.pop());
    }

    return record;
  }
}

module.exports = Queue;
```

# Linked List

- ordered collection of nodes, each node has some data and link to next node, also referred to as chain
- special nodes in linked list, head node, tail node (next points to null)
- node has data part, reference to next node

```javascript
const node1 = {
  data: 123
};
const node2 = {
  data: 456
};
// link the above
node1.next = node2;
```

```javascript
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(data) {
    this.head = new Node(data, this.head);
  }
  size() {
    let counter = 0;
    let node = this.head;
    while (node) {
      counter++;
      node = node.next;
    }
    return counter;
  }
  getFirst() {
    return this.head;
  }
  getLast() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }
  clear() {
    this.head = null;
  }
  removeFirst() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
  }
  removeLast() {
    if (!this.head) {
      return;
    }
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let previous = this.head;
    let node = this.head.next;
    while (node) {
      previous = node;
      node = node.next;
    }
    previous.next = null;
  }

  insertLast(data) {
    const last = this.getLast();

    if (last) {
      // There are some existing nodes in our chain
      last.next = new Node(data);
    } else {
      // The chain is empty!
      this.head = new Node(data);
    }
  }

  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }

      counter++;
      node = node.next;
    }
    return null;
  }

  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      return;
    }
    previous.next = previous.next.next;
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    const previous = this.getAt(index - 1) || this.getLast();
    const node = new Node(data, previous.next);
    previous.next = node;
  }

  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}
```

#### Note on generators

```javascript
function *numbers(){
  const result 1+1;
  return 20+(yield result);
}
const generator = numbers(); // returns object
generator.next(); // {value:2, done:false}
// execution paused at yield
generator.next() // {value:null, done: true}
generator.next(10) // {value:30, done: true}


function *list(){
  yield 1;
  yield 2;
}
const generator = list();
const number = [];
for(let value of generator){
  number.push(value)
}
console.log(number);//[1,2]
```

```javascript
class Tree {
  constructor(value = null, children = []) {
    this.value = value;
    this.children = children;
  }
  *printValues() {
    yield this.value;
    for (let child of this.children) {
      yield* child.printValues();
    }
  }
}

const tree = new Tree(1, [new Tree(2, [new Tree(4)]), new Tree(3)]);

// want to do dfs
const value = [];
for (let value of tree.printValues()) {
  values.push(value);
}
console.log(values);
```

- `*[Symbol.iterator]` enables a for..of loop on the linkedList

# Midpoint

- Directions
- Return the 'middle' node of a linked list. If the list has an even number of elements, return the node at the end of the first half of the list. _Do not_ use a counter variable, _do not_ retrieve the size of the list, and only iterate through the list one time.
- Example
- const l = new LinkedList();
- l.insertLast('a')
- l.insertLast('b')
- l.insertLast('c')
- midpoint(l); // returns { data: 'b' }

```javascript
function midpoint(list) {
  let slow = list.getFirst();
  let fast = list.getFirst();

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

# Loop in LinkedList

- Directions
- Given a linked list, return true if the list is circular, false if it is not.
- Examples
- const l = new List();
- const a = new Node('a');
- const b = new Node('b');
- const c = new Node('c');
- l.head = a;
- a.next = b;
- b.next = c;
- c.next = b;
- circular(l) // true

```javascript
function circular(list) {
  let slow = list.getFirst();
  let fast = list.getFirst();

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

# From Last

- Directions
- Given a linked list and integer n, return the element n spaces from the last node in the list. Do not call the 'size' method of the linked list. Assume that n will always be less than the length of the list.
- Examples
- const list = new List();
- list.insertLast('a');
- list.insertLast('b');
- list.insertLast('c');
- list.insertLast('d');
- fromLast(list, 2).data // 'b'

```javascript
function fromLast(list, n) {
  let slow = list.getFirst();
  let fast = list.getFirst();

  while (n > 0) {
    fast = fast.next;
    n--;
  }

  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}
```

# Trees

- node (data, children[])
- child nodes, sibling nodes (same level with same parent)
- leaf nodes (no more children)
- tree important traversal, breadth first, depth first
- Breadth First, iterate from left to right on each level
- Depth First, go deep , back up to a parent, then deep again

#### Node implementation

- Nodes,

```javascript
class Node {
  constructor(data = null) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new Node(data));
  }

  remove(data) {
    this.children = this.children.filter(node => {
      return node.data !== data;
    });
  }
}
class Tree {
  constructor() {
    this.root = null;
  }
  traverseBF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.push(...node.children);
      fn(node);
    }
  }

  traverseDF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.unshift(...node.children);
      fn(node);
    }
  }
}

const node = new Node(1);
const tree = new Tree();
tree.root = node;

/**
describe('Tree', () => {
  test('starts empty', () => {
    const t = new Tree();
    expect(t.root).toEqual(null);
  });

  test('Can traverse bf', () => {
    const letters = [];
    const t = new Tree();
    t.root = new Node('a');
    t.root.add('b');
    t.root.add('c');
    t.root.children[0].add('d');

    t.traverseBF(node => {
      letters.push(node.data);
    });

    expect(letters).toEqual(['a', 'b', 'c', 'd']);
  });

  test('Can traverse DF', () => {
    const letters = [];
    const t = new Tree();
    t.root = new Node('a');
    t.root.add('b');
    t.root.add('d');
    t.root.children[0].add('c');

    t.traverseDF(node => {
      letters.push(node.data);
    });

    expect(letters).toEqual(['a', 'b', 'c', 'd']);
  });
});
*/
```

# Tree width with level width

- width, BFS

```javascript
function levelWidth(root) {
  const arr = [root, 's'];
  const counters = [0];

  while (arr.length > 1) {
    const node = arr.shift();

    if (node === 's') {
      counters.push(0);
      arr.push('s');
    } else {
      arr.push(...node.children);
      counters[counters.length - 1]++;
    }
  }

  return counters;
}
```

# BST - binary search tree, atmost two children, value to the left is less than parent, value to the right is greater for each node

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  insert(data) {
    if (data < this.data && this.left) {
      this.left.insert(data);
    } else if (data < this.data) {
      this.left = new Node(data);
    } else if (data > this.data && this.right) {
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new Node(data);
    }
  }

  contains(data) {
    if (this.data === data) {
      return this;
    }

    if (this.data < data && this.right) {
      return this.right.contains(data);
    } else if (this.data > data && this.left) {
      return this.left.contains(data);
    }

    return null;
  }
}
```

# Validate a BST

- min , max

```javascript
/*
const Node = require('./node');
const validate = require('./index');

test('Validate recognizes a valid BST', () => {
  const n = new Node(10);
  n.insert(5);
  n.insert(15);
  n.insert(0);
  n.insert(20);

  expect(validate(n)).toEqual(true);
});

test('Validate recognizes an invalid BST', () => {
  const n = new Node(10);
  n.insert(5);
  n.insert(15);
  n.insert(0);
  n.insert(20);
  n.left.left.right = new Node(999);

  expect(validate(n)).toEqual(false);
});*/

function validate(node, min = null, max = null) {
  if (max !== null && node.data > max) {
    return false;
  }

  if (min !== null && node.data < min) {
    return false;
  }

  if (node.left && !validate(node.left, min, node.data)) {
    return false;
  }

  if (node.right && !validate(node.right, node.data, max)) {
    return false;
  }

  return true;
}

module.exports = validate;
```

# Back to JS Events

- own custom eventing library

```javascript
// --- Directions
// Create an 'eventing' library out of the
// Events class.  The Events class should
// have methods 'on', 'trigger', and 'off'.

class Events {
  constructor() {
    this.events = {};
  }

  // Register an event handler
  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
  trigger(eventName) {
    if (this.events[eventName]) {
      for (let cb of this.events[eventName]) {
        cb();
      }
    }
  }

  // Remove all event handlers associated
  // with the given eventName
  off(eventName) {
    delete this.events[eventName];
  }
}

module.exports = Events;
```

# how to design a service

- high level notes
- there is no right answer
- every interviewer will expect a different answer
- focus usually on data model
- dont mention specific technologies
- draw stuff
- talk

- identify two core features
- possible implementation
- identify and address difficulties
- solutions for scaling
