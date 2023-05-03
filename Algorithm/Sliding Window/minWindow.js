// Minimum Window Substring
/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?
 */

// Time Complexity: O(n+2m) = O(n+m) where n is length of t and m is length of s
// Space Complexity: O(n) where n is length of t
function minWindow1(s, t) {
  // Loop through the t string and get the frequency of each character
  const tChar = {};
  for (let i in t) {
    tChar[t[i]] = (tChar[t[i]] || 0) + 1;
  }

  // Intiialize the left pointer of the sliding window
  let l = 0;
  let minLength = Infinity;
  let result;
  let len = t.length;

  // Loop through the s string:
  for (let r = l; r < s.length; r++) {
    const char = s[r];
    if (char in tChar) {
      // Update the tChar frequency count
      tChar[char]--;
      // Update len if applicable
      if (tChar[char] >= 0) len--;
      // If found all char in the t string
      if (len === 0) {
        // Remove duplicate:
        while (tChar[s[l]] !== 0 && l <= r) {
          if (s[l] in tChar) tChar[s[l]]++;
          l++;
        }
        // If substring length < minLength, update minLength and the result array
        if (r - l + 1 < minLength) {
          minLength = r - l + 1;
          result = [l, r];
        }
        // Move the sliding window:
        tChar[s[l]]++;
        len++;
        l++;
      }
    }
  }
  return result ? s.slice(result[0], result[1] + 1) : '';
}

// Time Complexity: O(n+2m) = O(n+m) where n is length of t and m is length of s
// Space Complexity: O(n) where n is length of t
function minWindow(s, t) {
  // Loop through the t string and get the frequency of each character
  const tChar = {};
  for (let i in t) {
    tChar[t[i]] = (tChar[t[i]] || 0) + 1;
  }

  // Intiialize the left pointer of the sliding window
  let l = 0;
  const need = Object.keys(tChar).length;
  let have = 0;
  let minLength = Infinity;
  let result = [0, -1];

  // Loop through the s string:
  for (let r = l; r < s.length; r++) {
    const char = s[r];

    if (char in tChar) {
      // Update the tChar frequency count
      tChar[char]--;
      // Update have if frequency match
      if (tChar[char] === 0) have++;
      if (have === need) {
        // Remove duplicate
        while (tChar[s[l]] !== 0 && l <= r) {
          if (s[l] in tChar) tChar[s[l]]++;
          l++;
        }
        // If substring length < minLength, update minLength and the result array
        if (r - l + 1 < minLength) {
          minLength = r - l + 1;
          result = [l, r];
        }
        // Move the sliding window:
        tChar[s[l]]++;
        have--;
        l++;
      }
    }
  }
  return s.slice(result[0], result[1] + 1);
}

// (s = 'ADOBECODEBANC'), (t = 'ABC');
// console.log(minWindow(s, t));
// (s = 'a'), (t = 'a');
// console.log(minWindow(s, t));
// (s = 'a'), (t = 'b');
// console.log(minWindow(s, t));
