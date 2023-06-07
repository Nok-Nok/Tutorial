// Coin Change II

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
// Time Complexity: O(A*C)
// Space Complexity: O(A)
function change(amount, coins) {
  // Initialize an array to keeps track how many combs can be made to reach a target
  const combs = new Array(amount + 1).fill(0);
  combs[0] = 1; //there can only be 1 combs to reach 0

  // Loop through to find combs for each coin
  for (const coin of coins) {
    // Loop through the combination to update it
    for (let target = coin; target < combs.length; target++) {
      combs[target] += combs[target - coin];
    }
  }
  return combs[amount];
}
// (amount = 5), (coins = [1, 2, 5]);
// console.log(change(amount, coins));
// (amount = 3), (coins = [2]);
// console.log(change(amount, coins));
// (amount = 10), (coins = [10]);
// console.log(change(amount, coins));
