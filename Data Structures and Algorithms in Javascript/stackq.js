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

class Queue {
  constructor() {
    this.items = [];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  getFront() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (!this.isEmpty()) {
      return this.items.shift();
    }
    return null;
  }
}

/**
 * Implement a function which will generate binary number from 1 to n in the form of a string using queue
 *
 * Solution: Start with enqueuing 1
 * Dequeue a number from the queue, Append 0 to it enqueue it back
 * Append 1 to the original number and also enqueue it back to queue
 * Keep repeating until n
 * Complexity O(n)
 */

function findBin(n) {
  let result = [];
  let myQueue = new Queue();
  var s1, s2;
  myQueue.enqueue(1);
  for (let i = 0; i < n; i++) {
    result.push(myQueue.dequeue());
    s1 = result[i] + '0';
    s2 = result[i] + '1';
    myQueue.enqueue(s1);
    myQueue.enqueue(s2);
  }
  return result;
}

/**
 * Reverse the first k elements in a given queue
 *
 * Solution: push first k elements into a stack
 * now pop the stack till empty while enqueuing into the end of the queue
 * now dequeue stacksize -k while enqueuing to the queue
 * Complexity: O(1)
 *
 */

function reverseK(queue, k) {
  if (!queue.isEmpty()) {
    let myStack = new Stack();
    var count = 0;
    while (count < k) {
      myStack.push(queue.dequeue());
      count++;
    }
    var size;
    while (!myStack.isEmpty()) {
      queue.enqueue(myStack.pop());
      size = queue.size();
    }
    for (let i = 0; i < size - k; i++) {
      queue.enqueue(queue.dequeue());
    }
  }
  return queue;
}

/**
 * Implement a queue using stacks
 *
 * Solution: The mainStack stores the queue elements while the tempStack acts as a temporary buffer
 * After every enqueue operation the newly inserted values is at the bottom of the main stack.
 * Before insertion all the other elements are transferred to the tempStack.
 * The new element is also added to the mainStack. Pop all elements to the mainStack and temp is empty
 *
 * Complexity enqueue - O(n)
 * dequeue - O(1)
 */

class newQ {
  constructor() {
    this.mainStack = new Stack();
    this.tempStack = new Stack();
  }

  enqueue(value) {
    while (!this.mainStack.isEmpty()) {
      this.tempStack.push(this.mainStack.pop());
    }
    this.tempStack.push(value);
    while (!this.tempStack.isEmpty()) {
      this.mainStack.push(this.tempStack.pop());
    }
    return this.mainStack;
  }

  dequeue() {
    return this.mainStack.pop();
  }
}

/**
 * Sort values in a stack
 *
 * Solution: we pop elements out of the stack until it is empty
 * As long as the popped value is larger than the top value in the tempstack we can push it.
 * the inner loop begins when stack.pop is smaller than the tempStack.top
 * In the above the all elements of the temp stack are shited back to stack and value is pushed to tempStack
 * Above ensures bottom of the tempStack will have smallest value
 *
 * When stack is empty pop tempStack back to stack
 * Complexity: O(n^2)
 */

function sortStackIter(stack) {
  let tempStack = new Stack();
  let value;
  while (!stack.isEmpty()) {
    value = stack.pop();
    if (value >= tempStack.getTop()) {
      tempStack.push(value);
    } else {
      while (!tempStack.isEmpty()) {
        stack.push(tempStack.pop());
      }
      tempStack.push(value);
    }
  }
  while (!tempStack.isEmpty()) {
    stack.push(tempStack.pop());
  }
  return stack;
}

function sortStackRec(stack) {
  if (!stack.isEmpty()) {
    //Pop the top element off the stack
    var value = stack.pop();
    sortStackRec(stack);
    // Push the top element back into the sorted stack
    insertRec(stack, value);
  }
}

function insertRec(stack, value) {
  if (stack.isEmpty() || value < stack.getTop()) stack.push(value);
  else {
    var temp = stack.pop();
    insertRec(stack, value);
    stack.push(temp);
  }
}

/**
 * Evaluate Postfix Expression using a Stack
 *
 * exp = 921*-8-4+ // 9-2*1-8+4
 * output 3
 * Solution: We check each character of the string from left to right
 * If found digit , push to stack,
 * If found operator, pop two element from the stack and solve - then push result back to stack
 * Complexity O(n)
 */

function evalPostfix(exp) {
  let myStack = new Stack();
  var op1, op2;
  for (let i = 0; i < exp.length; i++) {
    if (!isNaN(parseInt(exp[i], 10))) {
      myStack.push(parseInt(exp[i], 10));
    } else {
      op1 = myStack.pop();
      op2 = myStack.pop();
      myStack.push(op1, exp[i], op2); // this can be addition, multiplication, subtraction, division
    }
  }
  return myStack.pop();
}

/**
 * Check balanced parantheses
 *
 * Solution: We iterate over the string , once character at a time.
 * If we find a closing parantheses, return false under two conditions
 * 1. stack is empty
 * 2. the top element is not an opening parantheses of the same type
 *
 * Complexity: O(n)
 */

function isBalanced(exp) {
  var myStack = new Stack();
  for (var i = 0; i < exp.length; i++) {
    if (exp[i] == '}' || exp[i] == ')' || exp[i] == ']') {
      if (myStack.isEmpty()) {
        return false;
      }
      let output = myStack.pop();
      if (
        (exp[i] == '}' && output != '{') ||
        (exp[i] == ')' && output != '(') ||
        (exp[i] == ']' && output != '[')
      ) {
        return false;
      }
    } else {
      myStack.push(exp[i]);
    }
  }
  if (myStack.isEmpty() == false) {
    return false;
  }
  return true;
}
