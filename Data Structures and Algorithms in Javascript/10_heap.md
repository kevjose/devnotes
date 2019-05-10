# Binary Heap or Heap data structure

Binary Heap commonly used in priority queue due to efficiency in querying min and max values.

Special case of binary tree.

1. It is a complete binary tree, meaning all levels of the tree have both left and right children (with execption of leaf nodes), and last level has all children as left as possible (shape property)

2. Binary heap is either a min heap, or max heap (allows fast extraction of min or max respectively). All node are greater than or equal to or less than or equal to each of its child nodes (heap property)

Binary Heap is a Binary tree however not necessarily a BST.

In the binary heap, every child node needs to be greater than or equal to its parent node (min heap) or less than or equal to its parent node (max heap). In the BST, however, the left child is always smaller than its parent and the right child always has a greater key as well

Max-Heap: In a Max-Heap the key present at the root node must be greatest among the keys present at all of it’s children. The same property must be recursively true for all sub-trees in that Binary Tree.

Min-Heap: In a Min-Heap the key present at the root node must be minimum among the keys present at all of it’s children. The same property must be recursively true for all sub-trees in that Binary Tree.

#### Creating the Min-Heap class

```
class MinHeap {
  constructor(){
    this.heap =[];
  }
}
```

#### Binary tree array representation

To access nodes of a binary tree using arrays, we can manipulate the index with the following.

For any node at position _index_:

1. its left child is located at `2* index +1` - if available
2. its right child is located at `2* index +2` - if available
3. parent node is at `index/2`

```
getLeftIndex(index){
  return 2 * index +1;
}
getRightIndex(index){
  return 2 * index +2;
}
getParentIndex(index){
  if(index == 0){
    return undefined
  }
  return Math.floor((index-1) /2);
}
```

#### Operations on a head data structure

`insert(value)`, method inserts a value into the heap, returns `true` iif value inserted else `false`

`extract`, this method remove the min value in case of minHeap or max value in case of maxHeap and returns it.

`findMinimum()`, this method return the value without removing it.

#### Inserting a value into the heap

Insertion is performed by adding the _value_ at the bottom leaf i.e: the last position in the array, and then perform a `siftUp` method.

The `siftUp` method swaps the value with its _parent_, until, its _parent_ is smaller than the _value_.

```
insert(value){
  if(value != null){
    this.heap.push(value);
    this.siftUp(this.heap.lenght -1);
    return true;
  }
  return false;
}


siftUp(index){
  let parent = this.getParentIndex(index);
  while(index > 0 && this.heap[parent]> this.heap[index]){
    swap(this.heap, parent, index);
    index = parent;
    parent = this.getParentIndex(index);
  }
}


function swap (array, a , b){
  const temp = array[a]
  array[a] = array[b];
  array[b] = temp;
}
```

#### Finding the minimm from the heap

```
size(){
  return this.heap.length;
}

isEmpty(){
  return this.size === 0;
}

findMinimum(){
  return this.isEmpty()?undefined: this.heap[0];
}
```

#### Extracting the minimum

1. Remove the element located at the first _index_
2. After removal place the last element in place of the removed index and `siftDown`, i.e: swap the elements until the heap is organised again.

```
extract(){
  if(this.Empty()){
    return undefined
  }
  if(this.size() == 1){
    return this.heap.shift();
  }
  const removedValue = this.heap.shift();
  this.siftDown(0);
  return removedValue;
}
```

### The `siftDown()` operation

siftDown receives the index of the removed value, make a copy of the same and keep in `element`. also retrieve index of `left` and `right`. the sifting down consists of swappig with the smallest child.

```
siftDown(index){
  let element = index;
  const left = this.getLeftIndex(index);
  const right = this.getRightIndex(index);
  const size = this.size();
  if(left < size && this.heap[element]> this.heap[left]){
    element = left;
  }
  if(right < size && this.heap[element]> this.heap[right]){
    element = right
  }
  if(element !== index){
    swap(this.heap, index, element);
    this.siftDown(element);
  }
}
```

#### the heap sort

```
import { defaultCompare, swap } from '../../util';

function heapify(array, index, heapSize, compareFn) {
  let largest = index;
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;
  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

export default function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize, compareFn);
  }
  return array;
}
```
