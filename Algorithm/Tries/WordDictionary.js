// Design Add and Search Words Data Structure

/**
 * Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 104 calls will be made to addWord and search.
 */

function TrieNode() {
  this.children = {};
  this.end = false;
}

function WordDictionary() {
  this.root = new TrieNode();
}

WordDictionary.prototype.addWord = function (word) {
  // Access the dictionary
  let cur = this.root;
  // Loop through all letter of the word
  for (const letter of word) {
    // Add the letter if does not exist
    if (!(letter in cur.children)) cur.children[letter] = new TrieNode();
    // Get to the append next letter/move cur pointer
    cur = cur.children[letter];
  }
  cur.end = true;
};

WordDictionary.prototype.search = function (word) {
  return dfs(word, 0, this.root);

  function dfs(word, i, cur) {
    // Base case: i exceed word length, return if end is true
    if (i >= word.length) return cur.end;
    // Obtain the letter
    const letter = word[i];
    // Base Case: if letter is not a . and not matching, return false
    if (letter !== '.' && !(letter in cur.children)) return false;

    // Recursive case:
    // If letter is '.', search all letters, return true if 1 of them is true
    if (letter === '.')
      return Object.keys(cur.children).some((letter) => {
        return dfs(word, i + 1, cur.children[letter]);
      });
    // Else, move to the next charact
    return dfs(word, i + 1, cur.children[letter]);
  }
};

// const wordDictionary = new WordDictionary();
// wordDictionary.addWord('bad');
// wordDictionary.addWord('batman');
// console.dir(wordDictionary, { depth: null });
// console.log(wordDictionary.search('ba....'));
