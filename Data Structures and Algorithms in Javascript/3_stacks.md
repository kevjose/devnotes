# Stacks

Stacks and Queues are two data structures that provide more control over adding and removing elements than arrays.

#### The stack data structure

ordered collection of items that follows LIFO (last in first out) principle i.e., _addition and removal takes place at the same end_

#### creating an array based stack class

1. use array data structure to hold elements of stack
2. Stack follows LIFO hence limit functionalities to insert and remove elements
3. `push(element(s))`, adds new element(s) on the top of the stack
4. `pop()`, removes and return the top element of the stack
5. `peek()`, returns the top element and does not modify the Stack
6. `isEmpty()`, return true is Stack is empty, else false
7. `clear()`, removes all elements from the stack
8. `size()`, returns number of elements in the Stack

```
class Stack {
  constructor(){
    /* data structure to hold elements of stack, here we ill use array */
    this.items = [];
  }

  push(element){
    this.items.push(element);
  }

  pop(){
    this.items.pop();
  }

  peek(){
    return this.items[this.items.length -1];
  }

  isEmpty(){
    return this.items.length === 0;
  }

  clear(){
    this.items = [];
  }

  size(){
    return this.items.length;
  }
}
```

#### using the stack class

```
const stack = new Stack();
console.log(stack.isEmpty());
stack.push(5);
stack.push(8);
stack.peek() // 8
stack.size() // 2
stack.pop() // 8 also removes from Stack
```

#### Creating JS Object based Stack class

> worst case scenario in array is that we have to iterate over each element to do the operation we intend

with bigger size of array the Stack implementation with array it would take longer to iterate over.

From the above , it is possible to use a Javascript object to store Stack elements and also comply with the LIFO principle.

```
class Stack {
  constructor(){
    this.count = 0;
    this.items = {};
  }

  push(element){
    this.items[this.count] = element;
    this.count++ ;
  }

  pop(){
    if(this.isEmpty()){
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.count -1];
  }

  isEmpty(){
    return this.count === 0;
  }

  size(){
    return this.count;
  }

  clear(){
    this.items = {};
    this.count = 0;
  }

  toString(){
    if(this.isEmpty()){
      return '';
    }
    let objString = `$this.items[0]`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

#### Protecting internal elements of the data structure

1. with scoped Symbol
2. with WeakMap()
3. private class field proposal (prepend with # to make a property/ method private)

#### Converting Decimal to Binary

to convert a decimal base to binary:

1. divide by 2 until division result is 0
2. put the reminders in a Stack till division result is 0
3. pop() till Stack is empty, this is the binary representation

```
function decimalToBinary(decNumber){
 const rStack = new Stack();
 let number = decNumber;
 let binaryStr ='';
 let reminder;

 while (number> 0){
   reminder = Math.floor(number%2);
   rStack.push(reminder);
   number = Math.floor(number/2);
 }

 while(!rStack.isEmpty()){
   binaryStr += rStack.pop.toString();
 }

 return binaryStr;
}
```

#### The base converter Algorithm

modify the above to accep tany base from 2 to 36

```
function baseConverter(decNumber, base) {
  const rStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let reminder;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    reminder = Math.floor(number % base);
    rStack.push(reminder);
    number = Math.floor(number / base);
  }

  while (!rStack.isEmpty()) {
    baseString += digits[rStack.pop()];
  }

  return baseString;
}
```

#### balanced paranthesis

```
function paranthesisCheck(symbols){
  let stack = new Stack();
  let balanced = true;
  let opening = '({[';
  let closing = ')}]';
  let i = 0;
  let symbol;
  let top;

  while (i< symbols.length && balanced){
    symbol = symbols[i];
    if(open.indexOf(symbol)!== -1){
      stack.push = symbol;
    }else if (stack.isEmpty()){
      balanced = false;
    }else{
      top = stack.pop();
      if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
        balanced = false;
      }
    }
    i++;
  }
  return balanced && stack.isEmpty();
}

```
