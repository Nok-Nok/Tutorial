// 207. Course Schedule

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
// Can I do this with Graph adn back tracking?
function canFinish1(numCourses: number, prerequisites: number[][]): boolean {
  const courses: number[][] = new Array(numCourses).fill(0).map((e) => []);
  for (const [course, preq] of prerequisites) {
    courses[course] = courses[course] ?? [];
    courses[course].push(preq);
  }
  for (let course = 0; course < courses.length; course++) {
    if (courses[course].length) {
      // If we can't complete all preqs, return false
      const preqs = courses[course];
      if (!isFinishable(preqs, new Set([course]))) return false;
      // If we were able to complete all preqs: empty its preqs
      courses[course] = [];
    }
  }
  return true;
  function isFinishable(preqs: number[], path: Set<number>) {
    // Base case: if preq is empty, return true
    if (preqs.length === 0) return true;

    // Recursive case:
    for (const course of preqs) {
      // Base case: if find cyclic, return false
      if (path.has(course)) return false;
      // Recursive case:
      path.add(course);
      // If we can't complete all preqs, return false
      if (!isFinishable(courses[course], path)) return false;
      // If we were able to complete all preqs: empty its preqs
      courses[course] = [];
      path.delete(course);
    }
    return true;
  }
}
// Time Complexity: O(p) for prequisite since we need to group preqs of each course + O(c) where c is number of courses since we will visit each course once
// Space Complexity: O(p) for courses array that group preqs of each course + O(c) for recursion stack + O(c) for the path
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Initialize an array where index = course and value = its prequisites
  const courses: number[][] = new Array(numCourses).fill(0).map((e) => []);
  for (const [course, preq] of prerequisites) {
    courses[course].push(preq);
  }
  for (let course = 0; course < courses.length; course++) {
    // If any course is not finishable, return false
    if (!isFinishable(course, new Set())) return false;
  }
  return true;
  function isFinishable(course: number, path: Set<number>) {
    // Obtain the preqs of the course
    const preqs = courses[course];
    // Base case: if find cyclic, return false
    if (path.has(course)) return false;
    // Base case: if preq is empty, return true
    if (preqs.length === 0) return true;

    // Recursive case:
    // Add the course to the path
    path.add(course);
    // Loop through all preqs of the course
    for (const preqCourse of preqs) {
      // Recursive case: if any preq is not finishable, return false
      if (!isFinishable(preqCourse, path)) return false;
    }
    path.delete(course);
    // If we were able to complete all preqs: empty its preqs
    courses[course] = [];
    return true;
  }
}
const numCourses = 6,
  prerequisites = [
    [1, 0],
    [2, 1],
    [3, 1],
    [0, 3],
    [4, 2],
    [5, 4],
  ];

console.log(canFinish(numCourses, prerequisites));
