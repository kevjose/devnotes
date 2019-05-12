# Graphs

non linear data structure

#### Graph terminology

1. graph is an abstract for network structure.
2. graph is a set of nodes or vertices connected by edges, any binary relation can be represented by a graph, eg social network of facebook etc., this can be used to represnt roads, air routes etc as well.
3. Mathematically _G = (V, E)_, where _V_ is a set of vertices and _E_ is a set of edges connecting _V_
4. `Adjacent Vertices`, vertices connected by an edge.
5. `Degree`, number of adjacent vertices
6. `Path`, sequence of vertices where consecutive vertices are adjacent.
7. `Simple Path`, does not contain repeated vertices.
8. `Cycle`, is a simple path, except last vertex is same as first vertex.
9. `Acyclic`, that which does not have cycles
10. `Connected`, a graph is conneted if there is a path between every pair of vertices.
11. `Directed`, graph where edges have a direction.
12. `Strongly connected`, if there is directed path is both directons
13. `Weighted`, a graph that has values on the edges

#### Representing a graph

#### The Adjacency Matrix

Each node is represented by an integer i.e the index of the array.

We represent the connectivity between the nodes using a two dimensional array as array[i][j] = 1 and no connectivity as array[i][j] = 0

Problem with the above is in can of not strongly connected graph the number of zeroes in the adjacency matrix will be higher and hence loss of space. Another reason is that the number of vertices may increase and the two dimensional array if not flexible.

#### The Adjacency List

This consists of a list of adjacent vertices for every vertex of the graph
this can be represented using an array, linked list or a hash map or Dictionary.

#### The incidence matrix

Here each row of the matrix is a vertex while coloumns are the edges.

if the node _v_ has incidence on edge _e_ then array[v][e] =1, else array[v][e] = 0

#### Creating the Graph Class

```
class Graph {
    constructor(isDirected = false){
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }


    addVertex(v){
        if(!this.vertices.includes(v)){
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    addEdge(v,w){
        if(!this.vertices.includes(v)){
            this.addVertex(v);
        }
        if(!this.vertices.includes(w)){
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if(!this.isDirected == true){
            this.adjList.get(w).push(v);
        }
    }

    getVertices(){
        return this.vertices;
    }

    getAdjList(){
        return this.adjList;
    }

    toString(){
        let s = '';
        for(let i =0; i< this.vertices.length; i++){
            s += `${this.vertices[i]} ->`;
            let neighbours = this.adjList.get(this.vertices[i]);
            for( let j =0; j< neighbours.length; j++){
                s += `${neighbours[j]}`;
            }
            s += '\n';
        }
        return s;
    }
```

#### Graph Traversal

In graph traversal we must trackeach vertex whenwe first visit it and keep track of vertices that are not yet completely explored.

To completely explore a vertex,

1. look at each edge of this vertex.
2. for each edge connected to a vertex that has not been visited yet, mark it as discovered and add it to the list of vertices to be visited.
3. An efficient algorithm will visit the vertex twice for each of the endpoints to tbe explored.

Color coding for vertex visit

1. White, vertex not visited
2. grey, vertex visited not explored
3. black, vertex completely explored

```
const initialiseColor = vertices => {
    const color = {};
    for(let i = 0; i< vertices.length; i++){
        color[vertices[i]] = Colors.White;
    }
    return color;
}
```

#### Breadth First Search (BFS)

BFS starts by traversing the graph from the first specified vertex and visits all the neighbours(adjacent vertices), one layer at a time.

BFS algorithm steps:

1. Create a Queue _Q_
2. Mark _v_ as discovered ie grey, and enqueue v to _Q_
3. While Q is not empty, dequeue u from Q, Mark u as discovered, enqueue all unvisited neighbour w of u, Mark u as explored i.e black

```
const breadthFirstSearch = (graph, startvertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const queue = new Queue();
    const color = initialLiseColor(vertices);
    while(!queue.isEmpty()){
        const u = queue.dequeue();
        const neighbours = adjList[u];
        color[u] = grey;
        for(let i =0; i< neighbours.length; i++){
            const w = neighbours[i];
            if(color[w] == white){
                color[w] = grey;
                queue.enqueue(w);
            }
        }
        color[u] = black;
        if(callback){
            callback(u);
        }
    }
}
```

#### Finding shortest path using BFS

#### Dijkstra's Algorithm

greedy algorithm, to calculate shortest path between a single vertex and all other vertices

```
var graph = [
    [0,2,4,0,0,0],
    [0,0,1,4,2,0],
    [0,0,0,0,3,0],
    [0,0,0,0,0,2],
    [0,0,0,3,0,2],
    [0,0,0,0,0,0]
]
const INF = Number.MAX_SAFE_INTEGER;
const dijkstra = (graph, src) => {
    const dist = [];
    const visited = [];
    const {length} = graph;
    for(let i = 0 ; i<length; i++){
        dist[i] = INF;
        visited[i] = null;
    }
    dist[src] = 0;
    for(let i = 0; i< length-1; i++){
        const u = minDistance(dist, visited);
        visited[u] = true;
        for(let v = 0; v<length; v++){
            if(!visited[v] && graph[u][v]!==0 && dist[u]!= INF && dist[u]+ graph[u][v]< dist[v]){
                dist[v] = dist[u]+ graph[u][v];
            }
        }
    }
    return dist
}


const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for(let v= 0; v< dist.length; v++){
        if(visited[v] == false && dist[v] <= min){
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

// dist = [0,INF, INF, INF, INF, INF]
// visited = [false, false, false, false, false]
// minDistance(dist, visited);
// min =0, minIndex = 0; for loop ; return 0
// u = 0, visited[0] = true;
// dist[1] = dist[0]+ graph[0][1] = 2
// ....
```

1. Initialise all distances {dist} as infinity and all visited as false.
2. set the distance of the source from itself to be 0.
3. Find shortest path for all vertices.
4. select minimum distance vertex from the set of vertices that have not been processed yet.
5. mark the vertex as visited so that its not calculated twice.
6. In case shortest path is found we will set the value of the shortest path
7. After all vertices are processed, we will return result containing, shortest path value, from the src to all other vertices of the graph

#### The Floyd Warshall Algorithm

With this we can find shortest path from all sources to all vertices.

```
const floydWarshall = (graph) => {
    const dist = [];
    const {length} = graph;
    for(let i =0; i< length; i++){
        for(let j =0; j<length; j++){
            if(i === j){
                dist[i][j] = 0; // distance to itself
            }else if(!isFinite(graph[i][j])){
                dist[i][j] = INF; // distance is infinity where vertices are not connected
            }else{
                dist[i][j] = graph[i][j];
            }
        }
    }

    for(k = 0; k< length; k++){
        for(let j =0; j< length; j++){
            for(i=0; i< length; i++){
                if(dist[i][k]+ dist[k][j] < dist[i][j]){ // core algorithm for the floyd warshall algorithm, here we calculate distance of i, j via k and reassign distances accordingly
                    dist[i][j] = dist[i][k]+ dist[k][j];
                }
            }
        }
    }
}
```

#### Minimum Spanning tree

solves, n islands and want to build bridges with minimum cost.
islands are the vertices and edges the cost.

Two algorithms to find the MST

1. Prim's Algorithm
2. Kruskal's Algorithm

#### Prims Algorithm:

Greedy Algorithm, that finds MST for connected, weighted, undirected graph. It finds a subset of the edges that forms a tree that includes all the vertices, where total weight of all the edges in the tree is minimized.
