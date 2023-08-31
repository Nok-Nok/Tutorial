// 139. Word Break

/**
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */
// Maywant to implement the trie for word searching faster
class TrieNode {
  constructor(
    public readonly children: Record<string, TrieNode> = {},
    public end: boolean = false
  ) {}
}
// Since I want to search the word backward, I would flip the logic of add word
class Trie {
  constructor(public readonly root: TrieNode = new TrieNode()) {}

  addword(word: string): void {
    // Get the root
    let cur = this.root;
    // Loop through the letter
    for (const char of word) {
      // Add char if not present in the child nodes
      if (!(char in cur.children)) cur.children[char] = new TrieNode();
      // Move to next char
      cur = cur.children[char];
    }
    // End the word
    cur.end = true;
  }

  searchWordInString(s: string, i: number): number[] {
    let cur = this.root;
    const result: number[] = [];
    for (let j = i; j < s.length; j++) {
      const char = s[j];
      // If char not in childnode, finish searching
      if (!(char in cur.children)) break;
      // Move to next char
      cur = cur.children[char];
      // If this is the end of a word in trie, update result
      if (cur.end) result.push(j - i + 1);
    }
    return result;
  }
}

function wordBreak(s: string, wordDict: string[]): boolean {
  // Initialize the dp array:
  const dp = new Array(s.length + 1).fill(false);
  // Create the trie
  const trie = new Trie();
  for (const word of wordDict) trie.addword(word);
  // Initialize dp[0] = true to start search from first letter
  dp[0] = true;

  for (let i = 0; i < s.length; i++) {
    // If we can start a word from that position
    if (dp[i]) {
      // Search for the word
      const foundWordLengths = trie.searchWordInString(s, i);

      // Update dp
      for (const length of foundWordLengths) dp[i + length] = true;
    }
  }
  // console.log(dp);
  return dp[s.length];
}

const s = 'catsandog',
  wordDict = ['cats', 'dog', 'sand', 'and', 'cat'];
console.log(wordBreak(s, wordDict));
