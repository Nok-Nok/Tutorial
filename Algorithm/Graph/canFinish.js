// Course Schedule

/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
 */

// This is a cycle problem
// Time Complexity: O(n) where n is length of the prerequisites
// Space Complexity: O(1)
function canFinish(numCourses, prerequisites) {
  // Construct a tree based on the prerequisites
  // Index: course number
  // Value: array of prerequesites
  const courses = new Array(numCourses).fill(0).map((e, i) => new Array());
  for (const [idx, prerequisite] of prerequisites) {
    courses[idx].push(prerequisite);
  }
  // DFS all courses
  const visited = new Set();

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(courses, i, visited)) return false;
  }
  return true;
  // DFS
  function dfs(courses, i, visited) {
    const course = courses[i];
    // Base case: if the course has been visted and still have preq
    if (visited.has(i)) return false;
    // Base case: if the course does not have any preq
    if (!course.length) return true;

    // Recursive case: & Back Tracking
    visited.add(i);
    while (course.length) {
      const prerequisite = course.pop();
      // Base case: if not possible, end
      if (!dfs(courses, prerequisite, visited)) return false;
    }
    visited.delete(i);
    return true;
  }
}

// prerequisites = [
//   [0, 10],
//   [3, 18],
//   [5, 5],
//   [6, 11],
//   [11, 14],
//   [13, 1],
//   [15, 1],
//   [17, 4],
// ];
// numCourses = 20;
prerequisites = [
  [0, 1],
  [0, 2],
  [1, 3],
  [4, 1],
  [3, 4],
];
numCourses = 5;
console.log(canFinish(numCourses, prerequisites));
