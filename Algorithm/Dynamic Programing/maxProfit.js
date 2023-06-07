// Best Time to Buy and Sell Stock with Cooldown

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

// 2D-DP:
// Time Complexity: O(n)
// Space Complexity: O(1)
function maxProfit(prices) {
  let skipB = 0;
  let buy = -Infinity; //This is to prevent us from sell initially since nothing has been bought
  let skipS = -Infinity; //This is to prevent us from sell initially since nothing has been bought
  let sell = 0;
  for (const price of prices) {
    // Only skip buy if we sell or skip previous buy
    let newSkipB = Math.max(sell, skipB);
    // Only buy if we have skip buy (go through cool down)
    let newBuy = skipB - price;
    // Only skip sell if we buy or skip previous sell
    let newSkipS = Math.max(buy, skipS);
    // Only sell if we buy or skip previous sell
    let newSell = newSkipS + price;
    // Update
    buy = newBuy;
    sell = newSell;
    skipB = newSkipB;
    skipS = newSkipS;
  }
  // Find the max of the last sell
  return Math.max(sell, skipB);
}

// TopDown with memoization:
// Time Complexity: O(n)
// Space Complexity: O(2n) where n is length of prices array, and 2 since at each position, we have either buy/sell and skip

function maxProfit(prices) {
  const dp = {}; // key: i+buy/sell, val: max tot we can reach if we have i->end of prices
  return dfs(prices, 0, true, 0);
  function dfs(prices, i, buyable) {
    // If i exceed prices, return 0
    if (i >= prices.length) return 0;
    // Memoization
    const key = i + ',' + buyable;
    if (key in dp) return dp[key];
    // Recursive
    const cooldown = dfs(prices, i + 1, buyable);
    if (buyable) {
      // If buyable: we either buy or cooldown
      const buy = dfs(prices, i + 1, false) - prices[i];
      dp[key] = Math.max(buy, cooldown);
    } else {
      // If not buyable: we either sell+cooldown or cooldown
      const sell = dfs(prices, i + 2, true) + prices[i];
      dp[key] = Math.max(sell, cooldown);
    }
    return dp[key];
  }
}
// prices = [1, 2, 3, 0, 2];
// console.log(maxProfit(prices));
// prices = [1, 2, 4];
// console.log(maxProfit(prices));
prices = [2, 1, 4];
console.log(maxProfit(prices));
