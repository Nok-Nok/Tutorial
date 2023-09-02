// 269. Alien Dictionary

/**
 * There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary. Now it is claimed that the strings in words are 
sorted lexicographically
 by the rules of this new language.

If this claim is incorrect, and the given arrangement of string in words cannot correspond to any order of letters, return "".

Otherwise, return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there are multiple solutions, return any of them.

 

Example 1:

Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
Example 2:

Input: words = ["z","x"]
Output: "zx"
Example 3:

Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of only lowercase English letters.
 */
// This is a directed graph problem
// Think of union find
// Time Complexity: O(w * c) to construct the adj mat + O(w * c) to update the adj mat + O(w * c) for DFS since each char will be visited at most once
// Space Complexity:O(w * c) to construct the adj mat + O (w * c) for unique characters of the visited set + O(w * c) for DFS since each char will be visited at most once
function alienOrder(words: string[]): string {
  // Construct the adjacency matrix
  const adj: Record<string, Set<string>> = {};
  for (const word of words) {
    for (const c of word) adj[c] = adj[c] ?? new Set();
  }

  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    let j = 0;
    const minLen = Math.min(word1.length, word2.length);
    while (j < minLen - 1 && word1[j] === word2[j]) j++;
    // If we match to minlen but word1 > word2; return ""; else skip
    if (j === minLen - 1 && word1[j] === word2[j]) {
      if (word1.length > word2.length) return '';
      continue;
    }
    adj[word1[j]].add(word2[j]);
  }

  const visisted: Record<string, boolean> = {}; // key: visited char, value: T if being visited during teh path
  const res: string[] = [];
  for (const c in adj) {
    // If find cyclic during dfs, return ''
    if (dfs(c)) return '';
  }
  let str = '';
  for (let i = res.length - 1; i >= 0; i--) str += res[i];
  return str;
  // Perform DFS POST ORDER
  function dfs(c: string) {
    // Base Case:
    // If has been visited before, return whether it is being visiting during this path
    if (c in visisted) return visisted[c];

    // Recursive Case:
    visisted[c] = true;
    // Get the next node:
    for (const nextC of adj[c]) {
      if (dfs(nextC)) return true;
    }

    // After confirming we get to the last char, append this to res
    res.push(c);
    // Back Track:
    return (visisted[c] = false);
  }
}
const words = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
console.log(alienOrder(words));
