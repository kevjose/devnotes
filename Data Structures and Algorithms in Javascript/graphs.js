/**
 * Graphs is set of nodes that are connected in the form of a network
 * Vertex: also called nodes
 * Edges: links between nodes/vertices
 * Degree of a vertex: number of edges connected to a vertex
 * Adjacency: two vertex are adjacent if there is an edge connecting them directly
 *
 *
 * Two types of graphs: undirected, directed
 * Undirected: edges by default are bi-directional, max number of edges - C(n,2) =  n(n-1)/2
 * Directed graph: possible edges = n*(n-1)
 *
 * Representation of graph:
 * Adjacency Matrix: 2d matrix where cells contain 0 and 1 row and column heading being the vertices
 * if cell contains 1 edge exists
 *
 * Adjacency List: list of linked list used to store the edges in the graph. Size of list equals number of vertices
 * All the vertices connecting directly to a vertex are appended in the corresponding linked list
 */

const LinkedList = require('./linkedlist').LinkedList;
const Queue = require('./stackq').Queue;
const Stack = require('./stackq').Stack;

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.list = [];
    for (let i = 0; i < vertices; i++) {
      let temp = new LinkedList();
      this.list.push(temp);
    }
  }

  addEdge(source, destination) {
    this.list[source].insertAtHead(destination);
  }

  printGraph() {
    for (let i = 0; i < this.list.length; i++) {
      process.stdout.write('|' + String(i) + '|');
      let temp = this.list[i].head.nextElement;
      while (temp != null) {
        process.stdout.write('->' + String(temp.data));
        temp = temp.nextElement;
      }
      console.log('->' + 'null');
    }
  }
}

// let g = new Graph(4);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 3);
// g.printGraph();

/**
 * Complexities of graph operations
 *
 * Adjacency List:
 * Addition of edge operation takes constant time, we only insert at head
 * Removing Vertex O(V+E)
 * Removing Edge O(E)
 * Search O(V)
 *
 * Adjacency Matrix:
 * Edge operations constant time
 * Vertex operations O(V^2)
 * Search O(1)
 */

/**
 * Bipartite Graph
 * The vertices of this graph can be divided into two disjoint sets , such that no two vertices are adjacent in the same part
 * all acyclic graphs can be bipartite
 * cyclic graphs with even vertices can be bipartite , odd ones cannot i.e node cannot be divided into disjoint and non-adjacent sets
 *
 */

/**
 * Graph Traversal
 * Any Traversal need starting point, but graphs are non-linear, to give a better sense of traversal we have levels
 * take any vertex as the starting point, this is the lowest level in the search/traversal.
 * The next level consists of all the vertices adjacent to current vertex.
 *
 * Breadth First Search
 * - grows breadth wise
 * all nodes at a level are traversed before moving to the next level
 * level wise expansion ensure that for any starting vertex, one can reach all others one level at a time.
 * All the adjacent nodes are visited before moving to the next level.
 *
 * Depth First Search
 * - grows depth wise
 * Starting from any node we keep moving to an adjacent node until we reach the farthest level.
 * Move back to starting point and pick another adjacent node, probe till the farthest and move back.
 * Continue till all nodes are visited
 *
 */

/**
 * Implement the BFS
 *
 * graph in the form of an adjacency matrix and a starting vertex is given
 *
 * We will use a queue data structure,
 * Starting from the source vertex, we insert vertices into the queue
 * to keep track of visited, every vertex pushed into the queue is marked visited in the visited array
 * Complexity: Since whole graph is traversed once O(V+E)
 */

function bfsTraversal(g, source) {
  let result = '';
  let num_of_vertices = g.vertices;
  let visited = [];
  for (let i = 0; i < num_of_vertices; i++) {
    visited[i] = false;
  }
  let queue = new Queue();
  queue.enqueue(source);
  visited[source] = true;
  while (!queue.isEmpty()) {
    let current_node = queue.dequeue();
    result += String(current_node);
    let temp = g.list[current_node].head.nextElement;
    while (temp !== null) {
      if (visited[temp.data] == false) {
        queue.enqueue(temp.data);
        visited[temp.data] = true;
      }
      temp = temp.nextElement;
    }
  }
  return result;
}

