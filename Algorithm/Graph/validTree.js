// Graph Valid Tree

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

function validTree1(n, edges) {
  // Create array for parent and rank
  const parent = new Array(n).fill(0).map((_, i) => i);
  const rank = new Array(n).fill(1);

  // Initialize a connected set
  const connected = new Set(parent);

  // Loop through all of the edges
  for (const [n1, n2] of edges) {
    // if union 2 nodes return false, we found circular, so return false
    if (!union(n1, n2, parent, rank, connected)) return false;
  }

  // Return true
  return connected.size === 1;
  // Find
  function find(n, parent) {
    // Obtain current parent
    let p = parent[n];

    // While not at root parent
    while (p !== parent[p]) {
      // Update the parent
      parent[p] = parent[parent[p]];
      // Navigate to that parent
      p = parent[p];
    }
    // Return the root parent
    return p;
  }
  // Union
  function union(n1, n2, parent, rank, connected) {
    // Find the root parents:
    const p1 = find(n1, parent);
    const p2 = find(n2, parent);
    // If same root parents the same, we found the circle, so return false
    if (p1 === p2) return false;
    // If rank of p1>= p2, merge p2 to p1
    if (rank[p1] >= rank[p2]) {
      parent[p2] = p1;
      rank[p1] += rank[p2];
      // Update connected set
      connected.delete(p2);
    }
    // Else, merge p1 to p2
    else {
      parent[p1] = p2;
      rank[p2] += rank[p1];
      // Update connected set
      connected.delete(p1);
    }
    return true;
  }
}

function validTree(n, edges) {
  // Construct an array for all neigbors
  const neighbors = new Array(n).fill(0).map((e) => []);

  // Loop through the edges to construct the neighbor array of undirected graph
  for (const [n1, n2] of edges) {
    neighbors[n1].push(n2);
    neighbors[n2].push(n1);
  }

  // Intialize a visited set to keep track of node we have visited in the path
  const visited = new Set();
  // return true if no cycle is detected during dfs and visited size is same as n
  return dfs(0, neighbors, visited, -1) && visited.size === n;

  function dfs(cur, neighbors, visited, prev) {
    // Base case: if already visited current node, there is a cycle, return false
    if (visited.has(cur)) return false;
    // Recursive case:
    // Add current node to the visited set for current path
    visited.add(cur);
    // Loop through all neighbors of current node
    for (const neighbor of neighbors[cur]) {
      // Skip if neighbor is the same as previous node
      if (neighbor === prev) continue;
      // Perform dfs
      // If found cycle during dfs, return false
      if (!dfs(neighbor, neighbors, visited, cur)) return false;
    }
    // Return true since no cycle after visiting all neighbors node
    return true;
  }
}

// n = 5;
// edges = [
//   [0, 1],
//   [0, 2],
//   [0, 3],
//   [1, 4],
//   // [5, 6],
// ];
// console.log(validTree(n, edges));
// n = 5;
// edges = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [1, 3],
//   [1, 4],
// ];
// console.log(validTree(n, edges));
