// Redundant Connection

/**
 * In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

 

Example 1:


Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
 

Constraints:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.
 */

// Time Complexity: O(N2)
// Space Compelxity: O(N)
function findRedundantConnection1(edges) {
  // Create a ranking and parent array
  const vertices = edges.length;
  const rank = new Array(vertices + 1).fill(1);
  const parent = new Array(vertices + 1).fill(0).map((_, i) => i);

  for (const [n1, n2] of edges) {
    // Get the parent of each node
    const p1 = parent[n1];
    const p2 = parent[n2];
    // If parent match, return this edge
    if (p1 === p2) return [n1, n2];
    // Recursive case:
    // If rank of p1 higher than p2, merge all p2 & its child to p1:
    if (rank[p1] >= rank[p2]) {
      // Loop through p2 child, and update them to p1
      for (let node = 1; node < parent.length; node++) {
        if (parent[node] === p2) parent[node] = p1;
      }
      // Update rank of p1
      rank[p1] += rank[p2];
    }
    // Else: rank of p2 higher than p1, merge all p1 & its child to p2:
    else {
      // Loop through p1 child, and update them to p2
      for (let node = 1; node < parent.length; node++) {
        if (parent[node] === p1) parent[node] = p2;
      }
      // Update rank of p2
      rank[p2] += rank[p1];
    }
  }
}

// Time Complexity: O(n): something about Inverse-Ackermann function for unionnize so it is close to O(n)
// Space Complexity: O(n) to store rank and parent
// This use union-find algo
// https://www.geeksforgeeks.org/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/
function findRedundantConnection(edges) {
  // Create a ranking and parent array
  const vertices = edges.length;
  const rank = new Array(vertices + 1).fill(1);
  const parent = new Array(vertices + 1).fill(0).map((_, i) => i);

  // Loop through all nodes/vertices and unionize them
  for (const [n1, n2] of edges) {
    // If parent of n1 & n2 match (a.k.a can't unionize further) return the pair
    if (!union(n1, n2)) return [n1, n2];
  }

  // Find the parent of a node
  function findParent(n) {
    let p = parent[n];
    // While not the top parent
    while (p != parent[p]) {
      // Update p parent
      parent[p] = parent[parent[p]];
      // Update p
      p = parent[p];
    }
    return p;
  }

  // Union of the two nodes
  function union(n1, n2) {
    // Get the parent of n1 & n2
    const p1 = findParent(n1);
    const p2 = findParent(n2);
    // Return false if already matched
    if (p1 === p2) return false;

    // Union p1 & p2, then return true
    //If rank p1 >= rank p2, merge p2 to p1
    if (rank[p1] >= rank[p2]) {
      parent[p2] = p1;
      rank[p1] += rank[p2];
    }
    // Else, merge p1 to p2
    else {
      parent[p1] = p2;
      rank[p2] += rank[p1];
    }
    return true;
  }
}
// edges = [
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [1, 4],
//   [1, 5],
// ];
// console.log(findRedundantConnection(edges));
// edges = [
//   [1, 2],
//   [1, 3],
//   [2, 3],
// ];
// console.log(findRedundantConnection(edges));
// edges = [
//   [1, 4],
//   [3, 4],
//   [1, 3],
//   [1, 2],
//   [4, 5],
// ];
// console.log(findRedundantConnection(edges));
// edges = [
//   [3, 4],
//   [1, 2],
//   [2, 4],
//   [3, 5],
//   [2, 5],
// ];
// console.log(findRedundantConnection(edges));
// edges = [
//   [1, 5],
//   [2, 4],
//   [3, 4],
//   [1, 3],
//   [3, 5],
// ];
// console.log(findRedundantConnection(edges));
// edges = [
//   [1, 3],
//   [1, 2],
//   [2, 5],
//   [3, 4],
//   [2, 4],
// ];
// console.log(findRedundantConnection(edges));