// let g1 = new Graph(5);
// g1.addEdge(0, 1);
// g1.addEdge(0, 2);
// g1.addEdge(1, 3);
// g1.addEdge(1, 4);
// g1.printGraph();

// console.log(bfsTraversal(g1, 0));

/**
 * Implement Depth First Search
 *
 * Solution: Instead of a queue we will use a Stack since it follows last in first out
 *
 * Starting from the source, each node is pushed into the stack, when node is poped it is marked as visited
 * and adjacent nodes are pushed to the stack. We need the stack as it keeps popping the new adjacent nodes(node at a new level)
 * instead of nodes that we pushed
 * Complexity: O(V+E)
 */

function dfsTraversal(g, source) {
  let result = '';
  let num_of_vertices = g.vertices;
  let visited = [];
  for (var x = 0; x < num_of_vertices; x++) {
    visited.push(false);
  }
  let stack = new Stack();
  stack.push(source);
  visited[source] = true;
  while (stack.isEmpty() == false) {
    let current_node = stack.pop();
    result += String(current_node);
    let temp = g.list[current_node].head.nextElement;
    while (temp != null) {
      if (visited[temp.data] == false) {
        stack.push(temp.data);
      }
      temp = temp.nextElement;
    }
    visited[current_node] = true;
  }
  return result;
}

// let g = new Graph(5);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(1, 4);
// console.log(dfsTraversal(g, 0));

/**
 * Detect Cycle in Graph
 *
 * Cycle exists when you traverse a graph and come upon a vertex which has already been visited
 *
 * Apply the dfs traversal while checking if the node is visited if we get a true this means cycle exists.
 * Complexity: O(V+E)
 */

function detectCycle(g, source) {
  let num_of_vertices = g.vertices;
  let visited = [];
  for (let i = 0; i < num_of_vertices; i++) {
    visited.push(false);
  }
  let stack = new Stack();
  stack.push(source);
  visited[source] = true;
  while (!stack.isEmpty()) {
    let current_node = stack.pop();
    let temp = g.list[current_node].head.nextElement;
    while (temp !== null) {
      if (visited[temp.data] == false) {
        stack.push(temp.data);
        visited[temp.data] = true;
      } else {
        return true;
      }
      temp = temp.nextElement;
    }
  }
  return false;
}

/**
 * Find Mother Vertex:
 * Mother Vertex is one from which all other vertices are reachable
 *
 * Solution: We run a DFS on each vertex, and keep track of number of vertices visited in the search
 * If it equals g.vertices, then the vertex can reach all the vertices and hence is a mother vertex.
 * Complexity: O(V(V+E))
 *
 */

function findMotherVertex(g) {
  let num_of_vertices_reached = 0;
  for (let i = 0; i < g.vertices; i++) {
    num_of_vertices_reached = DFSForMotherVertex(g, i);
    if (num_of_vertices_reached == g.vertices) {
      return i;
    }
  }
  return -1;
}

function DFSForMotherVertex(g, source) {
  let num_of_vertices = g.vertices;
  let vertices_reached = 0;
  visited = [];
  for (let i = 0; i < num_of_vertices; i++) {
    visited[i] = false;
  }
  let stack = new Stack();
  stack.push(source);
  vertices_reached += 1;
  while (!stack.isEmpty()) {
    let current_node = stack.pop();
    let temp = g.list[current_node].head.nextElement;
    while (temp !== null) {
      if (visited[temp.data] == false) {
        stack.push(temp.data);
        visited[temp.data] = true;
        vertices_reached += 1;
      }
      temp = temp.nextElement;
    }
  }
  return vertices_reached;
}

/**
 * Count number of edges in a graph
 *
 *
 * Simply traverse through the complete adjacency list and count the size of each linked list
 * in an undirected graph the number of edges will be even as edges are bidrectional.
 * To get unique number of edges in the above return half the count.
 * Complexity : O(V+E)
 */

