# Linked List

Dynamic data structure, we can add and remove elements accordingly the data structure will grow and shrink.

#### The linked list data structure

Linked list store a collection of elements,
unlike array these are not stored in contiguous memory locations.

Each element contains a node that store the data and also a reference (pointer) to next element. No need to shift elements in case of addition or removal like in case of arrays.

To access element in linked list we have to traverse from head to tail to get the element.

#### the Linked list class

```
function defaultEquals(a, b){
  return a === b;
}

class Node {
  // represents the element we want to add to LinkedList
  constructor(element){
    this.element = element;
    this.next = undefined;
  }
}

class LinkedList {
  constructor(equalsFn = defaultEquals){
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }
}
```

The LinkedList will support the following methods

`push(element)`, this adds a new element to end of the list

`insert(element, position)`, insert new element at specified position

`getElementAt(index)`, returns element at a specific index no removal.

`remove(element)`, removes element from the list,

`indexOf(element)`, returns the index of the element, else -1

`removeAt(index)`, removes element from specified index,

`isEmpty()`, this returns true if no element is linkedlist else false

`size()`, return the number of elements in the linked list.

`toString()`, returns a string representation of the linkedlist

#### pushing elements to the end of the linked list

1. Addition is first element
2. append to a existing list

```
push(element){
  const node = new Node(element);
  let current;
  if(this.head == null){
    this.head = node
  }else{
    current = this.head;
    while(current.next){
      // get to the last element
      current = current.next;
    }
    current.next = node;
  }
  this.count++;
}
```

#### Removing elements from specific index

1. removing the first element (point head to second element i.e current.next)
2. removing any other(get to the desired position keep ref to previous and current element, after reaching postion previous.next = current.next, this works for removing last element as well)

```
removeAt(index){
  if(index>=0 and index < count){
    let current = this.head;
    if(index == 0){
      this.head = current.next
    }else{
      let previous;
      for(let i = 0; i<index; i++){
        previous = current;
        current = current.next;
      }
      previous.next = current.next
    }
    this.count --;
    return current.element;
  }
  return undefined
}
```

#### looping through to the desired positon

```
getElementAt(index){
  if(index>=0 and index < count){
    let current = this.head;

    for(let i = 0; i<index; i++){
      current = current.next;
    }
    return current;
  }
  return undefined
}
```

#### Inserting new element at any position

method provides ability to add element at a given position within the linkedlist

we need to check if the position to be inserted is withing the bounds. Create a new node with the element

if the position to be inserted is the head, then assign head to current update node.next to current and assign node to this.head

if any other position, get previous node, current node is previous.next, assign node.next to current, update previous.next to node.

increment the count on insertion, return true if insert was performed.

```
insert(element, position){
  if(position >=0 and position<= this.count){
    const node = new Node(element);
    if(position == 0){
      const current = this.head;
      node.next = current;
      this.head = node;
    }else{
      const previous = this.getElementAt(position - 1);
      const current = previous.next;
      node.next = current;
      previous.next = node;
    }
    this.count++;
    return true;
  }
  return false;
}
```

#### the indexOf method: returns position of a given element if found, else -1

```
indexOf(element){
  let current = this.head;
  for(let i = 0; i< this.count and current != null; i++){
    if(element === current.element){
      return i;
    }
    current = current.next;
  }
  return -1;
}
```

#### Removing element from the linked list

```
remove(element) {
  const index = this.indexOf(element);
  return this.removeAt(index);
}
```

#### isEmpty, size, getHead, toString

```
size(){
  return this.count;
}

isEmpty(){
  return this.count === 0;
}

getHead(){
  return this.head;
}

toString(){
  if(this.head === null){
    return '';
  }else{

    let objString = `${this.head.element}`;
    let current = this.head.next;
    while(current.next){
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```

# Doubly LinkedList

Difference between linkedlist and Doubly linkedlist is there is a link to both next as well as previous element.

```
class DoubleNode extends Node {
  constructor(element, prev, next){
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(){
    super();
    // traversal from front to end via this.head and vice versa via this.tail
    this.tail = undefined;
  }
}
```

#### Inserting element a given position.

similar to linkedlist except that we have to control both next and prev properties.

check wether the insert is within the bound of the doubly linked list.

insertion can happen at the begining, end and between begin and end.

if insert is at begining, it can be first element or else no the first element.

in case its the first element assign the new node to both head and tail.

in case its not first element:current is this.head, update the node.next to this.head, current.prev = node and head now points to the node.

insert is at the end: current = this.tail, current.next = node, node.previous = current, update tail to node

any other position in between: get previous element, current = previous.next, previous.next = node, node.next = current, current.prev = node, node.prev = previous

increment count in case of successful insert.

```
insert(element, index){
  if(index >= 0 and index <= this.count){
    const node = DoubleNode(element);
    let current =  this.head;
    if (index == 0){
      if (this.head == null){
        this.head = node;
        this.tail = node;
      }else{
        node.next = this.head;
        current.prev = node;
        this.head = node;
      }
    }else if (index == this.count){
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    }else{
      const previous = this.getElementAt(index-1);
      current = previous.next;
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    this.count++;
    return true;
  }else{
    return false;
  }
}
```

#### Removing elements from a given index

removal at the beginining (special case if count is 1)
removal at the rear set current= this.tail, this.tail = current.prev, this.tail.next = undefined

other position get the current element update the previous.next and current.next.prev = previous.

```
removeAt(index){
  if (index >= 0 and index <= this.count){
    let current  = this.head;
    if(index == 0){
      this.head = current.next;
      if(this.count == 1){
        this.tail = undefined;
      }else{
        this.head.prev = undefined
      }
    }else if (index == this.count -1){
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    }else{
      current = this.getElementAt(index);
      const previous = current.prev;
      previous.next = current.next;
      current.next.prev = previous;
    }
    this.count--;
    return true;
  }
  return false
}
```

# Circular LinkedList

same as other linkedlist, however `this.tail.next` is not `undefined` and points to `this.head`

in doubly circular linkedlist `this.tail.next` points to `this.head` and `this.head.prev` points to `this.tail`

```
class CircularLinkedList extends LinkedList{
  constructor(){
    super()
  }
}
```

#### inserting a new element at a given position

```
insert(element, index){
  if(index >= 0 && index<= this.count){
    const node = new Node(element);
    let current = this.head;
    if(index == 0){
      if(this.head == null){
        this.head = node;
        node.next = this.head;
      }else{
        node.next = current;
        current = this.getElementAt(this.size());
        this.head = node;
        current.next = this.head;
      }
    }else{
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }
    this.count++;
    return true;
  }
  return false
}
```

#### removing elements from any position.

```
removeAt(index){
  if(index >= 0 && index<= this.count){
    let current = this.head;
    if(index == 0){
      if(this.size() === 1){
        this.head = undefined;
      }else{
        const removed = this.head;
        current = getElementAt(this.size());
        this.head = this.head.next;
        current.next = this.head;
        current = removed;
      }
    }else{
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;
    return current.element
  }
  return undefined;
}
```

#### Sorted Linked List
