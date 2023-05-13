/* 

Write a function to find the largest number in an arbitrarily nested array. 
The function should return the largest number contained anywhere in the array, 
regardless of how deeply nested it is.
Assume all elements in each array are numbers.

Ex:

const arrFlat = [1, 3, 10, 6];
nestedArrMax(arrFlat);
-> 10

const arrNested = [1, [3, [10], 6]];
nestedArrMax(arrNested);
-> 10

*/

const nestedArrMax = (arr) => {
  let max = -Infinity;
  flatten(arr);
  return max === -Infinity ? undefined : max;
  function flatten(arr) {
    for (const e of arr) {
      if (Array.isArray(e)) {
        flatten(e);
      } else max = Math.max(max, e);
    }
  }
};

/*
  
  Extension:
  Write a function to find the largest number in a nested array, up to and including a given level. 
  Return the largest number without going deeper in the nested array than the specified level.
  Assume all elements in each array are numbers.
  
  The original array is considered to be at depth 1, any inner array is depth 2, etc.
  
  Ex:
  
  const arrNested = [1, [3, [10], 6]];
  nestedArrMaxLevel(arrNested, 1);
  -> 1
  
  nestedArrMaxLevel(arrNested, 2);
  -> 6
  
  nestedArrMaxLevel(arrNested, 3);
  -> 10
  
  */

const nestedArrMaxLevel = (arr, level) => {
  let max = -Infinity;
  flatten(arr, level);
  return max === -Infinity ? undefined : max;
  function flatten(arr, level) {
    // Base case: if level = 0, return;
    if (level === 0) return;
    // Recursive case
    for (const e of arr) {
      if (Array.isArray(e)) {
        flatten(e, level - 1);
      } else max = Math.max(max, e);
    }
  }
};

