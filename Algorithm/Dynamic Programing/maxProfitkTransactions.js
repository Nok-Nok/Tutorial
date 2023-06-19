// Best Time to Buy and Sell Stock IV

/**
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
 

Constraints:

1 <= k <= 100
1 <= prices.length <= 1000
0 <= prices[i] <= 1000
 */

// DP with memoization
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const cache = {};
  const result = dfs(prices, 0, true, 0);
  return result;
  function dfs(prices, i, buy, count) {
    // Base case, i exceed prices
    if (i === prices.length) return 0;
    // Base case count = k
    if (count === k) return 0;
    // Base case if in cache, return cache
    const key = i + ',' + buy + ',' + count;
    if (key in cache) return cache[key];

    // Recursive case:
    // Buy or sell
    const transaction = buy
      ? -prices[i] + dfs(prices, i + 1, !buy, count)
      : prices[i] + dfs(prices, i + 1, !buy, count + 1);
    // Skip
    const skip = dfs(prices, i + 1, buy, count);
    return (cache[key] = Math.max(transaction, skip));
  }
};

// 1D DP:
// Time Complexity: O(p*k) where p is length of prices array
// Space Complexity: O(k)
var maxProfit = function (k, prices) {
  // Intialize array of sell and buy
  const buy = new Array(k + 1).fill(0);
  const sell = new Array(k + 1).fill(0);

  // Traverse through prices array
  for (let i = prices.length - 1; i >= 0; i--) {
    for (let j = k - 1; j >= 0; j--) {
      // Option 1: Buy or Skip
      buy[j] = Math.max(-prices[i] + sell[j], buy[j]);
      // Option 2: Sell-> next transaction or Skip
      sell[j] = Math.max(prices[i] + buy[j + 1], sell[j]);
    }
  }
  return buy[0];
};
(k = 2), (prices = [2, 4, 1]);
console.log(maxProfit(k, prices));
(k = 2), (prices = [3, 2, 6, 5, 0, 3]);
console.log(maxProfit(k, prices));
