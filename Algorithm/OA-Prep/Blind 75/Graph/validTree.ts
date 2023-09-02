// 261. Graph Valid Tree
/**
 * You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.

 

Example 1:


Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
Example 2:


Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
 

Constraints:

1 <= n <= 2000
0 <= edges.length <= 5000
edges[i].length == 2
0 <= ai, bi < n
ai != bi
There are no self-loops or repeated edges.
 */
// Graph problem
// Cyclic problem?
// Time Complexity: O(E) for constructing the tree array + O(V) for the recursive DFS, we visited each node at most once
// Space Complexity: O(E) for the tree array + O(V) for the visited set + O(V) for the recursive DFS, we visited each node at most once
function validTree(n: number, edges: number[][]): boolean {
  // There should be exact n-1 edge between n vertices for UNDIRECTD Graph
  if (edges.length != n - 1) return false;
  // Construct the undirected tree
  const tree: Set<number>[] = new Array(n).fill(0).map((e) => new Set());
  for (const [n1, n2] of edges) {
    tree[n1].add(n2);
    tree[n2].add(n1);
  }
  const visited: Set<number> = new Set();
  const result = dfs(0, -Infinity);
  return result && visited.size === n;
  function dfs(node: number, prevNode: number): boolean {
    // Basecase:
    // If find cyclic, return false
    if (visited.has(node)) return false;
    // Recursive
    // Remove the previous visited from the neighbor array
    tree[node].delete(prevNode);
    visited.add(node);
    for (const nextNode of tree[node]) {
      if (!dfs(nextNode, node)) return false;
    }
    return true;
  }
}

// Advanced graph approach
// Time Complexity: O(E+V) but we know E should be = V-1, else return false => O(2V) -> O(V)
// Space Complexity: O(E for tree array + 2V for visisted path and recursion) => E should be V-1 => O(3V) -> O(V)
function validTree(n: number, edges: number[][]): boolean {
  // There should be exact n-1 edge between n vertices for UNDIRECTD Graph
  if (edges.length != n - 1) return false;
  // Construct the undirected tree
  const tree: Set<number>[] = new Array(n).fill(0).map((e) => new Set());
  for (const [n1, n2] of edges) {
    tree[n1].add(n2);
    tree[n2].add(n1);
  }
  const visited: Set<number> = new Set();
  dfs(0);
  return visited.size === n;
  function dfs(node: number) {
    // Base case:
    // if visit a cyclic, skip
    if (visited.has(node)) return;

    // Recursive case:
    visited.add(node);
    for (const neighbor of tree[node]) {
      dfs(neighbor);
    }
  }
}

// Think about union find/Disjoint approach
// Time Complexity: O(V) for the parents array + O(E * alpha(E)) for looping through edges and perform Union Find
// Space Complexity: O(V) for the parents array
function validTree(n: number, edges: number[][]): boolean {
  // If not exact n-1 edge, we know either it is not connected or there is a cyle for UNDIRECTED graph
  if (edges.length != n - 1) return false;
  // Create the parent and rank table
  const parents = new Array(n).fill(0).map((_, i) => i);
  for (const [p1, p2] of edges) {
    const par1 = find(p1);
    const par2 = find(p2);
    if (par1 === par2) return false;
    // Union 2 nodes:
    parents[par2] = par1;
  }
  return true;
  // If 2 node has the same parent node => cyclic
  function find(p: number): number {
    // Base case: if p===parent => found parent
    while (p !== parents[p]) p = parents[p];
    return p;
  }
}
const n = 5,
  edges = [
    [0, 1],
    [2, 1],
    [2, 0],
    [2, 4],
  ];
console.log(validTree(n, edges));
