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

let list = new LinkedList();
for (i = 0; i < 10; i++) {
  list = list.insertAtHead(i);
}
list.insertAtTail(100);
list.insertAtTail(101);
list.printList();
list.search(90);
list.search(101);
console.log(list.searchRecursive(list.head, 99));
list.deletionAtHead();
list.printList();
console.log(list.deleteByValue(list, 6));
list.printList();

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

console.log(`Length of the list is ${lengthOfList(list)}`);

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
printList(reverseList(list));
