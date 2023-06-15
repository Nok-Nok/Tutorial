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
nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums));
nums = [0, 1, 0, 3, 2, 3];
console.log(lengthOfLIS(nums));
nums = [7, 7, 7, 7, 7, 7, 7];
console.log(lengthOfLIS(nums));
