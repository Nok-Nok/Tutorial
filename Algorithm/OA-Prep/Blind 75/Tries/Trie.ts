// 208. Implement Trie (Prefix Tree)

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
class TrieNode {
  constructor(
    public readonly children: Record<string, TrieNode> = {},
    public end: boolean = false
  ) {}
}
class Trie {
  constructor(public readonly root = new TrieNode()) {}

  insert(word: string): void {
    let cur = this.root;
    // Loop through each letter of the word
    for (const char of word) {
      // Append that letter if not present
      if (!(char in cur.children)) cur.children[char] = new TrieNode();
      // Move to that node
      cur = cur.children[char];
    }
    // End the tree
    cur.end = true;
  }

  search(word: string): boolean {
    let cur = this.root;
    // Loop through each letter of the word
    for (const char of word) {
      // Traverse through the tree
      // If not match: return false
      if (!(char in cur.children)) return false;
      // Move to next node
      cur = cur.children[char];
    }
    //  Return true if we hit the end
    return cur.end;
  }

  startsWith(prefix: string): boolean {
    let cur = this.root;
    // Loop through each letter of the word
    for (const char of prefix) {
      // Traverse through the tree
      // If not match: return false
      if (!(char in cur.children)) return false;
      // Move to next node
      cur = cur.children[char];
    }
    // Return true
    return true;
  }
}
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
console.dir(trie);
console.log(trie.startsWith('appe'));
console.log(trie.search('apple'));
/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
