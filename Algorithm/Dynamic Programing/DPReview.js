/**
 * @param {number} n
 * @return {number}
 */
// 1D bottom up approach
// Time: O(n)
// Space: O(n)
var climbStairs = function (n) {
  // Initialize the dp array
  const dp = new Array(n + 1).fill(0);
  // Initialize the start/end condition
  dp[n] = 1; // we need a minimum 1 step for jumping back
  for (let i = n; i >= 0; i--) {
    dp[i - 1] += dp[i];
    dp[i - 2] += dp[i];
  }
  console.table(dp);
  return dp[0];
};

// Topdown 1D approach
var climbStairs = function (n) {
  // Initialize prev & cur pos for when n=0
  let prev = 0; //f(n-1)
  let cur = 1; //f(n)
  for (let i = 1; i <= n; i++) {
    // Find next value: f(n+1) = f(n) + f(n-1)
    const next = cur + prev;
    // Move prev & cur
    prev = cur;
    cur = next;
  }
  return cur;
};

// n = 5;
// console.log(climbStairs(n));

// Time Complexity: O(n) where n is length of cost
// Space Complexity: O(1)
var minCostClimbingStairs = function (cost) {
  // Intiialize prev & cur pos
  let prev = 0;
  let cur = 0;
  for (let i = 0; i < cost.length; i++) {
    // f(n+1) = Math.min(f(n),f(n-1)) + next house cost
    const next = Math.min(prev, cur) + cost[i];
    // Move prev & cur
    prev = cur;
    cur = next;
  }
  return Math.min(prev, cur);
};
// cost = [10, 15, 20];
// console.log(minCostClimbingStairs(cost));
// cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
// console.log(minCostClimbingStairs(cost));
// Time: O(n)
// Space: O(1)
var rob = function (nums) {
  // Initialize prev & cur pos
  let prev = 0;
  let cur = 0;
  for (let i = 0; i < nums.length; i++) {
    // f(n) = Math.max(f(n-1), f(n-2)+cur house)
    const next = Math.max(cur, prev + nums[i]);
    // Move next & prev
    prev = cur;
    cur = next;
  }
  return cur;
};
// nums = [1, 2, 3, 1];
// console.log(rob(nums));
// nums = [2, 7, 9, 3, 1];
// console.log(rob(nums));

var rob = function (nums) {
  if (nums.length == 1) return nums[0];

  return Math.max(maxRob(nums, 1, 0), maxRob(nums, 0, 1));
  function maxRob(nums, start, end) {
    // Initialize prev & cur pos
    let prev = 0;
    let cur = nums[0 + start];
    for (let i = 1 + start; i < nums.length - end; i++) {
      // f(n) = Math.max(f(n-1), f(n-2)+cur house)
      const next = Math.max(cur, prev + nums[i]);
      // Move next & prev
      prev = cur;
      cur = next;
    }
    return cur;
  }
};
// nums = [1, 2];
// console.log(rob(nums));
// nums = [1, 2, 1, 1];
// console.log(rob(nums));

// Time: O(n)
// Space: O(1)
var numDecodings = function (s) {
  // Intialize cur & prev
  let prev = 0;
  let cur = 1;
  // f(n) = cur char=O ? 0 : f(n-1) + cur+prev char valid ? f(n-2) :0
  for (let i = 0; i < s.length; i++) {
    const next =
      (s[i] === '0' ? 0 : cur) +
      (Number(s[i - 1] + s[i]) <= 26 && Number(s[i - 1] + s[i]) >= 10
        ? prev
        : 0);
    // Update prev & cur
    prev = cur;
    cur = next;
  }
  return cur;
};
// s = '12';
// console.log(numDecodings(s));
// s = '226';
// console.log(numDecodings(s));
// s = '06';
// console.log(numDecodings(s));

