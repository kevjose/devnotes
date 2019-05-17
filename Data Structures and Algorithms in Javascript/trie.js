/**
 * Trie or prefix tree
 *
 * trie derived from retrieval - main purpose of the data structure is fast retrieval
 * used in dictionary searches, sarch engine auto-suggestions
 *
 * Properties of Trie
 * - similar to graph, as these are combination of nodes where each node represents a unique alphabet
 * - each node can point to null or other children nodes
 * - size fo the trie depends upon the umber of alphabets, numberof unique nodes in english will not exceed 26
 * - depth of trie depends on the longest word that it stores
 * - important poperty of trie is that it rpovids same path for words which share a common prefix.
 *
 * Node of a trie represents an alphabet. Typical node in a trie consists of three data members
 * - char: this store the character that the node is supposed to contain
 * - children: An array which consists of pointers to children nodes.
 * The size of the children array depends on the number of alphabets. Default all are set to 0
 * - isEndWord: A flag to indicate the end of a word. It is set to false by default, only updated when word end during insertion
 * when this flag is set to true, the node is treated as leaf.
 *
 *
 */

class TrieNode {
  constructor(char) {
    this.children = [];
    for (let i = 0; i < 26; i++) {
      this.children[i] = null;
    }
    this.isEndWord = false;
    this.char = char;
  }
  markAsLeaf() {
    this.isEndWord = true;
  }
  unMarkAsLeaf() {
    this.isEndWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode('');
  }
  getIndex(t) {
    return t.charCodeAt(0) - 'a'.charCodeAt(0);
  }
}
