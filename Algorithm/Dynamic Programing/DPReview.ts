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
// let s = 'ababad';
// console.log(longestPalindrome(s));
// s = 'cbbd';
// console.log(longestPalindrome(s));

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

// 152. Maximum Product Subarray

/**
 * Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 

Constraints:

1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 */

function maxProduct1(nums: number[]): number {
  // Pointer for positive product
  let pos = 1;
  // Pointer for negative product
  let neg = 1;
  // Intiailize max
  let max = -Infinity;
  // At each position: we can choose to multiply w/ the number or reset the product
  // How to update positive and negtaive product based on our decision?
  for (const curVal of nums) {
    // If cur val = 0 => Reset pos & neg product, and update max to 0 if applicable
    // If cur val >0 => pos = pos * curval, neg = neg * curval
    if (curVal >= 0) {
      pos = Math.max(pos * curVal, curVal);
      neg = neg * curVal;
    }
    // Else if cur val<0, get max pos and min neg
    else {
      const nextPos = Math.max(curVal, neg * curVal);
      neg = Math.min(pos * curVal, curVal);
      pos = nextPos;
    }
    // Max = Math.max(pos, neg, cur val)
    max = Math.max(max, pos);
  }
  return max;
}

// Time Complexity: O(n)
// Space Complexity: O(1)
function maxProduct(nums: number[]): number {
  // Pointer for positive product
  let pos = 1;
  // Pointer for negative product
  let neg = 1;
  // Intiailize max
  let max = -Infinity;
  // At each position: we can choose to multiply w/ the number or reset the product
  // How to update positive and negtaive product based on our decision?
  for (const curVal of nums) {
    // If cur val = 0 => Reset pos & neg product, and update max to 0 if applicable
    // If cur val >0 => pos = pos * curval, neg = neg * curval
    // Else if cur val<0, get max pos and min neg
    // Since if curVal < 0 , the product will switch sign, we would be safe using max and min here
    const nextPos = Math.max(curVal, pos * curVal, neg * curVal);
    const nextNeg = Math.min(curVal, pos * curVal, neg * curVal);
    pos = nextPos;
    neg = nextNeg;
    // Max = Math.max(pos, neg, cur val)
    max = Math.max(max, pos);
  }
  return max;
}
// const nums = [2, -5, -2, -4, 3];
// console.log(maxProduct(nums));

// 139. Word Break

/**
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */

// Time complexity: O(n * m * k) where n is length of string, m is number of word in wordDict and k is average length of word in wordDict
// Space complexity: O(n) where n is length of string since we are using that to construct the dp array
function wordBreak(s: string, wordDict: string[]): boolean {
  // Initialize a dp array
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[s.length] = true; //if we are given an empty string, this will be true

  // Loop from end of string
  for (let i: number = s.length - 1; i >= 0; i--) {
    for (const lookUpWord of wordDict) {
      if (i + lookUpWord.length <= s.length) {
        const word = s.slice(i, i + lookUpWord.length);
        if (word === lookUpWord && dp[i + lookUpWord.length]) {
          dp[i] = true;
          break;
        }
      }
    }
  }
  return dp[0];
}
// const s = 'catsandog',
//   wordDict = ['cats', 'dog', 'sand', 'and', 'cat'];
// console.log(wordBreak(s, wordDict));

// 300. Longest Increasing Subsequence

/**
 * Given an integer array nums, return the length of the longest strictly increasing 
subsequence
.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
 */
// This is a DP using Bottom UP approach but will have an O(n2)
// Time complexity: O(n2)
// Space Complexity: O(n)
function lengthOfLIS(nums: number[]): number {
  // Intialize a dp aray fill w/ 1 since all number can form a min length of 1
  const dp: number[] = new Array(nums.length).fill(1);
  let maxLength = 1;
  // Loop through the nums array
  for (let i = 0; i < nums.length; i++) {
    // Loop from start to current num to find the max subsequence lenght it could make
    for (let j = 0; j < i; j++) {
      // If found a smaller value => we can append current number to the end of that subsquence => get max length
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], 1 + dp[j]);
    }
    // Update maxLength
    maxLength = Math.max(maxLength, dp[i]);
  }
  return maxLength;
}
// const nums = [10, 9, 2, 5, 3, 7, 101, 18];
// console.log(lengthOfLIS(nums));