// TopDown 1D approach
var coinChange = function (coins, amount) {
  // Intialize DP
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; //To reach 0 coin, we need 0 coins
  for (let i = 0; i < amount; i++) {
    if (dp[i] != Infinity) {
      for (const coin of coins) {
        // f(n) = min(cur, prev+1)
        dp[i + coin] = Math.min(dp[i + coin], dp[i] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Bottomup 1D approach
var coinChange = function (coins, amount) {
  // Intialize DP
  const dp = new Array(amount + 1).fill(Infinity);
  dp[amount] = 0; //Since we have not used any coins to reach the amount
  for (const coin of coins) {
    for (let i = amount; i >= coin; i--) {
      dp[i - coin] = Math.min(dp[i - coin], dp[i] + 1);
    }
  }
  return dp[0] == Infinity ? -1 : dp[0];
};

// (coins = [1, 2, 5]), (amount = 11);
// console.log(coinChange(coins, amount));
// (coins = [2]), (amount = 3);
// console.log(coinChange(coins, amount));
// (coins = [1]), (amount = 0);
// console.log(coinChange(coins, amount));

var maxProduct = function (nums) {
  // Nums can switch sign, keep track with all the min (lowest neg), all the max (highest pos) => if times cur val, we can get the max value
  // f(n) = Math.max(cur val,
  let min = 1;
  let max = 1;
  let maxP = -Infinity;
  for (const num of nums) {
    // Keep previous or reset
    const nextMin = Math.min(num, min * num, max * num);
    const nextMax = Math.max(num, min * num, max * num);
    min = nextMin;
    max = nextMax;
    maxP = Math.max(maxP, max);
  }
  return maxP;
};
// nums = [2, -5, -2, -4, 3];
// console.log(maxProduct(nums));
// nums = [-2, 0, -1];
// console.log(maxProduct(nums));
// nums = [-1, -2, -9, -6];
// console.log(maxProduct(nums));
// nums = [3, -1, 4];
// console.log(maxProduct(nums));
// nums = [1, 0, -1, 2, 3, -5, -2];
// console.log(maxProduct(nums));
// Time Complexity: O(n2)
// Space Complexity: O(n)
var lengthOfLIS = function (nums) {
  // Intialize a array to store increasing num
  const inSub = [];
  // Loop from end
  for (let i = nums.length - 1; i >= 0; i--) {
    const num = nums[i];
    // Push num to inSub if last val of inSub > num
    if (!inSub.length || inSub[inSub.length - 1] > num) inSub.push(num);
    // Insert num in the inSub array if the previous val >= num
    else {
      for (let j = inSub.length - 1; j >= 0; j--) {
        if (inSub[j - 1] > num || j === 0) {
          inSub[j] = num;
          break;
        }
      }
    }
  }
  return inSub.length;
};

// nums = [10, 9, 2, 5, 3, 7, 101, 18];
// console.log(lengthOfLIS(nums));
// nums = [0, 1, 0, 3, 2, 3];
// console.log(lengthOfLIS(nums));
// nums = [7, 7, 7, 7, 7, 7, 7];
// console.log(lengthOfLIS(nums));
// Topdown DP
// Time Complexity: O(n*t) where n is length of nums and t is the subset sum
// Space Complexity: O(n*t) where n is length of nums and t is the subset sum
var canPartition = function (nums) {
  // Find target
  let target = nums.reduce((prev, cur) => prev + cur);
  if (target % 2) return false;
  else target = target / 2;

  const cached = new Set();

  return dfs(nums, 0, 0);
  function dfs(nums, i, total) {
    // Base case: total = target, return true
    if (total === target) return true;
    // Base case: if total>target, in caches or end of nums, return false
    const key = i + ',' + total;
    if (total > target || cached.has(key) || i === nums.length) return false;

    // Recursive case:
    // Update cache
    cached.add(key);
    return dfs(nums, i + 1, total + nums[i]) || dfs(nums, i + 1, total);
  }
};
// Space Complexity: O(t) where t is the subset sum target
// Time Complexity: O(n*t) where n is length of nums and t is the subset sum target
var canPartition = function (nums) {
  // Find target
  let target = nums.reduce((prev, cur) => prev + cur);
  if (target % 2) return false;
  else target = target / 2;
  // dp
  let visited = new Set([0]);
  for (const num of nums) {
    const newVisited = new Set();
    for (const i of visited) {
      // Option 1: not add
      newVisited.add(i);
      // Option 2: add
      if (i + num <= target) newVisited.add(i + num);
    }
    if (newVisited.has(target)) return true;
    visited = newVisited;
  }
  return false;
};

var canPartition = function (nums) {
  // Find target
  let target = nums.reduce((prev, cur) => prev + cur);
  if (target % 2) return false;
  else target = target / 2;
  // Intialize dp array
  const dp = new Array(target + 1).fill(false);
  // If we start at target, we guarantee to get to target value
  dp[target] = true;
  for (const num of nums) {
    for (let i = 0; i <= target - num; i++) {
      dp[i] = dp[i] || dp[i + num];
    }
    if (dp[0]) return true;
  }
  return false;
};
// nums = [1, 5, 11, 5];
// console.log(canPartition(nums));
// nums = [1, 2, 3, 5];
// console.log(canPartition(nums));
// nums = [1, 2, 5];
// console.log(canPartition(nums));

var uniquePaths = function (m, n) {
  // Intiailize dp
  let dp = new Array(n).fill(0);
  // Since if we only have 1 last cell, we only 1 way to get to the star
  dp[n - 1] = 1;
  for (let i = 0; i < m; i++) {
    // Intialize newDp
    const newDp = new Array(n).fill(0);
    // Since if we only have 1 last cell, we only 1 way to get to the star
    newDp[n - 1] = 1;
    for (let j = n - 2; j >= 0; j--) {
      // f(n) = f(right)+f(down)
      newDp[j] = newDp[j + 1] + dp[j];
    }
    dp = newDp;
  }
  return dp[0];
};

// Optimize, but harder to come up with

var uniquePaths = function (m, n) {
  // Intiailize dp
  let dp = new Array(n).fill(0);
  // Since if we only have 1 last cell, we only 1 way to get to the star
  dp[n - 1] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = n - 2; j >= 0; j--) {
      // f(n) = f(right)+f(down)
      // f(cur) = f(prev right) + f(prev)
      dp[j] += dp[j + 1];
    }
  }
  return dp[0];
};
// (m = 3), (n = 7);
// console.log(uniquePaths(m, n));
// Topdown memoize DP
// Time Complexity: O(2*p)-> O(p): p is length of prices
// Space Complexity: O(2*p)-> O(p): p is length of prices
var maxProfit = function (prices) {
  const cache = {};
  return dfs(prices, 0, true);
  function dfs(prices, i, readyForBuy) {
    // Base case:
    // If exceed prices, return 0
    if (i >= prices.length) return 0;
    const key = i + ',' + readyForBuy;
    // If in cache, return cache
    if (key in cache) return cache[key];

    // Recursive case
    let buy = -Infinity;
    let sell = -Infinity;
    let skip = -Infinity;
    // Option 1: Skip
    skip = dfs(prices, i + 1, readyForBuy);
    // Option 2: If readyForBuy, buy
    if (readyForBuy) buy = dfs(prices, i + 1, false) - prices[i];
    // Option 3: If cannot buy, sell then skip
    else sell = dfs(prices, i + 2, true) + prices[i];
    // Return the max of 3 options
    return (cache[key] = Math.max(buy, sell, skip));
  }
};

// var maxProfit = function (prices) {};
// prices = [1, 2, 3, 0, 2];
// console.log(maxProfit(prices));
// prices = [1];
// console.log(maxProfit(prices));
// prices = [1, 2, 4];
// console.log(maxProfit(prices));
// prices = [1, 4, 2];
// console.log(maxProfit(prices));

// Time Complexity O(a*n) where a is the amount and n is length of coins
// Space Complexity: O(a) where a is the amount
var change = function (amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1; //there is 1 way to make amount of 0
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      // f(cur) = f(prev) + f(prev-coin)
      dp[i] = dp[i] + dp[i - coin];
    }
  }
  return dp[amount];
};
// (amount = 5), (coins = [1, 2, 5]);
// console.log(change(amount, coins));

// Time Complexity: O(n*s) where s is total of nums and n is length of nums
// Space Complexity: O(s) where s is the total of nums
var findTargetSumWays = function (nums, target) {
  // Intialize a cache
  let cache = { 0: 1 };
  for (const num of nums) {
    const newCache = {};
    for (let val in cache) {
      val = Number(val);
      newCache[val + num] = (newCache[val + num] ?? 0) + cache[val];
      newCache[val - num] = (newCache[val - num] ?? 0) + cache[val];
    }

    cache = newCache;
  }
  return cache[target] ?? 0;
};

// Time Complexity: O(n*s) where s is total of nums and n is length of nums
// Space Complexity: O(s) where s is the total of nums
var findTargetSumWays = function (nums, target) {
  // Find total
  let total = nums.reduce((prev, cur) => prev + cur);
  // Initialize dp
  let dp = new Array(total * 2 + 1).fill(0);
  dp[total] = 1;
  let range = 0;
  for (const num of nums) {
    const newDp = new Array(total * 2 + 1).fill(0);
    for (let i = total - range; i <= total + range; i++) {
      newDp[i + num] += dp[i];
      newDp[i - num] += dp[i];
    }
    range += num;
    dp = newDp;
  }
  return dp[total + target] ?? 0;
};

// (nums = [1, 1, 1, 1, 1]), (target = 3);
// console.log(findTargetSumWays(nums, target));

// Time Complexity: O(n*m)
// Space Complexity: O(n*m)
var longestIncreasingPath = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  // Contruct a cache matrix
  const cache = new Array(row).fill(0).map((e) => new Array(col).fill(0));
  let max = 1;
  // Loop through matrix
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (!cache[r][c]) dfs(r, c, matrix, row, col, cache, -Infinity);
    }
  }
  return max;
  function dfs(r, c, matrix, row, col, cache, prevVal) {
    // Base case: if out of bound, curVal<=prevVal, return 0
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || matrix[r][c] <= prevVal) return 0;
    // base case: if in cache/visited, return cache value
    if (cache[r][c]) return cache[r][c];

    // Recursive case:
    // Traverse left, right, up, down
    prevVal = matrix[r][c];
    cache[r][c] = 1;
    const left = dfs(r, c - 1, matrix, row, col, cache, prevVal);
    const right = dfs(r, c + 1, matrix, row, col, cache, prevVal);
    const up = dfs(r - 1, c, matrix, row, col, cache, prevVal);
    const down = dfs(r + 1, c, matrix, row, col, cache, prevVal);
    cache[r][c] += Math.max(left, right, up, down);
    // Update max
    max = Math.max(max, cache[r][c]);
    // Return cache
    return cache[r][c];
  }
};
// matrix = [
//   [3, 4, 5],
//   [3, 2, 6],
//   [2, 2, 1],
// ];
// console.log(longestIncreasingPath(matrix));
// matrix = [
//   [9, 9, 4],
//   [6, 6, 8],
//   [2, 1, 1],
// ];
// console.log(longestIncreasingPath(matrix));

