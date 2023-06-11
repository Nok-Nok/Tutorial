// Snapshot Array

/**
 * Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 

Example 1:

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 

Constraints:

1 <= length <= 5 * 104
0 <= index < length
0 <= val <= 109
0 <= snap_id < (the total number of times we call snap())
At most 5 * 104 calls will be made to set, snap, and get.
 */

/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.array = new Array(length).fill(0).map((e) => [0]);
  this.snap_id = 0;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.array[index][this.snap_id] = val;
};

/**
 * @return {number}
 */
// This is where space complexity get expanded exponetially.
SnapshotArray.prototype.snap = function () {
  // Return the snapshot snap_id and increase it by 1
  return this.snap_id++;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  const snapshots = this.array[index];
  // Will need to Binary Search, but let start with jsut looping backward to confirm it work
  // This pass but let see if we can get BST here
  for (let i = snap_id; i >= 0; i--) {
    if (snapshots[i] !== undefined) return snapshots[i];
  }
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */

const snapshotArr = new SnapshotArray(3);
console.log(snapshotArr);
console.log(snapshotArr.set(0, 5));
console.log(snapshotArr.snap());
console.log(snapshotArr.snap());
console.log(snapshotArr.set(0, 6));
console.log(snapshotArr);
// console.log(snapshotArr);
console.log(snapshotArr.get(0, 1));
