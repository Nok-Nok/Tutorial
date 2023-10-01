// 1804. Implement Trie II (Prefix Tree)

/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
int countWordsEqualTo(String word) Returns the number of instances of the string word in the trie.
int countWordsStartingWith(String prefix) Returns the number of strings in the trie that have the string prefix as a prefix.
void erase(String word) Erases the string word from the trie.
 

Example 1:

Input
["Trie", "insert", "insert", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsStartingWith"]
[[], ["apple"], ["apple"], ["apple"], ["app"], ["apple"], ["apple"], ["app"], ["apple"], ["app"]]
Output
[null, null, null, 2, 2, null, 1, 1, null, 0]

Explanation
Trie trie = new Trie();
trie.insert("apple");               // Inserts "apple".
trie.insert("apple");               // Inserts another "apple".
trie.countWordsEqualTo("apple");    // There are two instances of "apple" so return 2.
trie.countWordsStartingWith("app"); // "app" is a prefix of "apple" so return 2.
trie.erase("apple");                // Erases one "apple".
trie.countWordsEqualTo("apple");    // Now there is only one instance of "apple" so return 1.
trie.countWordsStartingWith("app"); // return 1
trie.erase("apple");                // Erases "apple". Now the trie is empty.
trie.countWordsStartingWith("app"); // return 0
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, countWordsEqualTo, countWordsStartingWith, and erase.
It is guaranteed that for any function call to erase, the string word will exist in the trie.
 */

// Assume we will do delete less then search => be more work intensive for delete
class TrieNode {
  constructor(
    public children = new Map(),
    public start: number = 0,
    public end: number = 0
  ) {}
}
class Trie {
  public root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    // Point to root
    let curNode: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      // If char not in curNode children, add the node
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new TrieNode());
      }
      // Move the node
      curNode = curNode.children.get(char);
      // Increase the count
      curNode.start++;
    }
    // Signify the end
    curNode.end++;
  }

  countWordsEqualTo(word: string): number {
    // Point to root
    let curNode: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      // If char not in curNode children, return 0
      if (!curNode.children.has(char)) return 0;
      // Else move to next char
      curNode = curNode.children.get(char);
    }
    // Return only if curNode end count
    return curNode.end;
  }

  countWordsStartingWith(prefix: string): number {
    // Point to root
    let curNode: TrieNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      // If char not in curNode children, return 0
      if (!curNode.children.has(char)) return 0;
      // Else move to next char
      curNode = curNode.children.get(char);
    }
    // Return only if curNode start count
    return curNode.start;
  }
  // It is guaranteed that for any function call to erase, the string word will exist in the trie.
  // With this condition, we can safely reduce the count
  erase(word: string): void {
    // Point to root
    let curNode: TrieNode = this.root;
    // If there is only 1 word left, reset
    const firstChar = word[0];
    if (curNode.children.get(firstChar).count === 1) {
      curNode.children.delete(firstChar);
      return;
    }
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      // Move the node
      curNode = curNode.children.get(char);
      // Decrease the count
      curNode.start--;
    }
    curNode.end--;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.countWordsEqualTo(word)
 * var param_3 = obj.countWordsStartingWith(prefix)
 * obj.erase(word)
 */

const trie = new Trie();
trie.insert('apple'); // Inserts "apple".
trie.insert('apple'); // Inserts another "apple".
console.log(trie.countWordsEqualTo('apple'));
console.log(trie.countWordsStartingWith('app')); // "app" is a prefix of "apple" so return 2.
trie.erase('apple'); // Erases one "apple".
console.log(trie.countWordsEqualTo('apple')); // Now there is only one instance of "apple" so return 1.
console.log(trie.countWordsStartingWith('app')); // return 1
trie.erase('apple');
console.log(trie.countWordsStartingWith('app')); // return 0)
console.log(trie);
