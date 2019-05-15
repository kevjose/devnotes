/**
 * A linked list is formed of nodes, these are linked together like a chain
 * Each node holds data dn the forward pointer i.e pointer to next node in the list,
 * no backward pointers - signly linked list
 */

class Node {
  constructor(data) {
    this.data = data;
    this.nextElement = null;
  }
}

/**
 * Initially the linked list conatains a single node with a null value.
 * Its nextElement does not point to anything yet as list is empty
 */

/**
 * Linked list vs arrays
 * access - in linked list iterate through entire list O(n), in array access of index in contant time O(1).
 * insert - in linked list O(1), in array insert and then shift hence O(n)
 * delete - in linked list O(1), in array insert and then shift hence O(n)
 */

/**
 * isEmpty(), Basic condition for the list tot be considered as empty is that the head should be the only Node in the list
 * i.e head points to null
 */

/**
 * insertAtHead(dt), takes an integer value dt
 * and inserts it just after the head to make its first element.
 * Create a new node with the given value, call it tempNode
 * Make the nextElement of the tempNode to be == this.head.nextElement
 * tempNode will become nextElement of the head.
 */

/**
 * insertAtTail(dt), if the list is empty situation same as insertAthead,
 * otherwise loop till the tail and set new node as the nextElement.
 * Complexity: O(n) since we have to traverse to the end of the list
 */

/**
 * search(val), start from the first element
 * Traverse till you find the element or reach the end of the list
 * if value found return true else false
 * complexity O(n) traversal is there O(1) memory
 * Recursive solution also takes O(n) also O(n) memory complexity as well
 */

/**
 * deletionAtHead(), get head and first element,
 * make head.nextElement = first.nextElement and then set first.nextElement to null
 */

class LinkedList {
  constructor() {
    this.head = new Node(-1);
    this.length = 0;
  }
  isEmpty() {
    return this.length === 0;
  }
  insertAtHead(dt) {
    let tempNode = new Node(dt);
    tempNode.nextElement = this.head.nextElement;
    this.head.nextElement = tempNode;
    this.length++;
    return this;
  }

  insertAtTail(dt) {
    let tempNode = new Node(dt);
    let currentNode = this.head;
    if (currentNode.nextElement == null) {
      currentNode.nextElement = tempNode;
      this.length++;
      return true;
    }
    while (currentNode.nextElement != null) {
      currentNode = currentNode.nextElement;
    }
    currentNode.nextElement = tempNode;
    this.length++;
  }

  search(val) {
    let currentNode = this.head.nextElement;
    while (currentNode != null) {
      if (currentNode.data === val) {
        console.log(`${val} found`);
        return true;
      }
      currentNode = currentNode.nextElement;
    }
    console.log(`${val} not found`);
    return false;
  }

  searchRecursive(node, val) {
    if (node == null) {
      return false;
    }
    if (node.data == val) {
      return true;
    }
    return this.searchRecursive(node.nextElement, val);
  }

  deletionAtHead() {
    let head = this.head;
    let firstElement = head.nextElement;
    if (firstElement != null) {
      this.head.nextElement = firstElement.nextElement;
      firstElement.nextElement = null;
    }
  }

