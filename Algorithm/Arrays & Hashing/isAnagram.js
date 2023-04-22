// Valid Anagram
/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
 */

// Space Complexity: O(1) because frequency cache only have max 26 alphabet characters
// Time Complexity: O(n) where n is the length of the either input string.
function isAnagram1(s, t) {
  // If s & t string not have the same length, return false
  if (s.length != t.length) return false;
  // Initialize frequency cache
  const freq = {};
  // Loop the string s
  for (const i in s) {
    // Increase the frequency of each letters in s
    freq[s[i]] = (freq[s[i]] || 0) + 1;
    // Decrease the frequency of each letters in t
    freq[t[i]] = (freq[t[i]] || 0) - 1;
  }
  // Loop through the frequency cache
  for (const letter in freq) {
    // Return false if any frequency is not zero
    if (freq[letter]) return false;
  }
  // Return true
  return true;
}

// In order to reduce the space complexity, maybe we can think of using an array rather than an object
// Space Complexity: O(1) because frequency cache only have max 26 alphabet characters
// Time Complexity: O(n) where n is the length of the either input string.
function isAnagram(s, t) {
  // If s & t string not have the same length, return false
  if (s.length != t.length) return false;
  // Initialize frequency cache
  const freq = [];
  // Loop the string s
  for (const i in s) {
    // Increase the frequency of each letters in s
    freq[s.charCodeAt(i) - 97] = (freq[s.charCodeAt(i) - 97] || 0) + 1;
    // Decrease the frequency of each letters in t
    freq[t.charCodeAt(i) - 97] = (freq[t.charCodeAt(i) - 97] || 0) - 1;
  }
  // Loop through the frequency cache
  for (const letter in freq) {
    // Return false if any frequency is not zero
    if (freq[letter]) return false;
  }
  // Return true
  return true;
}
(s = 'anagram'), (t = 'nagaram');
console.log(isAnagram(s, t));
(s = 'rat'), (t = 'car');
console.log(isAnagram(s, t));
