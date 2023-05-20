//  Implement Trie (Prefix Tree)
/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
 */

function TrieNode() {
  this.children = {};
  this.end = false;
}

function Trie() {
  this.root = new TrieNode();
}

Trie.prototype.insert = function (word) {
  let cur = this.root;
  for (let i in word) {
    // If cur char not in tries yet, add it
    if (!(word[i] in cur.children)) cur.children[word[i]] = new TrieNode();
    cur = cur.children[word[i]];
  }
  cur.end = true;
};

Trie.prototype.search = function (word) {
  let cur = this.root;
  for (let i in word) {
    // If letter is unmatched, return false
    if (!(word[i] in cur.children)) return false;
    cur = cur.children[word[i]];
  }
  // return true, if end is found
  return cur.end;
};

Trie.prototype.startsWith = function (word) {
  let cur = this.root;
  for (let i in word) {
    // If letter is unmatched, return false
    if (!(word[i] in cur.children)) return false;
    cur = cur.children[word[i]];
  }
  // return true;
  return true;
};
// const trie = new Trie();
// console.log(trie);
// trie.insert('apple');
// console.log(trie);
// console.log(trie.search('apple'));
// console.log(trie.search('app'));
// trie.insert('app');
// console.log(trie.search('app'));
// console.log(trie.startsWith('app'));
