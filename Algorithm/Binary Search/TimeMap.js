// Time Based Key-Value Store

/**
 * Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

TimeMap() Initializes the object of the data structure.
void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".
 

Example 1:

Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
 

Constraints:

1 <= key.length, value.length <= 100
key and value consist of lowercase English letters and digits.
1 <= timestamp <= 107
All the timestamps timestamp of set are strictly increasing.
At most 2 * 105 calls will be made to set and get.
 */

function TimeMap() {
  // Create a cache object: [key: array([timestamp, value])]
  this.cache = {};
}

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  // If key does not exist in cached, intialize the array
  if (!this.cache[key]) {
    this.cache[key] = [];
  }
  // Add timestamp and value to the array
  this.cache[key].push([timestamp, value]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
// Time Complexity: O(log n) for binary search where n is the maxlength of cache[key]
// Space Complexity: O(n*m) where m is number of keys, and n is the maxlength of cache[key].
TimeMap.prototype.get = function (key, timestamp) {
  // If there is no value stored for the key, return empty string
  if (!this.cache[key]) return '';
  // Intialize left and right pointers for Binary Search
  let left = 0;
  let right = this.cache[key].length - 1;
  // Find the closest time to the timestamp
  let maxTime = -Infinity;

  // While left<=right
  while (left <= right) {
    // Find the mid point
    const mid = Math.floor((left + right) / 2);
    const midTime = this.cache[key][mid][0];
    // If find matching, return
    if (midTime == timestamp) return this.cache[key][mid][1];
    // Move left & right pointer
    // If midTime is still < timeStamp, move the left pointer up. Update maxTime as applicable since we are trying to find the maxTime prior to the given input timeStamp
    if (midTime < timestamp) {
      // Update maxTime as applicable
      maxTime = Math.max(mid, maxTime);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  // Return value
  return maxTime === -Infinity ? '' : this.cache[key][maxTime][1];
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

// const timestamp = new TimeMap();
// console.log(timestamp);
// timestamp.set('love', 'high', 10);
// console.log(timestamp);
// timestamp.set('love', 'low', 20);
// console.log(timestamp);
// // console.log(timestamp.get('love', 5));
// console.log(timestamp.get('love', 12));

// console.log(timestamp);
// timestamp.set('foo', 'bar1', 3);
// console.log(timestamp);
// console.log(timestamp.get('foo', 67));
