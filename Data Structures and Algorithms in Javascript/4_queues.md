# Queues and Deques

#### the queue data structure

ordered collection of items that follows FIFO principle.
Addition is at tail and removal from front.

#### creating the queue class

Methods available for the queue:

`enqueue(element)`, adds a new element to the queue at the back

`dequeue()`, removes element from front.

`peek()`, this returns the first element of the queue, the one that will be removed by the `dequeue()`

`isEmpty()`, returns true if queue does not have and elements

`size()`, return the number of element held in the queue.

```
class Queue {
  constructor(){
    this.count = 0; // keeps track of latest element
    this.lowestCount = 0; // keeps track of first element
    this.items = {}; // holds the elements of the Queue
  }

  enqueue(element){
    this.items[this.count] == element;
    this.count++;
  }

  dequeue(){
    if(this.isEmpty){
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek(){
    if(this.isEmpty){
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty(){
    return this.count - this.lowestCount === 0;
  }

  size(){
    return this.count - this.lowestCount;
  }

  clear(){
    this.items = {},
    this.count = 0;
    this.lowestCount = 0;
  }

  toString(){
    if(this.isEmpty()){
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for(let i = this.lowestCount+1; i<this.count; i++){
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}
```

#### using the queue class

```
const queue = new Queue();
console.log(queue.isEmpty()); // true
queue.enqueue('John');
queue.enqueue('Jack');
console.log(queue.toString()); // John, Jack
console.log(queue.size()); //2
console.log(queue.dequeue); // removes John
console.log(queue.peek()); // Jack
```

#### The deque data structure

double ended queue, allows addition and removal from either ends, deque applies both LIFO and FIFO

Deque implements the following:

`addFront(element)`, adds a new element at the begining of the queue.

`addBack(element)`, adds a new element at the end of the queue (same as queue enqueue)

`removeFront()`, removes element from front.(queue dequeue)

`removeBack()`, removes element from rear. (stack pop)

`peekFront()`, gets the first element value

`peekBack()`, gets the last element value

```
class Deque {
  constructor(){
    this.count = 0;
    this.items = {};
    this.lowestCount = 0;
  }

  isEmpty(){
    return this.count - this.lowestCount === 0;
  }

  addFront(element){
    if(this.isEmpty()){
      this.addBack(element);
    }else if(this.lowestCount > 0){
      this.lowestCount--;
      this.items[this.lowestCount]  = element
    }else{
      for(let i = this.count; i> 0; i++){
        this.items[i] = this.items[i-1];
      }
      this.count++;
      this.item[0] = element;
    }
  }

  addBack(element){
    this.items[this.count] = element;
    this.count++;
  }

  removeFront(){
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeback(){
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

#### Deque usage

```
const deque = new Deque();
console.log(deque.isEmpty()); // outputs true
deque.addBack('John');
deque.addBack('Jack');
console.log(deque.toString()); // John,Jack
deque.addBack('Camila');
console.log(deque.toString()); // John,Jack,Camila
console.log(deque.size()); // outputs 3
console.log(deque.isEmpty()); // outputs false
deque.removeFront(); // remove John
console.log(deque.toString()); // Jack,Camila
deque.removeBack(); // Camila decides to leave
console.log(deque.toString()); // Jack
deque.addFront('John'); // John comes back for information
console.log(deque.toString()); // John,Jack
```

#### the circular queue -Hot Potato

```
function hotPotato(elemList, num){
  const queue = new Queue();
  const eliminated = [];
  elemList.forEach((elem) => queue.enqueue(elem));
  while (queue.size() > 1){
    for(let i =0; i<num; i++){
      queue.enqueue(queue.dequeue());
    }
    eliminated.push(queue.dequeue());
  }

  return {
    eliminated:eliminated,
    winner: queue.dequeue()
  }
}
```

#### Palindrome checker

```
function palindromChecker(astring){
  if(!astring){
    return false;
  }
  const deque = new Deque();
  const lowerString = astring.toLowerCase().split(' ').join('');
  let first;
  let last;
  for(let i =0; i<lowerString.length; i++){
    deque.addBack(lowerstring.charAt(i));
  }
  while(deque.size()>1){
    first = deque.removeFront();
    last = deque.removeBack();
    if (first !== last) {
      return false;
    }
  }
  return true;
}
```
