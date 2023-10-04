// 706. Design HashMap

/**
 * Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 

Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
 

Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.
 */
// Option 1: Use array?

class MyHashMap1 {
  private hash: (number | undefined)[];
  constructor() {
    this.hash = [];
  }
  // Time complexity: O(1)
  // Space Complexity: O(max key value)
  put(key: number, value: number): void {
    this.hash[key] = value;
  }

  // Time Complexity: O(1)
  get(key: number): number {
    return this.hash[key] ?? -1;
  }

  // Time Complexity: O(1)
  remove(key: number): void {
    this.hash[key] = undefined;
  }
}

// Option 2: Use array with linked list to optimize the delete function
class LinkedList {
  constructor(
    public val: [number, number] = [0, 0], // key, value
    public next: null | LinkedList = null
  ) {}
}
class MyHashMap {
  public hash: LinkedList[];
  public static MOD: number = 2069; // Use a prime number
  constructor() {
    this.hash = new Array(MyHashMap.MOD).fill(0).map((e) => new LinkedList());
  }

  put(key: number, value: number): void {
    const hashKey = key % MyHashMap.MOD;
    let prev = this.hash[hashKey];
    // Traverse the linkedList:
    while (prev.next) {
      // if found duplicate key, update the value
      if (prev.next.val[0] === key) {
        prev.next.val[1] = value;
        return;
      }
      // Update pointer:
      prev = prev.next;
    }

    // If reach the end and does not find duplicate key, append the value
    prev.next = new LinkedList([key, value]);
  }

  get(key: number): number {
    const hashKey = key % MyHashMap.MOD;
    let cur = this.hash[hashKey].next;
    while (cur) {
      if (cur.val[0] === key) return cur.val[1];
    }
    // Else return -1
    return -1;
  }

  remove(key: number): void {
    const hashKey = key % MyHashMap.MOD;
    // this.dummy.next = this.hash[hashKey];
    let prev = this.hash[hashKey];
    let cur = prev.next;
    // Traverse the linkedList:
    while (cur) {
      // If found matching key, delete the pair
      if (cur.val[0] === key) {
        prev.next = cur.next;
        return;
      }
      // Update pointer:
      prev = cur;
      cur = cur.next;
    }
  }
}

class MyHashMap3 {
  public static MOD = 2069;
  constructor(
    public hash: [number, number][][] = new Array(MyHashMap.MOD)
      .fill(0)
      .map((e) => [])
  ) {}

  put(key: number, value: number): void {
    const hashKey = key % MyHashMap.MOD;
    const bucket = this.hash[hashKey];
    for (let i = 0; i < bucket.length; i++) {
      // if found duplicate key, update the value
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    // If no duplicate key, add the key value pair
    this.hash[hashKey].push([key, value]);
  }

  get(key: number): number {
    const hashKey = key % MyHashMap.MOD;
    const bucket = this.hash[hashKey];
    for (let i = 0; i < bucket.length; i++) {
      // if found duplicate key, update the value
      if (bucket[i][0] === key) return bucket[i][1];
    }
    return -1;
  }

  remove(key: number): void {
    const hashKey = key % MyHashMap.MOD;
    const bucket = this.hash[hashKey];
    for (let i = 0; i < bucket.length; i++) {
      // if found key, remove
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return;
      }
    }
  }
}

const hash = new MyHashMap();
hash.put(1, 1);
hash.put(2, 2);
console.log(hash.get(1));
console.log(hash.get(3));
hash.put(2, 1);
console.log(hash.get(2));
hash.remove(2);
console.log(hash.get(2));
hash.put(2, 2);
hash.put(MyHashMap.MOD + 2, 2);
hash.put(2 * MyHashMap.MOD + 2, 4);
hash.put(3 * MyHashMap.MOD + 2, 4);
hash.put(1 * MyHashMap.MOD + 2, 8);
// hash.remove(2071);
console.log(hash.hash);

hash.remove(1);
