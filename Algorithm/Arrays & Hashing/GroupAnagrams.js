//  Group Anagram
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

 */
// Anangram is any word with the same frequency of letter
// Cache with key is the frequency of letters, value is an array of the anagram groups
// Return all of the cache values

// Space Complexity: O(m) where m is the length of the strs array.
//  Time Complexity: O(m*n) where m is the length of the strs array, and n is the length of the longest string.
// Declare a function
function groupAnagrams(strs) {
  // Declare a cache to store anagram groups
  const anagramGroup = {};
  // Loop through the strs array
  for (const str of strs) {
    // Declare a cache to store letter frequency
    const freq = new Array(26).fill(0);
    // Loop through the str
    for (const i in str) {
      // Update the frequency cache
      freq[str.charCodeAt(i) - 97] = freq[str.charCodeAt(i) - 97] + 1;
    }
    // Update the anagram cache
    anagramGroup[freq]
      ? anagramGroup[freq].push(str)
      : (anagramGroup[freq] = [str]);
  }

  // Return the value of anagram cache
  return Object.values(anagramGroup);
}

strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log(groupAnagrams(strs));
