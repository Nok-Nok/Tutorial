// 735. Asteroid Collision

/**
 * We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

Example 1:

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
Example 2:

Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
Example 3:

Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
 

Constraints:

2 <= asteroids.length <= 104
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0
 */

// This is a stack problem
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
// Time complexity: O(n)
// Space complexity: O(n)
var asteroidCollision = function (asteroids) {
  // Intialize a stack
  const stack = [];

  // Traverse through the asteroid from 2nd pos
  for (const cur of asteroids) {
    // Update the stack
    updateStack(cur, stack);
  }
  return stack;
};

function updateStack(cur, stack) {
  // Base Case:
  if (stack.length === 0) return stack.push(cur);

  // Recursive case
  // Pop prev val from stack
  const prev = stack.pop();
  // The two asteroids will only collide only if prev>0 && cur<0
  if (prev > 0 && cur < 0) {
    const diff = Math.abs(prev) - Math.abs(cur);
    // If pre val > cur val, push back pop value and conitnue
    if (diff > 0) stack.push(prev);
    // Else if same val: continue
    // Else:
    else if (diff < 0) {
      // Update the stack
      updateStack(cur, stack);
    }
  }
  // Else, push both to stack
  else stack.push(prev, cur);
}

// Think of not using recursion
// Time Complexity: O(n)
// Space Complexity: O(n)
var asteroidCollision = function (asteroids) {
  const stack = [];
  for (const cur of asteroids) {
    // if cur travel left => potential colision
    if (cur < 0 && stack.length) {
      // Obtain prev asteroid
      let prev = stack.pop();
      // If the prev asteroid travel right, and size is <= cur one, destroy
      while (prev > 0 && Math.abs(prev) < Math.abs(cur)) {
        prev = stack.pop();
      }

      const diff = Math.abs(prev) - Math.abs(cur);
      // If prev asteroid travel left, push both in
      if (prev < 0) stack.push(prev, cur);
      // If push the bigger one in stack else destroy both
      else if (diff > 0) stack.push(prev);
      else if (!prev || diff < 0) stack.push(cur);
    } else stack.push(cur);
  }
  return stack;
};
// asteroids = [5, 10, -5];
// console.log(asteroidCollision(asteroids));
// asteroids = [8, -8];
// console.log(asteroidCollision(asteroids));
// asteroids = [10, 2, -5];
// console.log(asteroidCollision(asteroids));
// asteroids = [-2, -1, 1, 2];
// console.log(asteroidCollision(asteroids));
// asteroids = [-2, -2, 1, -1];
// console.log(asteroidCollision(asteroids));
// asteroids = [1, -2, -2, -2];
// console.log(asteroidCollision(asteroids));
