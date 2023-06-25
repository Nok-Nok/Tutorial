// Count All Possible Routes

/**
 * You are given an array of distinct positive integers locations where locations[i] represents the position of city i. You are also given integers start, finish and fuel representing the starting city, ending city, and the initial amount of fuel you have, respectively.

At each step, if you are at city i, you can pick any city j such that j != i and 0 <= j < locations.length and move to city j. Moving from city i to city j reduces the amount of fuel you have by |locations[i] - locations[j]|. Please notice that |x| denotes the absolute value of x.

Notice that fuel cannot become negative at any point in time, and that you are allowed to visit any city more than once (including start and finish).

Return the count of all possible routes from start to finish. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5
Output: 4
Explanation: The following are all possible routes, each uses 5 units of fuel:
1 -> 3
1 -> 2 -> 3
1 -> 4 -> 3
1 -> 4 -> 2 -> 3
Example 2:

Input: locations = [4,3,1], start = 1, finish = 0, fuel = 6
Output: 5
Explanation: The following are all possible routes:
1 -> 0, used fuel = 1
1 -> 2 -> 0, used fuel = 5
1 -> 2 -> 1 -> 0, used fuel = 5
1 -> 0 -> 1 -> 0, used fuel = 3
1 -> 0 -> 1 -> 0 -> 1 -> 0, used fuel = 5
Example 3:

Input: locations = [5,2,1], start = 0, finish = 2, fuel = 3
Output: 0
Explanation: It is impossible to get from 0 to 2 using only 3 units of fuel since the shortest route needs 4 units of fuel.
 

Constraints:

2 <= locations.length <= 100
1 <= locations[i] <= 109
All integers in locations are distinct.
0 <= start, finish < locations.length
1 <= fuel <= 200
 */

/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
var countRoutes = function (locations, start, finish, fuel) {
  const mod = 10 ** 9 + 7;
  if (Math.abs(locations[finish] - locations[start]) > fuel) return 0;
  // Initialize cache
  const cache = new Map();
  return dfs(locations, start, fuel);
  function dfs(locations, cur, fuel) {
    // Compute the key (cur + fuel)
    const key = cur + ',' + fuel;
    // Base case: if in cache, return cache result
    if (cache.has(key)) return cache.get(key);

    // Recursive case:
    // Initialize number of path combs can be made from current position and amount of fuel
    let path = 0;
    // if reach finish line, increase path
    if (cur === finish) path++;
    // Loop through the location

    for (let i = 0; i < locations.length; i++) {
      // if pos is not the same as current
      if (i !== cur) {
        // Caculate the remaining fuel
        const remaining = fuel - Math.abs(locations[cur] - locations[i]);
        // if remaining >= 0, Call dfs
        if (remaining >= 0) {
          // Check if any other path after reaching finish line
          path += dfs(locations, i, remaining);
        }
      }
    }
    // Add to cache
    cache.set(key, path % mod);
    return path % mod;
  }
};
var countRoutes = function (locations, start, finish, fuel) {
  const cache = {};
  const mod = 10 ** 9 + 7;
  return dfs(start, fuel);
  function dfs(cur, fuel) {
    // If key in cache, return cache value
    const key = cur + ',' + fuel;
    if (key in cache) return cache[key];

    // Initialize number path
    let path = 0;
    // If has reached finish line, increase path by 1
    if (cur === finish) path++;
    // Loop through locations to find remaining path combination
    for (let i = 0; i < locations.length; i++) {
      // If new position is not the same as current position
      if (i !== cur) {
        // Caculate remaining
        const remaining = fuel - Math.abs(locations[cur] - locations[i]);
        // If remaining>=0; seach for possible path
        if (remaining >= 0) path += dfs(i, remaining);
      }
    }
    // Add value into cache
    return (cache[key] = path % mod);
  }
};

(locations = [2, 3, 6, 8, 4]), (start = 1), (finish = 3), (fuel = 5);
console.log(countRoutes(locations, start, finish, fuel));
(locations = [4, 3, 1]), (start = 1), (finish = 0), (fuel = 6);
console.log(countRoutes(locations, start, finish, fuel));
(locations = [5, 2, 1]), (start = 0), (finish = 2), (fuel = 3);
console.log(countRoutes(locations, start, finish, fuel));
