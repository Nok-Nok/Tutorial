// 49. Group Anagrams

/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]
 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
 */
// Time Complexity: O (n * KlogK) where n is number of string, and K is the average length of the strings. KlogK since we perform a sorting
// Space Complexity: O(n*K) where n is number of string, and K is the average length of the strings
function groupAnagrams(strs: string[]): string[][] {
  // Initialize a cache with key is the frequency, and value is an array of the word
  const cache: Record<string, string[]> = {};

  // Loop throuhg the strs
  for (const str of strs) {
    // Obtain the str after all character is sorted
    const key = str.split('').sort().join('');
    cache[key] = cache[key] ?? [];
    cache[key].push(str);
  }

  // Return all values of cache that has been organized by the char frequency
  return Object.values(cache);
}

// Time Complexity: O (n * K) where n is number of string, and K is the average length of the strings.
// Space Complexity: O(n*K) where n is number of string, and K is the average length of the strings
function groupAnagrams(strs: string[]): string[][] {
  // Initialize a cache with key is the frequency, and value is an array of the word
  const cache: Record<string, string[]> = {};

  // Loop throuhg the strs
  const freq = new Array(26);
  for (const str of strs) {
    // Reset frequency
    freq.fill(0);
    // Obtain frequency of letter in the string
    for (let i = 0; i < str.length; i++) {
      const letter = str.charCodeAt(i) - 97;
      freq[letter]++;
    }
    const key = freq.join('#');
    cache[key] = cache[key] ?? [];
    cache[key].push(str);
  }

  // Return all values of cache that has been organized by the char frequency
  return Object.values(cache);
}

const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log(groupAnagrams(strs));