// Time Complexity: O(s*t) where s is length of s and t is length of t
// Space Complexity: O(t) where t is length of t
var numDistinct = function (s, t) {
  let dp = new Array(t.length).fill(0);
  dp[-1] = 1; //for empty string, we will get 1 comb
  for (const charS of s) {
    const newDp = new Array(t.length).fill(0);
    newDp[-1] = 1;
    for (let i = 0; i < t.length; i++) {
      if (charS === t[i]) {
        // f(cur) = f(prev) + f(prev-1)
        newDp[i] = dp[i] + dp[i - 1];
      } else newDp[i] = dp[i];
    }
    dp = newDp;
  }
  return dp[t.length - 1];
};
// Optimized:
// Time Complexity: O(s*t)
// Space Complexity: O(t) rather O(2t) like previous approach
var numDistinct = function (s, t) {
  let dp = new Array(t.length).fill(0);
  dp[-1] = 1; //for empty string, we will get 1 comb
  for (const charS of s) {
    for (let i = t.length - 1; i >= 0; i--) {
      // f(cur) = f(prev) + f(prev-1)
      if (charS === t[i]) dp[i] += dp[i - 1];
    }
  }
  return dp[t.length - 1];
};
(s = 'rabbbit'), (t = 'rabbit');
console.log(numDistinct(s, t));
(s = 'babgbag'), (t = 'bag');
console.log(numDistinct(s, t));
