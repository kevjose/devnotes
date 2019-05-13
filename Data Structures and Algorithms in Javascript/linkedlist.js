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

class LinkedList {
  constructor() {
    this.head = new Node(-1);
    this.length = 0;
  }
  isEmpty() {
    return this.length === 0;
  }
}
