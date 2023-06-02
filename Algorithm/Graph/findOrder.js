// Course Schedule II

/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)
prerequisites[i].length == 2
0 <= ai, bi < numCourses
ai != bi
All the pairs [ai, bi] are distinct.
 */

// Time Complexity: O(V+E) where V represents the number of vertices (number of courses) and E represents the number of edges (in the prerequisites array)
// Space Complexity: O(V+E): we will have E# call stacks (for recursion) and V# of visited courses (for the visited set)
function findOrder(numCourses, prerequisites) {
  // Construct a graph for prerequisite:
  const courses = new Array(numCourses).fill(0).map((e) => []);
  for (const [idx, prerequisite] of prerequisites) {
    courses[idx].push(prerequisite);
  }

  // DFS
  const visited = new Set();
  const result = new Set();
  for (let idx = 0; idx < numCourses; idx++) {
    if (result.has(idx)) continue;
    if (!dfs(courses, idx, visited, result)) return [];
  }
  return [...result];
  function dfs(courses, idx, visited, result) {
    const course = courses[idx];
    // Base Case: if course has been visited, return false
    if (visited.has(idx)) return false;

    // Recursive/Conditional case: dfs through all courses
    // Update Visited Set
    visited.add(idx);
    // Go through all prerequisite to confirm they are feasible
    for (const prerequisite of course) {
      if (!dfs(courses, prerequisite, visited, result)) return false;
    }
    courses[idx] = [];
    // Update Result
    result.add(idx);
    // Back Tracking
    visited.delete(idx);

    return true;
  }
}
// (numCourses = 4),
//   (prerequisites = [
//     [1, 0],
//     [2, 0],
//     [3, 1],
//     [3, 2],
//   ]);
// console.log(findOrder(numCourses, prerequisites));
