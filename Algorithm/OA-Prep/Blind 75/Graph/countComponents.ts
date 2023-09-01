// 323. Number of Connected Components in an Undirected Graph
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
// This is a union find question
// Space Complexity: O(V/n): number of vertices/node
// Time Complexity: O(V) for making the 2 arrays for parents and ranking + O(E * ) for unionFind the edge

function countComponents(n: number, edges: number[][]): number {
  // Create a matrix for ranking: Column 1: Parent, Column 2: Ranking
  const parents = new Array(n).fill(0).map((_, r) => r);
  const ranking = new Array(n).fill(1);
  // Loop through the edges
  for (const [p1, p2] of edges) {
    // Find the top parent of p1 & p2
    const par1 = find(p1);
    const par2 = find(p2);
    // Union the ranking
    if (par1 === par2) continue;
    ranking[par1] > ranking[par2] ? union(par1, par2) : union(par2, par1);
  }

  return ranking.reduce((prev, cur) => (cur > 0 ? prev + 1 : prev), 0);
  function find(p: number): number {
    // Base Case: When p = parent, we have found the top parent
    const parent = parents[p];
    if (p === parent) return p;
    // Recursive Case: find the top parent
    return find(parent);
  }
  // Union p2 into p1
  function union(p1: number, p2: number) {
    // Update ranking
    ranking[p1] += ranking[p2];
    ranking[p2] = 0;
    // Update parent
    parents[p2] = p1;
  }
}

const n = 5,
  edges = [
    [0, 1],
    [1, 2],
    [0, 2],
    [3, 4],
  ];

console.log(countComponents(n, edges));
