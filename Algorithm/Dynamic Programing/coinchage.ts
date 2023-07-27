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

// This  is a DP question, can use 2D array, but may change it to 1D array
/**
 * coins = [1,2,5]
 * amount = 6
 * f(6,[1]) = 1 + f(5,[1]) = 2 + f(4,[1]) = .... + 6
 * f(6,[1,2]) = min(f(6,[1]), 1 + f(4,[2,1])) = min (6, 5, 2 + f(2, [2,1])) = min (6, 5, 4, 3+ f(0, [2,1])) = 3
 */
// Time Complexity: O(n)
// Space Complexity: O(n)
function coinChange(coins: number[], amount: number): number {
  // Initialize the dp array
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  // Intial condition:
  dp[0] = 0; //If we have amount of 0, we will need 0 coin

  // Loop through the coin choice
  for (const coin of coins) {
    // Loop through the amount, start from posion of value coin
    for (let target: number = coin; target <= amount; target++) {
      // cur = Min(use only previous coins, use 1 of the current coin)
      dp[target] = Math.min(dp[target], 1 + dp[target - coin]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

const coins = [1, 2, 5],
  amount = 11;
console.log(coinChange(coins, amount));
