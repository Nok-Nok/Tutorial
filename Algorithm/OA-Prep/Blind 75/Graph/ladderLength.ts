// 127. Word Ladder

/**
 * A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
 */
// w is number of words, c is the average length of word
// Time Complexity: O(w * c^2) to construct the adj mat + O(w * c^2) for bfs since we visit each word max once and would need to loop through char to get the pattern
// Space Complexity: O(w * c^2) to construct the adj mat since we save word for its pattern+ O(w * c) for visited set + O(w*c) for the word queue
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  // Construct the adj graph
  const adj: Record<string, string[]> = {};

  for (const word of wordList) {
    const charArr = word.split('');
    for (let i = 0; i < word.length; i++) {
      const temp = charArr[i];
      charArr[i] = '*';
      const pattern = charArr.join('');
      adj[pattern] = adj[pattern] ?? [];
      adj[pattern].push(word);
      charArr[i] = temp;
    }
  }
  // Find the shortest path => bfs?
  return bfs(new Set([beginWord]), new Set([beginWord]));
  function bfs(words: Set<string>, visited: Set<string>) {
    let path = 1;
    while (words.size) {
      // Initialize the next set of word to be visted
      const newWords: Set<string> = new Set();
      for (const word of words) {
        // Loop through the pattern of the given word
        const charArr = word.split('');
        for (let i = 0; i < word.length; i++) {
          const temp = charArr[i];
          charArr[i] = '*';
          const pattern = charArr.join('');
          // Add the neighbor word if has not been visted
          if (pattern in adj) {
            for (const neighbor of adj[pattern]) {
              if (!visited.has(neighbor)) {
                newWords.add(neighbor);
                visited.add(neighbor);
              }
            }
          }
          charArr[i] = temp;
        }
      }
      words = newWords;
      path++;
      if (words.has(endWord)) return path;
    }
    return 0;
  }
}
const beginWord = 'hit',
  endWord = 'cog',
  wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
console.log(ladderLength(beginWord, endWord, wordList));
