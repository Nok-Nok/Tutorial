// Number of Connected Components in an Undirected Graph

/**
 * You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

 

Example 1:


Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Example 2:


Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
 

Constraints:

1 <= n <= 2000
1 <= edges.length <= 5000
edges[i].length == 2
0 <= ai <= bi < n
ai != bi
There are no repeated edges.
 */

// Union - Find Algo
// Time complexity: O(E <<<<n)
// Space complexity: O(V)
function countComponents(n, edges) {
  // Create rank and parents array
  const parent = new Array(n).fill(0).map((_, i) => i);
  const rank = new Array(n).fill(1);

  // Initialize a set for connected path
  const connected = new Set(parent);
  // Loop through all edges, perform find & union and updagte connected set
  for (const [n1, n2] of edges) {
    union(n1, n2, parent, rank, connected);
  }

  // Return the connected size:
  return connected.size;
  function find(n, parent) {
    // Find parent of the current node
    let p = parent[n];
    // While root parent has not been found
    while (p !== parent[p]) {
      // Update the parent of current node
      parent[p] = parent[parent[p]];
      // Loop for the next parent
      p = parent[p];
    }
    // Return the root parent
    return p;
  }

  function union(n1, n2, parent, rank, connected) {
    // Find the root parents
    const p1 = find(n1, parent);
    const p2 = find(n2, parent);

    // If matching parent, return
    if (p1 === p2) return;
    // If rank of p1 > p2, merge p2 to p1 & update connected set
    if (rank[p1] >= rank[p2]) {
      // Merge n2 to p1
      parent[p2] = p1;
      rank[p1] += rank[p2];
      // Update connected set
      connected.delete(p2);
    }
    // Else merge p1 to p2 & update connected set
    else {
      // Merge n1 to p2
      parent[p1] = p2;
      rank[p2] += rank[p1];
      // Update connected set
      connected.delete(p1);
    }
  }
}

// (n = 5),
//   (edges = [
//     [0, 1],
//     [1, 2],
//     [3, 4],
//   ]);
// console.log(countComponents(n, edges));
// (n = 5),
//   (edges = [
//     [0, 1],
//     [1, 2],
//     [2, 3],
//     [3, 4],
//   ]);
// console.log(countComponents(n, edges));
// n = 4;
// edges = [
//   [2, 3],
//   [1, 2],
//   [1, 3],
// ];
// console.log(countComponents(n, edges));