// 416. Partition Equal Subset Sum

/**
 * Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
 */
// Time Complexity: O(n * t) where n is number of nums and t is the target sum of the subset
// Space Complexity: O(t) where t is the target sum of the subset
function canPartition(nums: number[]): boolean {
  let target: number = nums.reduce((prev, cur) => prev + cur);
  // Edge case: if target is odd, return false
  if (target % 2) return false;
  target = target / 2;
  // Initialize a dp array, assum we cannot make the partition => all false
  let dp: boolean[] = new Array(target + 1).fill(false);
  // Intiailize condition, for target of 0, we will definitly get the partition
  dp[0] = true;
  // Loop throug nums
  for (const num of nums) {
    // Loop through the dp array backward => remove the need of creating 1 more array
    for (let t: number = target; t >= num; t--) {
      // cur = EITHER we can hit the target with using previous nums OR Using the cur num
      dp[t] = dp[t] || dp[t - num];
    }
  }
  return dp[target];
}
// const nums = [1, 5, 11, 5, 4, 2, 1, 5];
// console.log(canPartition(nums));

// 62. Unique Paths

/**
 * There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
 

Constraints:

1 <= m, n <= 100
 */
// Time Complexity: O(m*n)
// Space Complexity: O(n)
function uniquePaths(m: number, n: number): number {
  // Intialize a dp array
  const dp: number[] = new Array(n).fill(0);
  // Intialize condition: at the position [0][0], we have 1 way
  dp[0] = 1;
  // Loop through each row
  for (let i: number = 0; i < m; i++) {
    for (let j: number = 1; j < n; j++) {
      // To reach the current position: we can only move down and right
      // => cur = f(up) + f(left) = prev val + the left val
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}
// const m = 3,
//   n = 7;
// console.log(uniquePaths(m, n));

// 1143. Longest Common Subsequence
/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
 */

// Let do top down DP w/ memoization first (this might have stack over flow) - Took 28 mins
// Time complexity: O(len1*len2)
// Space complexity: O(len1*len2) for caching + O(max(len1, len2)) for recursion stack
function longestCommonSubsequence2(text1: string, text2: string): number {
  const cache = {};
  return dfs(0, 0);
  function dfs(i1: number, i2: number): number {
    // Base case, reach the end of either string, return 0
    if (i1 === text1.length || i2 === text2.length) return 0;
    // Base case: if in cache, return cache
    const pos: string = i1 + ',' + i2;
    if (pos in cache) return cache[pos];
    // Recursive case:
    // Match
    const match = (text1[i1] === text2[i2] ? 1 : 0) + dfs(i1 + 1, i2 + 1);
    // Skip
    const skip1 = dfs(i1 + 1, i2);
    const skip2 = dfs(i1, i2 + 1);
    return (cache[pos] = Math.max(skip1, skip2, match));
  }
}
// DP approach w/ 2D array
// Added 6 mins for optimize to 2D array
// Time Complexity: O(len1*len2)
// Space Complexity: O(len1*len2)
function longestCommonSubsequence3(text1: string, text2: string): number {
  // Intiailize the 2D array
  const dp: number[][] = new Array(text1.length + 1)
    .fill(0)
    .map((e) => new Array(text2.length + 1).fill(0));
  for (let i1: number = text1.length - 1; i1 >= 0; i1--) {
    for (let i2: number = text2.length - 1; i2 >= 0; i2--) {
      // Current position = Max (skip1, skip2 and match if possible)
      dp[i1][i2] = Math.max(
        dp[i1 + 1][i2],
        dp[i1][i2 + 1],
        (text1[i1] === text2[i2] ? 1 : 0) + dp[i1 + 1][i2 + 1]
      );
    }
  }
  console.table(dp);
  return dp[0][0];
}

// Optimize approach for 1D array
// Time Complexity: O(len1 * len2)
// Space Complexity: O(Math.min(len1,len2) )
function longestCommonSubsequence1(text1: string, text2: string): number {
  // Switch to ensure min Space Complexity
  if (text1.length < text2.length)
    return longestCommonSubsequence(text2, text1);

  let prev: number[] = new Array(text2.length + 1).fill(0);
  let cur: number[] = new Array(text2.length + 1).fill(0);
  for (let i1: number = text1.length - 1; i1 >= 0; i1--) {
    for (let i2: number = text2.length - 1; i2 >= 0; i2--) {
      // Current position = (1+Match if possible) || Max(skip1, skip2)
      // The reason why cur[i2+1] is still working because we loop backward, so this positive already got updated
      cur[i2] =
        text1[i1] === text2[i2]
          ? 1 + prev[i2 + 1]
          : Math.max(prev[i2], cur[i2 + 1]);
    }
    // Update dp array
    [cur, prev] = [prev, cur];
  }
  return prev[0];
}

// const text1 = 'abcba',
//   text2 = 'abcbcba';
// console.log(longestCommonSubsequence(text1, text2));

// 1143. Longest Common Subsequence

/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
 */

// Time Complexity: O(len1 * len2)
// Space Complexity: O(Min(len1,len2))
function longestCommonSubsequence(text1: string, text2: string): number {
  // Get the shortest string
  if (text2.length > text1.length)
    return longestCommonSubsequence(text2, text1);
  //This is a dp problem
  // Initalize the dp array with all 0 since we assuming no match at the begining
  let dp: number[] = new Array(text2.length + 1).fill(0);
  let newDp: number[] = new Array(text2.length + 1).fill(0);

  // Loop through string 1
  for (let i1 = text1.length - 1; i1 >= 0; i1--) {
    // Loop through string 2
    for (let i2 = text2.length - 1; i2 >= 0; i2--) {
      // At any position: we would have Max(skip1, skip2, match 1 & 2)
      const skip1 = dp[i2]; //keep current i2, move down 1 row for i1 => use dp array
      const skip2 = newDp[i2 + 1]; //keep current row but move right => use new dp array at i2+1
      const match = text1[i1] === text2[i2] ? 1 + dp[i2 + 1] : 0; //move diagoal => use dp array at i2+1
      newDp[i2] = Math.max(skip1, skip2, match);
    }
    // Update dp with the constructed newDp array. Reuse dp to construct another newDp => save memory space
    [dp, newDp] = [newDp, dp];
  }
  return dp[0];
}
// const text1 = 'abcde',
//   text2 = 'ace';
// console.log(longestCommonSubsequence(text1, text2));

// 309. Best Time to Buy and Sell Stock with Cooldown

/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
Example 2:

Input: prices = [1]
Output: 0
 

Constraints:

1 <= prices.length <= 5000
0 <= prices[i] <= 1000
 */

// Let's try the top down w/ memoization first
// Time Complexity: O(2n) since we will have true or false for buying, and we will loop through the prices array => O(n)
// Space Complexity: O(2n) for the caching + O(n) for recursion stack
function maxProfit1(prices: number[]): number {
  const cache = {};
  return dfs(0, true);
  function dfs(i: number, buying: boolean): number {
    // Base case: if reach the end of the array, return the profit?
    if (i >= prices.length) return 0;
    // Base case: if in cache, return cache
    const pos: string = i + ',' + buying;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // Perform transaction
    let transaction: number;
    if (buying) transaction = -prices[i] + dfs(i + 1, false);
    else transaction = prices[i] + dfs(i + 2, true); //skip 1 day for cooldown
    // Skip
    const skip: number = dfs(i + 1, buying);
    return (cache[pos] = Math.max(skip, transaction));
  }
}

// Time Complexity: O(2n)
// Space Complexity: O(2n)
function maxProfit2(prices: number[]): number {
  //  Construct dp array
  const buy: number[] = new Array(prices.length + 1).fill(0);
  const sell: number[] = new Array(prices.length + 1).fill(0);
  // Intialize condition: if on the last day we choose to sell
  sell[prices.length - 1] = prices[prices.length - 1];
  // Loop through the prices array backward:
  for (let i: number = prices.length - 2; i >= 0; i--) {
    // cur = Max(perform transaction or skip)
    buy[i] = Math.max(-prices[i] + sell[i + 1], buy[i + 1]);
    sell[i] = Math.max(prices[i] + buy[i + 2], sell[i + 1]);
  }
  return buy[0];
}
// Optimize by only keeping only 2 next days
// Time complexity: O(2n)
// Space complexity: O(1)
function maxProfit(prices: number[]): number {
  // Initialize 2 next days [buy,sell]
  let next1: number[] = [0, prices[prices.length - 1]];
  let next2: number[] = [0, 0];
  // Loop through the prices array backward:
  for (let i = prices.length - 2; i >= 0; i--) {
    // cur = Max(perform transaction or skip)
    const buy: number = Math.max(-prices[i] + next1[1], next1[0]);
    const sell: number = Math.max(prices[i] + next2[0], next1[1]);
    // Update 2 pointers:
    next2 = next1;
    next1 = [buy, sell];
  }
  return next1[0];
}
// const prices = [1, 2, 3, 0, 2];
// console.log(maxProfit(prices));

// 518. Coin Change II

/**
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

 

Example 1:

Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
Example 3:

Input: amount = 10, coins = [10]
Output: 1
 

Constraints:

1 <= coins.length <= 300
1 <= coins[i] <= 5000
All the values of coins are unique.
0 <= amount <= 5000
 */

// Try top down DP w/ memoization
// Time Complexity: O([amount/min coin value] * # of coins)
// Time Complexity: O([amount/min coin value] * # of coins) for caching + O([amount/min coin value]) for recursion stack
function change1(amount: number, coins: number[]): number {
  const cache = {};
  return dfs(coins.length - 1, amount);
  function dfs(i: number, remaining: number) {
    // Base case: if  remaining is 0, return 1 => successful make a combination
    if (remaining === 0) return 1;
    // Base case: if remaining<0, return 0 =. unsuccessful
    if (remaining < 0) return 0;
    // Base case: if in cache, return cache value
    const pos: string = i + ',' + remaining;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // Loop through the coin array & sum up the total combinations
    let tot: number = 0;
    for (let cur = 0; cur <= i; cur++) {
      tot += dfs(cur, remaining - coins[cur]);
    }
    return (cache[pos] = tot);
  }
}
// Perform dp array
// Time Complexity: O(amount * # of coins)
// Space Complexity: O(amount)
function change(amount: number, coins: number[]): number {
  // Construct a dp array
  const dp: number[] = new Array(amount + 1).fill(0);
  // For amount of 0, we will always have 1 comb
  dp[0] = 1;

  // Loop through the coin array & sum up the total combinations
  for (const coin of coins) {
    for (let target = coin; target <= amount; target++) {
      // To reach current target = total of combs from previous coin choices + the total combs if we use the current coin value
      dp[target] = dp[target] + dp[target - coin];
    }
  }
  return dp[amount];
}
// const amount = 5,
//   coins = [1, 2, 5];
// console.log(change(amount, coins));

// 494. Target Sum
/**
 * You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

 

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
 */

// Try memoization approach
// Space Complexity: O(2 * total of nums values): since if we add all or subtract all. That would be the max of size of our cache + O(# of nums) for recursion stack
// Time Complexity: O(2 * total of nums values)
function findTargetSumWays1(nums: number[], target: number): number {
  const cache = {};
  return dfs(0, 0);
  function dfs(i: number, total: number) {
    // Base case: if we reach end of the array nums, return 1 if total match target
    if (i === nums.length) return total === target ? 1 : 0;
    // Base case: if in cache, return cache value
    const pos = i + ',' + total;
    if (pos in cache) return cache[pos];

    // Recursive Case;
    // Choose add or minus
    return (cache[pos] =
      dfs(i + 1, total - nums[i]) + dfs(i + 1, total + nums[i]));
  }
}
// Try dp array approach
// Time Complexity: O(n * total of nums val)
// Time Complexity: O(n * total of nums val)
function findTargetSumWays(nums: number[], target: number): number {
  // Construct dp array:
  const tot: number = nums.reduce((prev, cur) => prev + cur);
  // Edge case where target is not within range
  if (target > tot || target < -tot) return 0;
  let dp: number[] = new Array(tot * 2 + 1).fill(0);
  let newDp: number[] = new Array(tot * 2 + 1).fill(0);
  // Initial condition is at value of 0, we will 1 comb if there is no nums
  // Since dp is from [-tot, ...,0, ..., tot] => tot is at mid point
  dp[tot] = 1;

  // Loop through all nums
  for (const num of nums) {
    for (let i = 0; i < newDp.length; i++) {
      // cur = sume of add & subtract
      newDp[i] = (dp[i - num] ?? 0) + (dp[i + num] ?? 0);
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[tot + target];
}
// const nums = [1, 1, 1, 1, 1],
//   target = 3;
// console.log(findTargetSumWays(nums, target));

// 97. Interleaving String
/**
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
substrings
 respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.

 */

// Try with topdown memoization
// Space Complexity: O(len1*len2) for caching + O(len3) for recursion stack
// Time Complexity: O(len1*len2)
function isInterleave1(s1: string, s2: string, s3: string): boolean {
  // Edge case: not match length
  if (s1.length + s2.length !== s3.length) return false;
  const cache = {};
  return dfs(0, 0);
  function dfs(i1: number, i2: number): boolean {
    // If reach end of s3, return true
    if (i1 + i2 === s3.length) return true;
    // If not match, return false
    if (s1[i1] !== s3[i1 + i2] && s2[i2] !== s3[i1 + i2]) return false;
    // If in cache; return cache:
    const pos = i1 + ',' + i2;
    if (pos in cache) return cache[pos];
    // Recursive case:
    // Match 1:
    const match1: boolean = s1[i1] === s3[i1 + i2] ? dfs(i1 + 1, i2) : false;
    // Match 2:
    const match2: boolean = s2[i2] === s3[i1 + i2] ? dfs(i1, i2 + 1) : false;
    return (cache[pos] = match1 || match2);
  }
}
// This is 3D DP with optimization may go down to 2D
// Let's do 2D, 3D is too complicated
// Time Complexity: O(len1*len2)
// Space Complexity: O(len1*len2)
// Total Time: 67 mins - Better than a whole night last time :)
function isInterleave2(s1: string, s2: string, s3: string): boolean {
  const [len1, len2, len3]: number[] = [s1.length, s2.length, s3.length];
  // Edge case: not matching length, return false;
  if (len1 + len2 !== len3) return false;
  // Construct the dp array
  const dp = new Array(len1 + 1)
    .fill(false)
    .map((e) => new Array(len2 + 1).fill(false));

  //  Loop backward str1
  for (let i1: number = len1; i1 >= 0; i1--) {
    for (let i2: number = len2; i2 >= 0; i2--) {
      const match1 = s1[i1] && s1[i1] === s3[i1 + i2] ? dp[i1 + 1][i2] : false;
      const match2 = s2[i2] && s2[i2] === s3[i1 + i2] ? dp[i1][i2 + 1] : false;
      // Cur = match w/ string 1 || match w/ string 2 || reach the end
      dp[i1][i2] = match1 || match2 || i1 + i2 === len3;
    }
  }
  // console.table(dp);
  return dp[0][0];
}
// This can be optimized to 1D array
// Time Complexity: O(len1 * len2)
// Space Complexity: O(min(len1,len2))
function isInterleave(s1: string, s2: string, s3: string): boolean {
  const [len1, len2, len3]: number[] = [s1.length, s2.length, s3.length];
  // Switch to get min len1 vs len 2
  if (len2 > len1) return isInterleave(s2, s1, s3);
  // Edge case: not matching length, return false;
  if (len1 + len2 !== len3) return false;
  // Construct the dp array
  let dp: boolean[] = new Array(len2 + 1).fill(false);
  let newDp: boolean[] = new Array(len2 + 1).fill(false);
  //  Loop backward str1
  for (let i1: number = len1; i1 >= 0; i1--) {
    //  Loop backward str2
    for (let i2: number = len2; i2 >= 0; i2--) {
      const match1: boolean = i1 < len1 && s1[i1] === s3[i1 + i2] && dp[i2];
      const match2: boolean =
        i2 < len2 && s2[i2] === s3[i1 + i2] && newDp[i2 + 1];
      // Cur = match w/ string 1 || match w/ string 2 || reach the end
      newDp[i2] = match1 || match2 || i1 + i2 === len3;
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[0];
}
// const s1 = 'aabcc',
//   s2 = 'dbbca',
//   s3 = 'aadbbcbcac';
// console.log(isInterleave(s1, s2, s3));

// 329. Longest Increasing Path in a Matrix
/**
 * Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 

Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 231 - 1
 */

// Try topdown memoization
// This will also need back tracking to ensure we don't visit the same cell twice
// Space Complextity: O(m*n)
// Time Complexity: O(m*n)
function longestIncreasingPath(matrix: number[][]): number {
  const row: number = matrix.length;
  const col: number = matrix[0].length;
  // Construct the caching
  const cache = new Array(row).fill(0).map((e) => new Array(col).fill(0));
  let max: number = -Infinity;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (!cache[r][c]) dfs(r, c, row, col, -Infinity, matrix);
      max = Math.max(max, cache[r][c]);
    }
  }
  return max;
  function dfs(
    r: number,
    c: number,
    row: number,
    col: number,
    prevVal: number,
    matrix: number[][]
  ): number {
    // Base Case: if out of boundary || value decrease, return 0
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || matrix[r][c] <= prevVal) return 0;
    // Base Case: if in cache, return cache value
    // The reason why we can skip having a visited set is because we will only traverse in an increasing value path, so we won't revisit a value twice
    if (cache[r][c]) return cache[r][c];
    // Recursive case:
    prevVal = matrix[r][c];
    // Update visit
    cache[r][c] = 1; // Mark that this location has been visited?
    const left: number = dfs(r, c - 1, row, col, prevVal, matrix);
    const right: number = dfs(r, c + 1, row, col, prevVal, matrix);
    const up: number = dfs(r - 1, c, row, col, prevVal, matrix);
    const down: number = dfs(r + 1, c, row, col, prevVal, matrix);
    // Back track visit
    return (cache[r][c] += Math.max(left, right, up, down));
  }
}
// const matrix = [
//   [3, 4, 5],
//   [3, 2, 6],
//   [2, 2, 1],
// ];
// console.log(longestIncreasingPath(matrix));

// 312. Burst Balloons

/**
 * You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

 

Example 1:

Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
Example 2:

Input: nums = [1,5]
Output: 10
 

Constraints:

n == nums.length
1 <= n <= 300
0 <= nums[i] <= 100
 */

// This DP problem requires to think backward, We won't think what to pop first but what to pop last
/**
 * nums = 1, [3,1,5,8], 1
 *        0   1 2 3 4   5
 * L = 1, R = 4
 * Loop from L -> R
 * tot = nums[L-1] * nums[i] * nums [R+1] + dp_left + dp_right
 * dp_left = DP[L][i-1] -> if i-1<L, return 0
 * dp_right = DP[i+1][R] -> if R<i+1, return 0
 *
 */
// Time Complexity: O(n3) (Since we have to loop through sub array to get to each position of cache)
// Space Complexity: O(n2) for caching + O(n) for recursion stack
function maxCoins1(nums: number[]): number {
  // Add 1 to nums array
  nums = [1, ...nums, 1];
  const cache: number[][] = new Array(nums.length)
    .fill(0)
    .map((e) => new Array(nums.length).fill(0));
  return dfs(1, nums.length - 2);
  function dfs(L: number, R: number): number {
    // Base case: if R<L, return 0
    if (R < L) return 0;
    // Base case: if in cache, return cache result
    if (cache[L][R]) return cache[L][R];

    // Recursive case:
    // Loop through the sub array
    let maxTot: number = -Infinity;
    for (let i = L; i <= R; i++) {
      const curPop: number = nums[L - 1] * nums[i] * nums[R + 1];
      const subLeft: number = dfs(L, i - 1);
      const subRight: number = dfs(i + 1, R);
      maxTot = Math.max(maxTot, curPop + subLeft + subRight);
    }
    cache[L][R] = maxTot;
    return (cache[L][R] = maxTot);
  }
}

// Try DP array approach
// Time Complexity: O(n3)
// Space Complexity: O(n2)
function maxCoins(nums: number[]): number {
  // Add 1 to nums array
  nums = [1, ...nums, 1];
  const len: number = nums.length;
  // Construct the dp array
  const dp: number[][] = new Array(len)
    .fill(0)
    .map((e) => new Array(len).fill(0));
  // Fill row bottom up, since we need to use dp[i+1][R]
  for (let L: number = len - 2; L > 0; L--) {
    // Fill column left to right, since we need to use dp[L][i-1]
    for (let R = L; R <= len - 2; R++) {
      // Intialize the maxTot
      let maxTot = -Infinity;
      // Loop through the sub array
      for (let i = L; i <= R; i++) {
        const curTot: number =
          nums[L - 1] * nums[i] * nums[R + 1] + dp[L][i - 1] + dp[i + 1][R];

        maxTot = Math.max(maxTot, curTot);
      }
      dp[L][R] = maxTot;
    }
  }
  // Return the last position where we pop all balloons
  return dp[1][nums.length - 2];
}
// const nums = [5, 1];
// console.log(maxCoins(nums));
