// Time complexity: O(n)
// Space complexity: O(n)
var climbStairs = function (n) {
  // Intiialize a dp array
  const dp = new Array(n + 1).fill(0);
  // Initialize the start/end condition
  dp[0] = 1;
  // Loop through the array
  for (let i = 0; i < n; i++) {
    // Step 1 step
    dp[i + 1] += dp[i];
    // Step 2 steps
    dp[i + 2] += dp[i];
  }
  console.table([dp]);
  return dp[n];
};

// n = 10;
// console.log(climbStairs(n));

var minCostClimbingStairs = function (cost) {
  const len = cost.length;
  // Initialize a dp array
  const dp = new Array(cost.length + 2).fill(Infinity);
  // Initilize the start/end condition
  dp[0] = 0;
  dp[1] = 0;
  // Loop through the array
  for (let i = 0; i < cost.length; i++) {
    // Step 1 step
    dp[i + 1] = Math.min(dp[i + 1], cost[i] + dp[i]);
    // step 2 step
    dp[i + 2] = Math.min(dp[i + 2], cost[i] + dp[i]);
  }

  // console.table([dp]);
  return Math.min(dp[len], dp[len + 1]);
};

// cost = [10, 15, 20];
// console.log(minCostClimbingStairs(cost));

var rob = function (nums) {
  // Intiialize a DP array
  const dp = nums.slice();

  // Loop through the array
  for (let i = 0; i < dp.length; i++) {
    // Either rob 2 hours before and 3 house before
    dp[i] = dp[i] + Math.max(dp[i - 2] ?? 0, dp[i - 3] ?? 0);
  }
  // console.table([dp]);
  return Math.max(dp[nums.length - 1], dp[nums.length - 2] ?? 0);
};
// nums = [1, 2, 3, 1];
// console.log(rob(nums));
// nums = [2, 7, 9, 3, 1];
// console.log(rob(nums));

var longestPalindrome = function (s) {
  let iS = (iE = 0);
  for (let i = 0; i < s.length; i++) {
    const [iS1, iE1] = palindromeLength(i, i);
    const [iS2, iE2] = palindromeLength(i, i + 1);
    if (iE1 - iS1 > iE - iS) [iS, iE] = [iS1, iE1];
    if (iE2 - iS2 > iE - iS) [iS, iE] = [iS2, iE2];
  }
  return s.slice(iS, iE + 1);
  function palindromeLength(iS, iE) {
    // Base case: when S & E are not matching or no mose iS or no more iE, return the length, excluding the two characters
    if (!s[iS] || !s[iE] || s[iS] != s[iE]) return [iS + 1, iE - 1];
    // Recursive case: expand the paldinrome
    return palindromeLength(iS - 1, iE + 1);
  }
};
// s = 'babad';
// console.log(longestPalindrome(s));

var numDecodings = function (s) {
  // Intiialize the dp array
  const dp = new Array(s.length + 1).fill(0);
  // Initialize ending condigion
  dp[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    // If the current character can stand alone, add the next comb
    if (s[i] === '0') continue;
    dp[i] += dp[i + 1];
    // If current char + next is a valid combo, add the next next comb
    if (Number(s[i] + s[i + 1]) <= 26) dp[i] += dp[i + 2];
  }

  return dp[0];
};
// s = '06';
// console.log(numDecodings(s));

var coinChange = function (coins, amount) {
  // Initialize the dp array fill w/ Infinity since we are looking for the min
  const dp = new Array(amount + 1).fill(Infinity);
  // Intialize the end condition:
  dp[amount] = 0; //since we have not use any coint to reach to the amount
  for (const coin of coins) {
    for (let i = amount; i >= coin; i--) {
      dp[i - coin] = Math.min(dp[i - coin], dp[i] + 1);
    }
  }
  // console.table([dp]);
  return dp[0] === Infinity ? -1 : dp[0];
};
// (coins = [1, 2, 5]), (amount = 11);
// console.log(coinChange(coins, amount));
// (coins = [2]), (amount = 3);
// console.log(coinChange(coins, amount));

var maxProduct = function (nums) {
  // Intialize dp array
  const pos = new Array(nums.length).fill(1);
  const neg = new Array(nums.length).fill(1);
  let max = -Infinity;
  // Loop through nums array
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] >= 0) {
      pos[i] = nums[i] * pos[i];
      neg[i] = nums[i] * neg[i];
    } else {
      pos[i] = nums[i] * neg[i];
      neg[i] = nums[i] * pos[i];
    }
    max = Math.max(max, pos[i], neg[i]);
  }
  console.table([pos, neg]);
};
nums = [2, 3, -2, 4];
console.log(maxProduct(nums));
