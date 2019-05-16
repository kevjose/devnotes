/**
 * Trees consists of vertices and edges, these are heirarchical
 * Similar to graphs with no cycle
 * Root node - A node with no parents
 * Child node - A node which has a parent
 * Siblings - child nodes with same parent
 * Leaf node - has no child
 *
 * Subtree - tree formed by a node and its descendants
 * Degree of a node - Total number of children of a node
 * Length of a path - The number of edges in a path
 * Depth of a node n - The length of a path from a node n to the root node. depth of root node is 0
 * Height of a node n - the length of the path from n to its deepest descendant
 * height of root node from above is height of tree
 *
 * N-ary tree - is a rooted tree in which each node has no more than N children.
 * Binary tree tree is a special case where N=2
 * Binary tree , nodes can have max of 2 child nodes and min of 0
 *
 *
 */

/**
 * Balanced Tree
 * A binary tree is height balanced if:
 * - for each node in the tree, difference between the right subtree and the left subtree is less than or equal to 1
 * High level algorithm to determine if a tree is height balanced:
 * - start from the leaf nodes and move upwards to the root
 * - along with traversing the tree, compute the heights of the left and the right subtree, height of aleaf node is always 0
 * - at each node check the  diff between the right and the left subtree
 * - if diff more than 1 means tree is ot balanced
 * - if tree fully traversed then tree is balanced
 *
 */

/**
 * Binary tree
 * A tree that has 0-2 children, these are the left and the right child of the node
 * Complete binary tree - all levels are full except for the last one which starts filling from left
 * Full Binary tree - every node  has 0 or 2 children
 * Perfect binary tree - one which is complete and perfect:
 * total node in a perfect Binary tree of height h is 2^(h+1)-1
 * total leaf nodes 2^h
 *
 */

/**
 * Complete Binary tree
 * All levels are filled except maybe the last level.
 * Node at the last level are as left as possible
 * total number of nodes in a complete binary tree of height h are 2^h <=nodes <= 2^(h+1)-1
 * The above is based on geometric series formula 2^0+2^1...+2^r = 2^(r+1)-1
 *
 * Insertion on a Complete binary tree
 * - Nodes are inserted level bu level
 * - Fill the left subtree before moving to the right one
 *
 */

/**
 * Skewed Binary Tree
 * - all nodes except one have only one child
 * - left skewed has only left child nodes
 * - right skewed has only right child nodes
 */

/**
 * BST - Binary Search Tree
 * values of all the keys in the left subtree is less than the value of the node
 * values of all the leys in the right subtree is greater than the values of the node
 *
 */
