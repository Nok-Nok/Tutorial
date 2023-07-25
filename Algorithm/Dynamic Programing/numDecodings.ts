// 91. Decode Ways

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
// Time Complexity: O(n) since we traverse through the string once
// Space Complexity: O(1) since we only use 2 pointers for keep track of the combinations value
function numDecoding(s: string): number {
  // Asume for empty string we will have only 1 combination
  let prev: number = 1;
  let cur: number = 1;

  // At each position, we can form either 1 digit or 2 digits value (1-26)
  // For 1 digit, if we get 0 => automatically assign 0
  // For 2 digit, if we get value <=26 => sum up the two possiblities; else only keep the previous 1 digit posibility
  for (let i = s.length - 1; i >= 0; i--) {
    const digit1: number = Number(s[i]);
    const digit2: number = Number(s[i] + s[i + 1]);
    let next: number;
    if (digit1 === 0) next = 0;
    else next = cur + (digit2 <= 26 ? prev : 0);
    // Move two pointers
    prev = cur;
    cur = next;
  }
  return cur;
}
console.log(numDecoding('22101021'));
