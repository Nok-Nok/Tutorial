// Best Time to Buy and Sell Stock with Transaction Fee

/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
Example 2:

Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
 

Constraints:

1 <= prices.length <= 5 * 104
1 <= prices[i] < 5 * 104
0 <= fee < 5 * 104
 */

// Let do DP Topdown Memoization
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// Time Complexity: O(2 * n) where n is length of prices
// Space Complexity: O(2 * n) where n is length of prices
var maxProfit = function (prices, fee) {
  const cache = {}; //[i in prices, buy/sell] : maxProfit
  const result = dfs(prices, 0, true);
  console.log(cache);
  return result;
  function dfs(prices, i, buy) {
    // Base case: i exceed prices, return 0
    if (i === prices.length) return 0;
    // Base case: in cache, return cached
    const key = i + ',' + buy;
    if (key in cache) return cache[key];

    // Recursive case:
    // Option 1: buy/sell w/ fee
    const transaction =
      (buy ? -prices[i] : prices[i] - fee) + dfs(prices, i + 1, !buy);
    // Option 2: skip
    const skip = dfs(prices, i + 1, buy);

    return (cache[key] = Math.max(skip, transaction));
  }
};
// Try 1D DP approach
// Time Complexity: O(2 * n) where n is length of prices
// Space Complexity: O(2 * n) where n is length of prices
var maxProfit = function (prices, fee) {
  // Intialze dp [True (Buy), False (sell)]
  const dp = new Array(prices.length + 1)
    .fill(0)
    .map((e) => new Array(2).fill(0));
  // Loop from end to begginning
  for (let i = prices.length - 1; i >= 0; i--) {
    // Option 1: max(buy or skip)
    dp[i][0] = Math.max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
    // Option 2: max(sell w/ fee or skip)
    dp[i][1] = Math.max(prices[i] - fee + dp[i + 1][0], dp[i + 1][1]);
  }
  // Return the starting position that we only have buy option
  return dp[0][0];
};

// Optimize uisng constant space
// Time Complexity: O(n) where n is length of prices
// Space Complexity: O(1)
var maxProfit = function (prices, fee) {
  // Intialze for maxProfit of sell and buy
  let curBuyMax = 0;
  let curSellMax = 0;
  // Loop from end to begginning
  for (let i = prices.length - 1; i >= 0; i--) {
    // Option 1: max(buy or skip)
    const prevBuyMax = Math.max(-prices[i] + curSellMax, curBuyMax);
    // Option 2: max(sell w/ fee or skip)
    const prevSellMax = Math.max(prices[i] - fee + curBuyMax, curSellMax);

    // Reassign
    curBuyMax = prevBuyMax;
    curSellMax = prevSellMax;
  }
  // Return the starting position that we only have buy option
  return curBuyMax;
};
(prices = [1, 3, 2, 8, 4, 9]), (fee = 2);
console.log(maxProfit(prices, fee));
(prices = [1, 3, 7, 5, 10, 3]), (fee = 3);
console.log(maxProfit(prices, fee));
