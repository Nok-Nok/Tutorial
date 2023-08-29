// 242. Valid Anagram

/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
 */

// Time Complexity: O(n) + O(26)
// Space Complexity: O(26) - > O(1)
function isAnagram(s: string, t: string): boolean {
  // Edge case: if not matching length, return false
  if (s.length !== t.length) return false;
  // Initialize cached for frequency of each letter
  const letterFreq: Record<string, number> = {};

  // Loop through the string: add 1 if found in S and subtract 1 if found in T
  for (let i: number = 0; i < s.length; i++) {
    const charS: string = s[i];
    const charT: string = t[i];
    letterFreq[charS] = (letterFreq[charS] ?? 0) + 1;
    letterFreq[charT] = (letterFreq[charT] ?? 0) - 1;
  }

  // Loop through all char in letterFreq, if any is not 0, return false
  for (const letter in letterFreq) {
    if (letterFreq[letter] !== 0) return false;
  }

  return true;
}

// Test Case:
let s = 'anagram';
let t = 'managra';
console.log(isAnagram(s, t));
s = '';
t = '';
console.log(isAnagram(s, t));
s = 'a';
t = 'b';
console.log(isAnagram(s, t));
s = 'aab';
t = 'baa';
console.log(isAnagram(s, t));
