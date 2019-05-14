/**
 * Stack - LIFO, last in first out
 * the elements popped out of the stack in the exact reverse order that they were pushed in
 */

class Stack {
  constructor() {
    this.items = [];
    this.top = null;
  }
  getTop() {
    return this.top;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  push(element) {
    this.items.push(element);
    this.top = element;
  }
  pop() {
    if (!this.isEmpty()) {
      if (this.items.length == 1) {
        this.top = null;
        return this.items.pop();
      } else {
        this.top = this.items[this.items.length - 2];
        return this.items.pop();
      }
    } else {
      return null;
    }
  }
}

// var myStack = new Stack();

// for (var i = 0; i < 5; i++) {
//   myStack.push(i);
// }

// console.log('Is stack empty? ' + myStack.isEmpty());
// console.log('top: ' + myStack.getTop());

// for (var i = 0; i < 5; i++) {
//   console.log('Element popped: ' + myStack.pop());
//   console.log('top: ' + myStack.getTop());
// }

// console.log('Is stack empty?: ' + myStack.isEmpty());
// console.log('top: ' + myStack.getTop());

/**
 * Queue : Similar to Stack, another linear data structure, stores elements sequentially.
 * Queue implements FIFO, First in First Out, elements enter from one side and leave from front
 */
