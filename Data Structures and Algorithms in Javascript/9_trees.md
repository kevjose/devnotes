# Trees

#### tree data structure

abstract model of a hierarchical structure, eg: family tree, org chart etc.

#### tree terminology

Tree consists of `node` with parent-child relationship, top node is called `root` does not have a parent, there exists internal and external nodes, internal nodes will have atleast one child, external nodes do not children, also called leaf node

`depth`, of a node is max number of anscetors.

`height`, id max depth of any node

#### The binary and binary search tree

`binary tree` has max of two children, a left child and a right child,

`binary search tree`, is a binary tree that allows lesser value on the left and node with greater value on the right hand side.

#### `Node` class to represent BST

```
class Node {
  constructor(key){
    this.key = key,
    this.left = null, // left child node reference
    this.right = null // right child node reference
  }
}
```

#### `BST` class

```
class BinarySearchTree {
  constructor(){
    this.root = null // root node of type Node
  }
}
```

Following methods will be created for the BST

`insert(key)`, inserts a new key into the tree

`search(key)`, searches for the key returns true if found else false

`inOrderTraverse()`, in-order traversal while visiting all nodes

`preOrderTraverse()`, pre-order traversal while visiting all nodes

`postOrderTraverse()`, post-order traversal while visiting all nodes

`min()`, this returns minimum key in the tree

`max()`, this returns maximum key in the tree

`remove(key)`, removes the given key from the tree

#### insert

```
class BinarySearchTree {
  constructor(){
    this.root = null // root node of type Node
  }

  insert(key){
    if(this.root == null){
      this.root = new Node(key);
    }else{
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key){
    if(key < node.key){
      if(node.left == null){
        node.left = new Node(key);
      }else{
        this.insertNode(node.left,key)
      }
    }else{
      if(node.right == null){
        node.right = new Node(key)
      }else{
        this.insertNode(node.right, key)
      }
    }
  }

}
```

#### tree traversal

Traversal is process of visiting each node and performing an operation, this can be accomplished in 3 ways

#### Inorder Traversal

visits all nodes of a BST in ascending order, meaning it will visit the node from smallest to largest

Application of inorder traversal -> sort a tree

```
class Node {
  constructor(key){
    this.key = key,
    this.left = null, // left child node reference
    this.right = null // right child node reference
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null // root node of type Node
  }

  insert(key){
    if(this.root == null){
      this.root = new Node(key);
    }else{
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key){
    if(key < node.key){
      if(node.left == null){
        node.left = new Node(key);
      }else{
        this.insertNode(node.left,key)
      }
    }else{
      if(node.right == null){
        node.right = new Node(key)
      }else{
        this.insertNode(node.right, key)
      }
    }
  }

  inOrderTraverse(callback){
    this.inOrderTraverseNode(this.root, callback);
    // the callback is used to perfom action on the node being visited (visitor pattern)
  }

  inOrderTraverseNode(node, callback){
    if(node != null){
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback){
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback){
    if(node != null){
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback){
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback){
    if(node != null){
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

}
```

#### Search for values in the tree.

```
min(){
  return this.minNode(this.root);
}

minNode(node){
  let current = node;
  while(current != null && current.left != null){
    current = current.left;
  }
  return current;
}

max(){
  return this.maxNode(this.root);
}

maxNode(node){
  let current = node;
  while(current != null && current.right != null){
    current = current.right;
  }
  return current;
}

search(key){
  this.searchNode(this.root, key);
}

searchNode(node, key){
  if(node == null){
    return false;
  }
  if(node.key > key){
    return this.searchNode(node.left, key)
  }else if (node.key < key){
    return this.searchNode(node.right, key)
  }else{
    return true;
  }
}
```

#### Removing a node

```
remove(key){
  this.root = this.removeNode(this.root, key)
}

removeNode(node, key){
  if(node == null){
    return null
  }

  if(node.key > key){
    node.left = this.removeNode(node.left, key)
    return node;
  }else if (node.key < key){
    node.right = this.removeNode(node.right, key)
    return node;
  }else{
    // key found
    // case 1: leaf node is being removed
    if(node.left == null && node.right == null){
      node = null;
      return node;
    }

    // case 2: remove node with one child left or right
    if(node.left == null){
      node = node.right;
      return node;
    }else if(node.right == null){
      node = node.left;
      return node;
    }

    // case 3: remove node with both left and right child
    // once the node to remove is found, we need to find the min node from the right hand side.
    // update the value of the node with the minNode
    // Now two nodes have same value and this is not aceptable in a tree.
    // remove the minNode from the right subtree.
    // return the node
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }

}
```

# Self Balancing trees

In a BST, depending on the nodes being added, one edge of the tree can grow deep, this can create performance issues in case of insertion or removal of a node into the tree

For the above reason we have AVL (Adelson-Velskii and Landi's tree) this is a self balancing tree meaning height of right ,left subtree differ by a max of 1.

#### AVL tree

```
class AVLTree extends BinarySearchTree {
  constructor(){
    super();
    this.root = null;
  }
  getNodeHeight(node){
    if(node == null){
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), thi.getNodeHeight(node.right))+1;
  }

  getBalanceFactor(node){
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch(heightDifference){
      case -2:
        return 'Unbalanced Right';
      case -1:
        return 'Slightly Unbalanced Right';
      case 1:
        return 'Slightly Unbalanced Left';
      case 2:
        return 'Unbalanced Right';
      default:
        return 'Balanced';
    }
  }

}
```

After insertion or removal there is a balancing process in AVL trees, Single Rotation, Double rotation

1. LL (Single rotation to the right)
2. RR (Single rotation to the left)
3. LR (rotate left then right)
4. RL (rotate right then left)

#### LL case: single rotation to the right

```
import { Compare, defaultCompare } from '../util';
import BinarySearchTree from './binary-search-tree';
import { Node } from './models/node';

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * Right left case: rotate right then left
   * @param node Node<T>
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    } if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        return this.rotationRL(node);
      }
    }
    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key); // {1}
    if (node == null) {
      return node;
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED
        || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Left right case
      if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED
        || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Right left case
      if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}
```
