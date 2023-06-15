// Partition Labels

/**
 * You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

 

Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {number[]}
 */
// Time Complexity: O(n)
// Space Complexity: O(n)
var partitionLabels = function (s) {
  // Traverse through s: find the mix and max position of each char (Time: O(n), Space: O(1) for 26 chars)
  const charPos = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charPos[char] = charPos[char] ?? [i, i];
    charPos[char][1] = i;
  }
  // Sort all intervals: (Time: O(1), Space: O(1) for fixated amount of chars - 26 chars)
  const intervals = Object.values(charPos).sort(
    ([curS, _], [nextS, __]) => curS - nextS
  );
  let [prevS, prevE] = intervals[0];
  const result = [];
  // Loop through intervals, and update result when no overlap
  // Time: O(1) for 26 chars, Space: O(1) if not count result array for space
  for (let i = 1; i < intervals.length; i++) {
    const [curS, curE] = intervals[i];
    // If not overlap
    if (curS > prevE) {
      result.push(prevE - prevS + 1);
      [prevS, prevE] = [curS, curE];
    }
    // If overlap, expand the intervals if applicable
    else {
      prevE = Math.max(prevE, curE);
    }
  }
  result.push(prevE - prevS + 1);
  return result;
};

// Greedy Approach
// Time Complexity: O(n2)
// Space Complexity: O(1) since we have 26 chars
var partitionLabels = function (s) {
  // Initialize a cache for position
  const lastPos = {};
  const result = []; //store the start position of the partition
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // If the letter has not been found
    if (!(char in lastPos)) {
      // Assume we can partition
      result.push(i);
    }
    // If the letter has been seen
    else {
      // Pop the result array until we get to the partition that contain the char:
      while (result[result.length - 1] > lastPos[char]) result.pop();
    }
    // Update the last seen position of char
    lastPos[char] = i;
  }
  return result.map(
    (_, i) => (result[i] = (result[i + 1] ?? s.length) - result[i])
  );
};

// Time Complexity: O(n)
// Space Complexity: O(1)
var partitionLabels = function (s) {
  // Initialize a cache for position
  const lastPos = {};
  for (let i = 0; i < s.length; i++) lastPos[s[i]] = i;

  // Initialize the sliding window and result array
  let l = 0;
  let r = lastPos[s[0]];
  const result = [];
  for (let i = 0; i < s.length; i++) {
    // If i has passed r or at the end: update result, and get a new window
    if (i > r) {
      result.push(r - l + 1);
      l = i;
    }
    // Expand the sliding windown if char is found further
    r = Math.max(r, lastPos[s[i]]);

    // Push the last window in
    if (r === s.length - 1) {
      result.push(r - l + 1);
      return result;
    }
  }
};

s = 'ababcbacadefegdehijhklij';
console.log(partitionLabels(s));
s = 'eccbbbbdec';
console.log(partitionLabels(s));
