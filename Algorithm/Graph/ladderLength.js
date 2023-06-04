// Word Ladder

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

function ladderLength(beginWord, endWord, wordList) {
  // Create an object to group all word by its pattern, difference by 1 letter
  const neighbors = {};
  let findEndWord = false;
  for (const word of wordList) {
    if (word === endWord) findEndWord = true;
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      neighbors[pattern] = neighbors[pattern] ?? [];
      neighbors[pattern].push(word);
    }
  }
  if (!findEndWord) return 0;
  // BFS the graph
  let queue = [beginWord];
  let pathLength = 1;
  const visited = new Set();
  while (queue.length) {
    const newQueue = [];
    // Loop through the queue, and get the neighbor
    for (const word of queue) {
      // Base case: if in visited, skip
      if (visited.has(word)) continue;
      // Base case: if found the end word, return length
      if (word === endWord) return pathLength;
      // Recursive case:
      // Update visited
      visited.add(word);
      // Add all neighbors to the new queue
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
        for (const neighbor of neighbors[pattern] || []) {
          // if the neighbor has not been visited, add to the queue
          if (!visited.has(neighbor)) newQueue.push(neighbor);
        }
      }
    }
    // Update queue, path length
    pathLength++;
    queue = newQueue;
  }
  return 0;
}
function ladderLength(beginWord, endWord, wordList) {
  // If endWord not in wordlist, return 0
  wordList = new Set(wordList);
  if (!wordList.has(endWord)) return 0;

  // Get all character:
  const charList = new Set();
  for (const word of wordList) {
    for (const char of word) {
      charList.add(char);
    }
  }
  // console.log(charList);

  // start BFS
  let queue = [beginWord];
  let pathLength = 1;
  const visited = new Set();

  while (queue.length) {
    const newQueue = [];
    // Loop through all word in queue
    for (const word of queue) {
      // Base case: if word has been visted, skip
      if (visited.has(word)) continue;
      // Base case: if word match endWord, return pathlength
      if (word === endWord) return pathLength;
      // Recursive case: update the queue
      // Update visited set
      visited.add(word);
      // Loop through each letter
      for (let i = 0; i < word.length; i++) {
        for (const char of charList) {
          // if letter is different, replace and see if we have it in wordList
          if (char !== word[i]) {
            const newWord = word.slice(0, i) + char + word.slice(i + 1);
            if (wordList.has(newWord)) newQueue.push(newWord);
          }
        }
      }
    }
    // Upadte queue and path length
    pathLength++;
    queue = newQueue;
  }
  return 0;
}
// (beginWord = 'hit'),
//   (endWord = 'cog'),
//   (wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
// console.log(ladderLength(beginWord, endWord, wordList));
// beginWord = 'hot';
// endWord = 'dog';
// wordList = ['hot', 'dog'];
// console.log(ladderLength(beginWord, endWord, wordList));
