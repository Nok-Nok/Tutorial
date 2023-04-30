// Similar String Groups

/**
 * Two strings X and Y are similar if we can swap two letters (in different positions) of X, so that it equals Y. Also two strings X and Y are similar if they are equal.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?

 

Example 1:

Input: strs = ["tars","rats","arts","star"]
Output: 2
Example 2:

Input: strs = ["omv","ovm"]
Output: 1
 

Constraints:

1 <= strs.length <= 300
1 <= strs[i].length <= 300
strs[i] consists of lowercase letters only.
All words in strs have the same length and are anagrams of each other.
 */

// Time complexity: O(n^2*m) where n is number of strings and m is the max length of a string
// Space complexity: O(n^2) where n is number of strings (for the caching similar groups)
function numSimilarGroups(strs) {
  // Initialize an object to store the graph of similar strings
  const similarGroups = {};

  // Construct a graph of similar strings
  for (let i = 0; i < strs.length; i++) {
    // Initialize the array to store all similar strings to str[i]
    similarGroups[strs[i]] = [];
    for (let j = 0; j < strs.length; j++) {
      if (i !== j && isSimilar(strs[i], strs[j]))
        similarGroups[strs[i]].push(strs[j]);
    }
  }

  // Initialize number of groups of string
  let groups = 0;
  // Intialize a set to store visited string
  let visited = new Set();

  // Perform DFS to get all str belong a group
  const dfs = (str) => {
    // Add the str to the visited set
    visited.add(str);
    // Explore the length of the str
    for (let swap of similarGroups[str]) {
      if (!visited.has(swap)) dfs(swap);
    }
  };

  // Loop through each str from the str array
  for (let str of strs) {
    // If the str has not been visited
    if (!visited.has(str)) {
      // Increment number of group
      groups++;
      // DFS to visit all str within the group
      dfs(str);
    }
  }
  return groups;
}

// Two anagrams are similar if the difference char is <=2
function isSimilar(word1, word2) {
  let diff = 0,
    i = 0;
  while (i < word1.length && diff <= 2) {
    if (word1[i] != word2[i]) diff++;
    i++;
  }
  return diff <= 2;
}

strs = ['tars', 'rats', 'arts', 'star'];
numSimilarGroups(strs);
