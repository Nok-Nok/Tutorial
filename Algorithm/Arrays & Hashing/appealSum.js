// Total Appeal of A String

/**
 * The appeal of a string is the number of distinct characters found in the string.

For example, the appeal of "abbca" is 3 because it has 3 distinct characters: 'a', 'b', and 'c'.
Given a string s, return the total appeal of all of its substrings.

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: s = "abbca"
Output: 28
Explanation: The following are the substrings of "abbca":
- Substrings of length 1: "a", "b", "b", "c", "a" have an appeal of 1, 1, 1, 1, and 1 respectively. The sum is 5.
- Substrings of length 2: "ab", "bb", "bc", "ca" have an appeal of 2, 1, 2, and 2 respectively. The sum is 7.
- Substrings of length 3: "abb", "bbc", "bca" have an appeal of 2, 2, and 3 respectively. The sum is 7.
- Substrings of length 4: "abbc", "bbca" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 5: "abbca" has an appeal of 3. The sum is 3.
The total sum is 5 + 7 + 7 + 6 + 3 = 28.
Example 2:

Input: s = "code"
Output: 20
Explanation: The following are the substrings of "code":
- Substrings of length 1: "c", "o", "d", "e" have an appeal of 1, 1, 1, and 1 respectively. The sum is 4.
- Substrings of length 2: "co", "od", "de" have an appeal of 2, 2, and 2 respectively. The sum is 6.
- Substrings of length 3: "cod", "ode" have an appeal of 3 and 3 respectively. The sum is 6.
- Substrings of length 4: "code" has an appeal of 4. The sum is 4.
The total sum is 4 + 6 + 6 + 4 = 20.
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
 */

// Time Complexity: O(n2)
// Space Complexity: O(1)
var appealSum = function (s) {
  let tot = 0;
  let curSum = 0;
  // Loop left pointer back ward
  for (let left = s.length - 1; left >= 0; left--) {
    // Update curSum by 1 since if left=right, we have 1 string with length 1
    curSum++;
    // Loop from right pointer from left to end
    for (let right = left + 1; right < s.length; right++) {
      // If found duplicate, no need to update the remaining unique
      if (s[right] === s[left]) break;
      // If not duplicate, the sum of all uniqueness length increase by 1
      else curSum++;
    }
    tot += curSum;
  }
  return tot;
};

var appealSum = function (s) {
  let tot = 0;
  let curSum = 0;
  const lastSeen = {};
  // Loop left pointer back ward
  for (let left = s.length - 1; left >= 0; left--) {
    const char = s[left];
    // If have seen the character before, only add up to the lastSeen
    curSum += (lastSeen[char] ?? s.length) - left;
    // Update last seen position and total
    lastSeen[char] = left;
    tot += curSum;
  }
  return tot;
};

s = 'abbca';
console.log(appealSum(s));
s = 'code';
console.log(appealSum(s));