function numEdges(g) {
  let sum = 0;
  for (let i = 0; i < g.vertices; i++) {
    let temp = g.list[i].head.nextElement;
    while (temp !== null) {
      sum += 1;
      temp = temp.nextElement;
    }
  }
  return sum / 2;
}

/**
 * Check if path exists between two vertices
 * It takes a source and a destination and tellz us whether or not a path exists between the two.
 *
 * Do a DFS or BFS with source as starting check if destination comes in the visited node if so path found.
 * Complexity O(V+E)
 */

function DFSPathExists(g, source, destination) {
  let num_of_vertices = g.vertices;
  visited = [];
  for (let i = 0; i < num_of_vertices; i++) {
    visited[i] = false;
  }
  let stack = new Stack();
  stack.push(source);
  while (!stack.isEmpty()) {
    let current_node = stack.pop();
    let temp = g.list[current_node].head.nextElement;
    while (temp !== null) {
      if (visited[temp.data] == false) {
        stack.push(temp.data);
        visited[temp.data] = true;
        if (temp.data == destination) {
          return 'Path Exits';
        }
      }
      temp = temp.nextElement;
    }
  }
  return 'No Path';
}

/**
 * Check if given graph is a tree
 *
 * A graph can be a tree under two conditions:
 * - there are no cycles.
 * - graph is connected , ie. path exists between every pair of vertices
 *
 */

function checkCycle(g, node, visited, parent) {
  visited[node] = true;
  let adjacent = g.list[node].head.nextElement;
  while (adjacent) {
    if (visited[adjacent.data] == false) {
      if (checkCycle(g, adjacent.data, visited, node) == true) {
        return true;
      }
    } else if (adjacent.data == parent) {
      return true;
    }
    adjacent = adjacent.nextElement;
  }
  return false;
}

function isTree(g) {
  let visited = [];
  for (let i = 0; i < g.vertices; i++) {
    visited[i] = false;
  }
  if (checkCycle(g, 0, visited, -1) == true) {
    return false;
  }
  for (let i = 0; i < visited.length; i++) {
    if (visited[i] == false) {
      return false;
    }
  }
  return true;
}

/**
 * Find shortest path between two vertices
 *
 * Use BFS:
 * Similar to the visited array we introduce the distance array
 * For each node, the indexed value in distance shows the node's distance from the source
 * the rest is a simple bfs traversal where the distance is incremented by 1 each time
 * The distance of b will be shortest as it is visited once and will not be visited by the other longer path (that is why we use BFS)
 *
 * Complexity: O(V+E)
 */

function finMinPath(g, a, b) {
  let result = 0;
  let num_of_vertices = g.vertices;
  let visited = [];
  for (let i = 0; i < num_of_vertices; i++) {
    visited[i] = false;
  }
  let distance = [];
  for (let i = 0; i < num_of_vertices; i++) {
    distance[i] = false;
  }
  let queue = new Queue();
  queue.enqueue(a);
  visited[a] = true;
  while (!queue.isEmpty()) {
    let current_node = queue.dequeue();
    let temp = g.list[current_node].head.nextElement;
    while (temp !== null) {
      if (visited[temp.data] == false) {
        queue.enqueue(temp.data);
        visited[current_node] = true;
        if (distance[temp.data] == -1) {
          distance[temp.data] = distance[current_node] + 1;
        } else if (distance[temp.data] > distance[current_node] + 1) {
          distance[temp.data] = distance[current_node] + 1;
        }
      }
      temp = temp.nextElement;
    }
  }
  if (distance[b] != -1) {
    return distance[b] + 1;
  }
  return distance[b];
}

/**
 * Remove Edge
 */

function removeEdge(graph, source, dest) {
  if (graph.list.length == 0) {
    return graph;
  }

  if (source >= graph.list.length || source < 0) {
    return graph;
  }

  if (dest >= graph.list.length || dest < 0) {
    return graph;
  }

  graph.list[source].deleteVal(dest);
  return graph;
}
