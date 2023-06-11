// Decode Ways

/**
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
Example 3:

Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
 

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
 */

// Thinking using 1D DP - Bottom Up approach
// Time Complexity: O(n) where n in length of s
// Space Complexity: O(1)
function numDecodings(s) {
  let count1 = 1;
  let count2 = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    const temp = count1;
    const num = Number(s[i] + s[i + 1]);
    // Update count1
    if (s[i] === '0') count1 = 0;
    else if (num <= 26) count1 = count1 + count2;
    // Move count2:
    count2 = temp;
  }
  return count1;
}
console.log(numDecodings('21201234'));
