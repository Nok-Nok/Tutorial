/*

Write a function called commonElements that takes in any number of arrays in the 
argument. The arrays may contain both numbers and strings. It should return a new array
with all the common elements (both numbers and/or strings) from the given input. 
If there are no common numbers/strings, return "Nothing in Common!"
Assume there are no duplicates within the array.


ex: 
arr1 = [2, 10,'cat', 3, 99, 2000, 'dog', 'lion'];
arr2 = [3, 7, 2, 2000, 1, 'dog', 'cat'];
arr3 = [2, 100, 2000, 'dog', 3, 'lion'];

commonElements(arr1, arr2, arr3) -> [2, 3, 2000, 'dog']
*/
// Time complexity: O(n^2) where n is total length of all arg arrays
// Space complexity: O(1)
const commonElements = (...args) => {
  const result = args.reduce(
    (prev, cur) => prev.filter((e) => cur.includes(e)),
    args[0]
  );
  return result.length ? result : 'Nothing in Common!';
};

/*
  ** Extension **
  Refactor your function to have O(n) time complexity.
  */

// Time complexity: O(n) where n is total length of all arg arrays
// Space complexity: O(n) where n is the total length of all arg arrays
const commonElementsOptimized = (...args) => {
  // Initialize a Map to store frequency
  const frequency = new Map();
  // Loop through the args to update frequency cache
  for (const arg of args) {
    arg.forEach((e) => frequency.set(e, (frequency.get(e) || 0) + 1));
  }
  // Filter for only key that appear equal to the number of args
  const result = [];
  frequency.forEach((_, key) => {
    if (frequency.get(key) === args.length) result.push(key);
  });
  // Return result
  return result.length ? result : 'Nothing in Common!';
};

const arr1 = [2, 10, 'cat', 3, 99, 2000, 'dog', 'lion'];
const arr2 = [3, 7, 2, 2000, 1, 'dog', 'cat'];
const arr3 = [2, 100, 2000, 'dog', 3, 'lion'];
commonElementsOptimized(arr1, arr2, arr3);