class Node {
  constructor(value) {
    this.val = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

/**
 * BST insertion algorithm
 * - start from the root node
 * - Check if value to be inserted is greater than root/ current node's value
 * - if yes repeat for right subtree  otherwise repeat for left subtree
 * - repeat until we find a node that has no right/left child to move onto.
 * - Insert the given value and update the parent node accordingly.
 */

/**
 * Pre- Order Traversal:
 * The current node is visited before its children node.
 * Visit the currentNode ie. print its value
 * call preOrderPrint() on the left subtree of the currentNode
 * call preOrderPrint() on the right subtree of the currentNode
 * The recurrsive call to the rightChild happens once all the calls to the left subtree have been executed
 *
 * Complexity: O(n)
 */

/**
 * Inorder Traversal
 * the elements are traversed in left-root-right order
 * Traverse left subtree of the currentNode recursively - call inOrderPrint()
 * Visit the currentNode ie. print the currentNode.val
 * Traverse right subtree recursively
 */

/**
 * PostOrder
 * The elements are traversed in left-right-root order
 */

/**
 * Search BST: Iterative
 * Set the currentNode equal to root.
 * If val search is less move left otherwose right subtree
 * Repeat until we find the val or current becomes null
 */

/**
 * Deleting node from a BST
 * To Delete a node search for it, once found, make it null by making its left or right child's parent null.
 *
 * Case 1:
 * Deleting in an empty tree
 * if the given starting node is null, do nothing and return false
 *
 * Case 2:
 * Deleting a leaf node
 * if the node to be deleted is a leaf node, remove the leaf node by making the parent's left or right child as null.
 *
 * Case 3:
 * Deleting a node with one child
 * search the node, check number of children, if only one, we check current nodes parent , as to if current node is left or right child
 * accordingly we substitue current nodes child as the parents child.
 *
 * Case 4:
 * From the node to be deleted,
 * find the smallest node in the right subtree or the largest in the left subtree
 * Replace the node to  be deleted with the node found.
 * Finally delete the value that was replaced.
 *
 */

class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }
  insertIter(newValue) {
    if (this.root == null) {
      this.root = new Node(newValue);
      return;
    }
    let currentNode = this.root;
    while (currentNode) {
      parent = currentNode;
      if (newValue < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    if (newValue < parent.val) {
      parent.leftChild = new Node(newValue);
    } else {
      parent.rightChild = new Node(newValue);
    }
  }

  insertRecursiveHelper(currentNode, newValue) {
    if (currentNode == null) {
      currentNode = new Node(newValue);
    } else if (newValue < currentNode.val) {
      currentNode.leftChild = this.insertRecursiveHelper(
        currentNode.leftChild,
        newValue
      );
    } else {
      currentNode.rightChild = this.insertRecursiveHelper(
        currentNode.rightChild,
        newValue
      );
    }
    return currentNode;
  }
  insertRec(newValue) {
    if (this.root == null) {
      this.root = new Node(newValue);
      return;
    }
    this.insertRecursiveHelper(this.root, newValue);
  }

  preOrderPrint(currentNode) {
    if (currentNode != null) {
      console.log(currentNode.val);
      this.preOrderPrint(currentNode.leftChild);
      this.preOrderPrint(currentNode.rightChild);
    }
  }
  inOrderPrint(currentNode) {
    if (currentNode !== null) {
      this.inOrderPrint(currentNode.leftChild);
      console.log(currentNode.val);
      this.inOrderPrint(currentNode.rightChild);
    }
  }
  postOrderPrint(currentNode) {
    if (currentNode) {
      this.postOrderPrint(currentNode.leftChild);
      this.postOrderPrint(currentNode.rightChild);
      console.log(currentNode.val);
    }
  }

  searchIter(value) {
    let currentNode = this.root;
    while (currentNode && currentNode.val != value) {
      if (value < currentNode.leftChild) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return currentNode;
  }

  searchRecursiveHelper(currentNode, value) {
    if (currentNode !== null) {
      if (value == currentNode.val) {
        return currentNode;
      } else if (value < currentNode.val) {
        return this.searchRecursiveHelper(currentNode.leftChild, value);
      } else {
        return this.searchRecursiveHelper(currentNode.rightChild, value);
      }
    } else {
      return null;
    }
  }

  searchRec(value) {
    return this.searchRecursiveHelper(this.root, value);
  }

  delete(currentNode, value) {
    if (currentNode == null) {
      return false;
    }

    var parentNode;
    while (currentNode && currentNode.val != value) {
      parentNode = currentNode;
      if (value < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    if (currentNode === null) {
      return false;
    } else if (
      currentNode.leftChild == null &&
      currentNode.rightChild == null
    ) {
      if (currentNode.val == this.root.val) {
        this.root = null;
        return true;
      } else if (currentNode.val < parentNode.val) {
        parentNode.leftChild = null;
        return true;
      } else {
        parentNode.rightChild = null;
        return true;
      }
    } else if (currentNode.rightChild == null) {
      if (currentNode.val == this.root.val) {
        this.root = currentNode.leftChild;
        return true;
      } else if (currentNode.leftChild.val < parentNode.val) {
        parentNode.leftChild = currentNode.leftChild;
        return true;
      } else {
        parentNode.rightChild = currentNode.leftChild;
        return true;
      }
    } else if (currentNode.leftChild == null) {
      if (currentNode.val == this.root.val) {
        this.root = currentNode.rightChild;
        return true;
      } else if (currentNode.rightChild.val < parentNode.val) {
        parentNode.leftChild = currentNode.rightChild;
        return true;
      } else {
        parentNode.rightChild = currentNode.rightChild;
        return true;
      }
    } else {
      var minRight = currentNode.rightChild;
      while (minRight.leftChild !== null) {
        minRight = minRight.leftChild;
      }
      var temp = minRight.val;
      this.delete(this.root, minRight.val);
      currentNode.val = temp;
      return true;
    }
  }
}

/**
 * Find Minimum value in a BST
 *
 * Solution: check if root is null, return null,
 * keep traversing the left subtree as left will be smaller in the BST
 * once the left most is reaced this is the min value
 * Complexity: O(n)
 */

function findMinIter(rootNode) {
  if (rootNode == null) {
    return null;
  }
  while (rootNode.leftChild) {
    rootNode = rootNode.leftChild;
  }
  return rootNode.val;
}

function findMinRec(rootNode) {
  if (rootNode == null) {
    return null;
  } else if (rootNode.leftChild == null) {
    return rootNode.val;
  } else {
    return findMinRec(rootNode.leftChild);
  }
}

/**
 * Find the kth maximum value in a BST
 *
 * Solution: Sort the tree in order and get the output as an array and kth max will be tree.length-k
 * Complexity O(n)
 */
function inOrderTraversal(rootNode, tree) {
  if (rootNode !== null) {
    tree = inOrderTraversal(rootNode.leftChild, tree);
    tree.push(rootNode.val);
    tree = inOrderTraversal(rootNode.rightChild, tree);
  }
}
function findKMax(rootNode, k) {
  var tree = [];
  tree = inOrderTraversal(rootNode, tree);
  console.log(tree);
  if (tree.length - k >= 0) {
    return tree[tree.length - k];
  }
}

/**
 * Find ancestors of a given node in a binary tree
 */
