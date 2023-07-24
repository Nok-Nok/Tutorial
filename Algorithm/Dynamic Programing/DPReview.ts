// 70. Climbing Stairs

/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
 */
// f(5) = f(4) + f(3)
// f(4) = f(3) + f(2)
// f(3) = f(2) + f(1)
// f(2) = 2;
// f(1) = 1;
function climbStairs(n: number): number {
  // Edge case:
  if (n <= 2) return n;
  let prev: number = 1; // f(1)
  let cur: number = 2; // f(2)
  for (let i = 3; i <= n; i++) {
    const next: number = prev + cur;
    // Move the two pointer
    prev = cur;
    cur = next;
  }
  return cur;
}
// const n = 45;
// console.log(climbStairs(n));

// 746. Min Cost Climbing Stairs

/**
 * You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

 

Example 1:

Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
Example 2:

Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
 

Constraints:

2 <= cost.length <= 1000
0 <= cost[i] <= 999
 */
// f(5) = Min(f(4),f(3))+ cur val
// f(4) = Min(f(3),f(2))+ cur val
// f(3) = Min(f(2),f(1))+ cur val
// f(2) = Min(f(1),f(0))+ cur val
// f(1) = Min(f(0),0)+ cur val
// f(0) = Min(0,0)+ cur val
// Time Complexity: O(n)
// Space Complexity: O(1)
function minCostClimbingStairs(cost: number[]): number {
  let prev: number = 0;
  let cur: number = 0;
  for (const val of cost) {
    const next: number = Math.min(prev, cur) + val;
    // Update prev and cur
    prev = cur;
    cur = next;
  }
  return Math.min(prev, cur);
}
// const cost = [1, 100];
// console.log(minCostClimbingStairs(cost));

// 198. House Robber
/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400
 */
// Cur = Max(rob, skip)
// f(5) = Max(cur+f(3), f(4))
// f(4) = Max(cur+f(2), f(3))
// f(3) = Max(cur+f(1), f(2))
// f(2) = Max(cur+f(0), f(1))
// f(1) = Max(cur+0, f(0))
// f(0) = Max(cur+0, 0)
function rob1(nums: number[]): number {
  let prev: number = 0;
  let cur: number = 0;
  for (const num of nums) {
    const next = Math.max(num + prev, cur);
    // Update pointer:
    prev = cur;
    cur = next;
  }
  return cur;
}
// const nums = [2,7,9,3,1]
// console.log(rob1(nums))

// 213. House Robber II

/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
 */
// Time Complexity: O(n)
// Space Complexity: O(1)
function rob(nums: number[]): number {
  // Edge case: nums only have lenght 1
  if (nums.length === 1) return nums[0];
  return Math.max(dfs(0, nums.length - 1), dfs(1, nums.length));
  // Helper function for determine the rob
  function dfs(start: number, end: number): number {
    let prev = 0;
    let cur = 0;
    for (let i = start; i < end; i++) {
      const next = Math.max(prev + nums[i], cur);
      // Update 2 pointers
      prev = cur;
      cur = next;
    }
    return cur;
  }
}
// let nums = [2, 3, 2];
// console.log(rob(nums));
// nums = [1, 2, 3, 1];
// console.log(rob(nums));
// nums = [1, 2, 3];
// console.log(rob(nums));

// 5. Longest Palindromic Substring

/**
 * Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
 */
// Use expand around center
function longestPalindrome(s: string): string {
  // Initialize array to contain l & r for maxLength
  let result: [number, number] = [0, 0];
  // Loop through string
  for (let i = 0; i < s.length; i++) {
    // Find the length of longest palindrome that can be made from current position
    const [l1, r1] = palindromeLength(i, i);
    if (r1 - l1 > result[1] - result[0]) result = [l1, r1];
    const [l2, r2] = palindromeLength(i, i + 1);
    if (r2 - l2 > result[1] - result[0]) result = [l2, r2];
  }
  // Return substring w/ maxlength
  return s.slice(result[0], result[1] + 1);
  // Helper function for palindrome length
  function palindromeLength(l: number, r: number): [number, number] {
    // while left & right are still in the string and they are matching
    // move left & right
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    // Return the previous left & right position
    return [l + 1, r - 1];
  }
}
let s = 'ababad';
console.log(longestPalindrome(s));
s = 'cbbd';
console.log(longestPalindrome(s));

// 322. Coin Change

/**
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
 

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
 */
// This may need some tabulation
// coins = [5,2,1]
// f(0,[1]) = f(0,[5]) = f(0,[2]) = 0
// f(11, [1]) = f(10,[1])+1 = (f(9,[1])+ 1) + 1 = .... = f(0,[1]) + 11 = 11
// f(11, [1,5]) = Math.min(f(11,[1]),f(11,[5]) = Math.min(11, f(6,[5,1])+1) = Math.min(11, 7, f(6,[5])+1) = Math.min(11,7,f(1,[5,1])+2) = Math.min(11,7,3,f(1,[5])) = Math.min(11,7,3,Inf) = 3
// Perform Bottom Up 1D Dp
// Time Complexity: O(n)
// Space Complexity: O(n)
function coinChange(coins: number[], amount: number): number {
  // Initialize the 1D Dp array
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  // Initalize the condition: if we need to reach amount of 0, we will need 0 coin
  dp[0] = 0;
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// const coins = [2, 5, 10, 1];
// const amount = 27;
// console.log(coinChange(coins, amount));
