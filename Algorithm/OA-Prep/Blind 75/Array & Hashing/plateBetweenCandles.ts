// 2055. Plates Between Candles

/**
 * There is a long table with a line of plates and candles arranged on top of it. You are given a 0-indexed string s consisting of characters '*' and '|' only, where a '*' represents a plate and a '|' represents a candle.

You are also given a 0-indexed 2D integer array queries where queries[i] = [lefti, righti] denotes the substring s[lefti...righti] (inclusive). For each query, you need to find the number of plates between candles that are in the substring. A plate is considered between candles if there is at least one candle to its left and at least one candle to its right in the substring.

For example, s = "||**||**|*", and a query [3, 8] denotes the substring "*||**|". The number of plates between candles in this substring is 2, as each of the two plates has at least one candle in the substring to its left and right.
Return an integer array answer where answer[i] is the answer to the ith query.

 

Example 1:

ex-1
Input: s = "**|**|***|", queries = [[2,5],[5,9]]
Output: [2,3]
Explanation:
- queries[0] has two plates between candles.
- queries[1] has three plates between candles.
Example 2:

ex-2
Input: s = "***|**|*****|**||**|*", queries = [[1,17],[4,5],[14,17],[5,11],[15,16]]
Output: [9,0,0,0,0]
Explanation:
- queries[0] has nine plates between candles.
- The other queries have zero plates between candles.
 

Constraints:

3 <= s.length <= 105
s consists of '*' and '|' characters.
1 <= queries.length <= 105
queries[i].length == 2
0 <= lefti <= righti < s.length
 */
// Time Complexity: O(3n + number of queries)
// Space Complexity: O(3n)
function platesBetweenCandles(s: string, queries: number[][]): number[] {
  const plates = new Array(s.length).fill(0);
  const leftCandle: number[] = new Array(s.length).fill(0);
  const rightCandle: number[] = new Array(s.length).fill(s.length - 1);
  // Loop to the first candale
  let i = 0;
  while (i < s.length && s[i] !== '|') i++;
  let count = 0;
  // Loop through the string
  for (i; i < s.length; i++) {
    // If meet the plate, update plate count
    if (s[i] === '*') {
      count++;
      plates[i] = plates[i - 1] ?? 0;
      leftCandle[i] = leftCandle[i - 1] ?? 0;
    }
    // If meet candle
    else {
      plates[i] = (plates[i - 1] ?? 0) + count;
      leftCandle[i] = i;
      count = 0;
    }
  }
  for (let i = s.length - 1; i >= 0; i--) {
    // If meet the plate
    if (s[i] === '*') rightCandle[i] = rightCandle[i + 1] ?? s.length - 1;
    else rightCandle[i] = i;
  }
  // console.table([plates, leftCandle, rightCandle]);
  const result: number[] = [];
  for (let [start, end] of queries) {
    // Find the next candle
    const left = rightCandle[start];
    const right = leftCandle[end];
    result.push(Math.max(0, plates[right] - plates[left]));
  }
  return result;
}

// Time Complexity: O(L) for constructing the plate & candles array + O(Q * 2 * (log number of candles ~ L)) => O(L + Q*log(L))
// Space Complexity: O(2L)
// Space Complexity:
function platesBetweenCandles(s: string, queries: number[][]): number[] {
  const plates = new Array(s.length).fill(0);
  const candles: number[] = [];
  // Loop to the first candale
  let i = 0;
  while (i < s.length && s[i] !== '|') i++;
  let count = 0;
  // Loop through the string
  for (i; i < s.length; i++) {
    // If meet the plate, update plate count
    if (s[i] === '*') {
      count++;
      plates[i] = plates[i - 1] ?? 0;
    }
    // If meet candle
    else {
      plates[i] = (plates[i - 1] ?? 0) + count;
      candles.push(i);
      count = 0;
    }
  }
  const result: number[] = [];
  for (let [start, end] of queries) {
    // Search for left most candle
    if (s[start] != '|') {
      // Need to perform a binary search:
      // Find the min value that >= start in a sorted array
      start = findMin(candles, start);
    }
    // Search for right most
    if (s[end] !== '|') {
      // Find the max value that <=start in a sorted array
      end = findMax(candles, end);
    }
    // console.log(start);
    result.push(start < end ? plates[end] - plates[start] : 0);
  }
  return result;
}

function findMin(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] >= target && (arr[m - 1] < target || m == 0)) return arr[m];
    else if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return Infinity;
}

function findMax(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] <= target && (arr[m + 1] > target || m === arr.length - 1))
      return arr[m];
    else if (arr[m] > target) r = m - 1;
    else l = m + 1;
  }
  return -Infinity;
}
const s = '***|**|*****|**||**|*',
  queries = [
    [1, 17],
    [4, 5],
    [14, 17],
    [5, 11],
    [15, 16],
  ];
console.log(platesBetweenCandles(s, queries));
