// Coin Change

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
// Time Complexity: O(C*A) where C is number of coins and A is the target amount
// Space Complexity: O(A) where A is the target amount, which is the tabulation we used to perform DP
function coinChange(coins, amount) {
  // Initialize an array to keep track mimnim amount coint to reach a certain amount
  const coinCombs = new Array(amount + 1).fill(Infinity);
  coinCombs[0] = 0; //to reach total of 0, we need 0 coin
  // Loop through the array of coins
  for (const coin of coins) {
    // Update the coinCombs array:
    for (let amount = coin; amount < coinCombs.length; amount++) {
      // Get the minimum of coinCombs to reach amount
      coinCombs[amount] = Math.min(
        coinCombs[amount],
        1 + coinCombs[amount - coin]
      );
    }
  }

  return coinCombs[amount] === Infinity ? -1 : coinCombs[amount];
}

// (coins = [1, 2, 5]), (amount = 11);
// console.log(coinChange(coins, amount));
