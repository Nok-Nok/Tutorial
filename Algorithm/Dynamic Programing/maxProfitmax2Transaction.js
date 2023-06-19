// Best Time to Buy and Sell Stock III

/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 105
 */

// Top down DP w/ memoization
// Have a feeling this would time

/**
 * @param {number[]} prices
 * @return {number}
 */
// Time Complexity: O(4 * n) where n is length of prices
// Space Complexity: O(4 * n) where n is length of prices
var maxProfit = function (prices) {
  const cache = {};
  const result = dfs(prices, 0, true, 0);
  console.log(cache);
  return result;

  function dfs(prices, i, buy, count) {
    // Base case: i exceed prices, return 0
    if (i === prices.length) return 0;

    // Base case: count = 2, return 0
    if (count === 2) return 0;

    // Base case: if in cache, return cache
    const key = i + ',' + (buy ? 'buy,' : 'sell,') + (count + 1);
    if (key in cache) return cache[key];

    // Recursive case:
    // Option 1: Buy/Sell
    const transaction = buy
      ? -prices[i] + dfs(prices, i + 1, !buy, count)
      : prices[i] + dfs(prices, i + 1, !buy, count + 1);
    // Option 2: Skip
    const skip = dfs(prices, i + 1, buy, count);

    return (cache[key] = Math.max(transaction, skip));
  }
};

// Try 1D DP:
// Time Complexity: O(4 * n) where n is length of prices
// Space Complexity: O(4 * n) where n is length of prices
var maxProfit = function (prices) {
  // Initialize dp [Buy1(true), Sell1(false), Buy2(true), Sell2(false)]
  const dp = new Array(prices.length + 1)
    .fill(0)
    .map((e) => new Array(4).fill(0));

  for (let i = prices.length - 1; i >= 0; i--) {
    const [nextBuy1, nextSell1, nextBuy2, nextSell2] = dp[i + 1];
    // Option 1: Buy or Skip
    const curBuy1 = Math.max(-prices[i] + nextSell1, nextBuy1);
    const curBuy2 = Math.max(-prices[i] + nextSell2, nextBuy2);
    // Option 2: Sell or Skip
    const curSell1 = Math.max(prices[i] + nextBuy2, nextSell1);
    const curSell2 = Math.max(prices[i], nextSell2);
    dp[i] = [curBuy1, curSell1, curBuy2, curSell2];
  }
  return dp[0][0];
};

// Optimize for constant space:
// Time Complexity: O(n) where n is length of prices
// Space Complexity: O(1)
var maxProfit = function (prices) {
  // Initialize dp [Buy1(true), Sell1(false), Buy2(true), Sell2(false)]
  let curBuy1 = 0;
  let curBuy2 = 0;
  let curSell1 = 0;
  let curSell2 = 0;
  for (let i = prices.length - 1; i >= 0; i--) {
    // Option 1: Buy or Skip
    const prevBuy1 = Math.max(-prices[i] + curSell1, curBuy1);
    const prevBuy2 = Math.max(-prices[i] + curSell2, curBuy2);

    // Option 2: Sell or Skip
    const prevSell1 = Math.max(prices[i] + curBuy2, curSell1);
    const prevSell2 = Math.max(prices[i], curSell2);
    // Assign:
    curBuy1 = prevBuy1;
    curBuy2 = prevBuy2;
    curSell1 = prevSell1;
    curSell2 = prevSell2;
  }
  return curBuy1;
};
prices = [3, 3, 5, 0, 0, 3, 5, 4];
console.log(maxProfit(prices));
prices = [1, 2, 3, 4, 5];
console.log(maxProfit(prices));
prices = [7, 6, 4, 3, 1];
console.log(maxProfit(prices));