  deleteByValue(node, val) {
    let deleted = false;
    if (node.isEmpty()) {
      return deleted;
    }
    let currentNode = node.head.nextElement;
    let previousNode = null;
    if (currentNode.data == val) {
      this.deletionAtHead();
      deleted = true;
      return deleted;
    }
    while (currentNode != null) {
      if (currentNode.data == val) {
        previousNode.nextElement = currentNode.nextElement;
        currentNode.nextElement = null;
        deleted = true;
        return deleted;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextElement;
    }
    return deleted;
  }

  printList() {
    if (this.isEmpty()) {
      console.log('Empty List');
      return false;
    }
    let tempNode = this.head.nextElement;
    var output = String(tempNode.data) + '->';
    while (tempNode.nextElement !== null) {
      output = output.concat(String(tempNode.nextElement.data)).concat('->');
      tempNode = tempNode.nextElement;
    }
    console.log(output + 'null');
    return true;
  }
}
module.exports = {
  LinkedList: LinkedList
};

// let list = new LinkedList();
// for (i = 0; i < 10; i++) {
//   list = list.insertAtHead(i);
// }
// list.insertAtTail(100);
// list.insertAtTail(101);
// list.printList();
// list.search(90);
// list.search(101);
// console.log(list.searchRecursive(list.head, 99));
// list.deletionAtHead();
// list.printList();
// console.log(list.deleteByValue(list, 6));
// list.printList();

/**
 * Tail Pointer in a linked list
 * like the head we also keep account of the tail of the list
 * tail updates every timenew node is added/deleted to the end node
 * after additon of tail , insertAtTail is O(1),
 * Apart from tail operations,
 * insertion and deletion become twice as fast because we can traverse the list from both sides
 */

/**
 * Find the length of a given linked list
 *
 * Solution: get current element , traverse till the end while incrementing by one
 * complexity: O(n)
 */

function lengthOfList(list) {
  let length = 0;
  let currentNode = list.head.nextElement;
  while (currentNode != null) {
    length = length + 1;
    currentNode = currentNode.nextElement;
  }
  return length;
}

// console.log(`Length of the list is ${lengthOfList(list)}`);

/**
 * Given a linked list create function reverseList, which will reverse the given list
 *
 * Solution: for any current node, its link with the previous node is reversed, nextNode stores the next element
 *
 */

function printList(list) {
  if (list.isEmpty()) {
    console.log('Empty List');
    return false;
  }
  let tempNode = list.head.nextElement;
  var output = String(tempNode.data) + '->';
  while (tempNode.nextElement !== null) {
    output = output.concat(String(tempNode.nextElement.data)).concat('->');
    tempNode = tempNode.nextElement;
  }
  console.log(output + 'null');
  return true;
}

function reverseList(list) {
  let previousNode = null;
  let currentNode = list.head.nextElement;
  let nextNode = null;
  while (currentNode != null) {
    nextNode = currentNode.nextElement;
    currentNode.nextElement = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  list.head.nextElement = previousNode;
  return list;
}
// printList(reverseList(list));

/**
 * Detect loop in a linked list
 *
 * a loop is formed when a node in your linked list points to a previously traversed node.
 * Solution 1: Using a Set/List, we iterate over the linked list and add each visited node to a list or set.
 * Complexity: O(n)
 *
 * Solution 2: Floyd's cycle finding algorithm
 * Fastest algorithm to detect loops in a linked list.
 * track two iterators, onestep, twostep
 * onestep moves one node at a time, while twostep iterates over two nodes.
 * If a loop exists two iteratos will meet, when such condition is fulfilled, return true.
 * Complexity: O(n) however runs twice as fast
 */

function detectLoopList(list) {
  visitedNodes = [];
  currentNode = list.head.nextElement;
  while (currentNode != null) {
    if (visitedNodes.includes(currentNode)) {
      return true;
    }
    visitedNodes.push(currentNode);
    currentNode = currentNode.nextElement;
  }
  return false;
}

function detectLoopFloydCycle(list) {
  oneStep = list.head;
  twoStep = list.head;
  while (oneStep != null && twoStep != null && twoStep.nextElement != null) {
    oneStep = oneStep.nextElement;
    twoStep = twoStep.nextElement.nextElement;
    if (oneStep == twoStep) {
      return true;
    }
  }
  return false;
}

/**
 * Find the middle value of a given linked list
 *
 * for even list middle = length/2 for odd, middle = length/2 +1
 *
 * Solution 1: Traverse whole list find its length, middle can be calculated by halving the length,
 * then iterate till the middle
 * Complexity: O(n)
 *
 * Solution 2: two pointer, fast pointer moves two steps until the end of the list, slow pointer moves one step
 * when fast reached end the slow pointer will be at the middle
 * Complexity: O(n)
 *
 */
function findMidBrute(list) {
  if (list.isEmpty()) {
    return null;
  }
  let node = list.head;
  let mid = 0;
  if (list.length % 2 == 0) {
    mid = list.length / 2;
  } else {
    mid = list.length / 2 + 1;
  }
  for (i = 0; i < mid; i++) {
    node = node.nextElement;
  }
  return node.data;
}

function findMidTwoPointer(list) {
  if (list.isEmpty()) {
    return null;
  }
  let currentNode = list.head.nextElement;
  let midNode = currentNode;
  currentNode = currentNode.nextElement.nextElement;
  while (currentNode != null) {
    midNode = midNode.nextElement;
    currentNode = currentNode.nextElement;
    if (currentNode != null) {
      currentNode = currentNode.nextElement;
    }
  }
  if (midNode != null) {
    return midNode.data;
  }
  return null;
}

/**
 * Remove duplicates from a linked list
 *
 * Solution 1: two loops outer and inner node compare each to see if duplicate exists, if duplicate found it is removed
 * innerNode.nextElement = innerNode.nextElement.nextElement
 * Complexity: O(n^2)
 *
 * Solution 2: Use Set, keep a track of visited nodes
 * Complexity: O(n)
 */

function removeDupsLooped(list) {
  if (list.isEmpty()) {
    return null;
  }
  if (list.head.nextElement.nextElement == null) {
    return list; // Only one element
  }
  let outerNode = list.head.nextElement;
  while (outerNode != null) {
    let innerNode = outerNode;
    while (innerNode != null) {
      if (
        innerNode.nextElement != null &&
        outerNode.data == innerNode.nextElement.data
      ) {
        innerNode = innerNode.nextElement.nextElement;
      } else {
        innerNode = innerNode.nextElement;
      }
    }
    outerNode = outerNode.nextElement;
  }
  return list;
}

function removeDupsSet(list) {
  let currentNode = list.head.nextElement;
  let previousNode = list.head;
  let visitedNodes = [];
  if (!list.isEmpty() && currentNode.nextElement != null) {
    while (currentNode != null) {
      value = currentNode.data;
      if (visitedNodes.includes(value)) {
        previousNode.nextElement = currentNode.nextElement;
        currentNode = currentNode.nextElement;
        continue;
      }
      visitedNodes.push(currentNode.data);
      previousNode = currentNode;
      currentNode = currentNode.nextElement;
    }
  }
  return list;
}

/**
 * Union and intersection of linked lists
 *
 * Solution 1: traverse till the tail fo the first list and link it to the first node of the second list, remove dups
 * Complexity: O(m+n), because of dups we need to traverse the whole union set.
 *
 * Solution 1:
 *
 */

function union(list1, list2) {
  if (list1.isEmpty()) {
    return list2;
  }
  if (list2.isEmpty()) {
    return list1;
  }
  let start = list.head.nextElement;
  while (start.nextElement != null) {
    start = start.nextElement;
  }
  start.nextElement = list2.head.nextElement;
  list1.removeDupsSet();
  return list1;
}

function intersection(list1, list2) {
  let result = new LinkedList();
  let visitedNodes = [];
  let currentNode = list1.head.nextElement;

  while (currentNode != null) {
    let value = currentNode.data;
    if (!visitedNodes.includes(value)) {
      visitedNodes.push(value); //Visiting currentNode for first time
    }
    currentNode = currentNode.nextElement;
  }

  let start = list2.getHead().nextElement;
  while (start != null) {
    let val = start.data;
    if (visitedNodes.includes(val)) {
      result.insertAtTail(val);
    }
    start = start.nextElement;
  }
  result.removeDupsSet();
  return result;
}

/**
 * Return the Nth Node from the end
 *
 * Solution 1: Calculate the length of the linked list
 * check if n is within the length
 * find the position of the node using length -n+1
 * iterate over the node and return value
 * Complexity: O(n)
 *
 * Solution 2:
 * Check if n is in the bounds of the list
 * Move endNode forward n times and nthNode stays at the head
 * Move pointers together now
 * When endNode reaches the end the nthNode is on the Nth position from the end
 * Complexity: O(n)
 */

function findNth(list, n) {
  let len = list.length;
  let nPos = len - n;
  if (nPos < 0 || nPos > len) {
    return -1;
  }
  let currentNode = list.head.nextElement;
  let count = 0;
  while (count < nPos && currentNode != null) {
    currentNode = currentNode.nextElement;
    count++;
  }
  if (currentNode != null) {
    return currentNode.data;
  }
  return -1;
}

function findNth(list, n) {
  let nthNode = list.head;
  let endNode = list.head;
  let count = 0;
  if (!list.isEmpty()) {
    while (count < n) {
      if (endNode == null) {
        return -1; // out of bounds
      }
      endNode = endNode.nextElement;
      count++;
    }
  }
  while (endNode != null) {
    endNode = endNode.nextElement;
    nthNode = nthNode.nextElement;
  }
  if (nthNode != null) {
    return nthNode.data;
  }
  return -1;
}
