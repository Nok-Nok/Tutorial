/*

Given an arbitrarily nested array of numbers and a positive integer "depth",
return a new array consisting of the numbers with depth less than or equal to
the provided depth, in order of appearance.

The original array is considered to be at depth 1, and inner arrays are at
greater depth.

For example:

retrieveDepth([2, [4, [7], 1], 5], 1) -> [2, 5] because only the 2 and 5 are at
"depth 1", and everything else is too deep. The 4 and 1 are at "depth 2", and
the 7 is at "depth 3".

retrieveDepth([2, [4, [7], 1], 5], 2) -> [2, 4, 1, 5] becuase the 2 and 5 are at
"depth 1", the 4 and 1 are at "depth 2", and the 7 is too deep because it's at
"depth 3".

retrieveDepth([2, [4, [7], 1], 5], 3) -> [2, 4, 7, 1, 5] because every number
is within "depth 3". No number is deeper.

*/

const retrieveDepth = (arr, depth, result = []) => {
  // Base case: if depth is zero, return result array
  if (depth === 0) return result;
  // Recursive case
  // Traverse through the arr
  for (const e of arr) {
    // If current element is an array, recursively call retrive depth, passed in the array element and decrement depth
    if (Array.isArray(e)) retrieveDepth(e, depth - 1, result);
    // Else, push element to result
    else result.push(e);
  }
  // Return result
  return result;
};
// console.log(retrieveDepth([2, [4, [7], 1], 5], 5));

/*
  
  Extension:
  
  Given an arbitrarily nested array of numbers and a nonnegative integer "depth",
  return a new nested array that's flattened to a certain level of depth.
  
  Flattening at "depth 0" just returns the same array.
  Flattening at "depth 1" returns the array flattened at just one level.
  
  For example:
  
  flattenDepth([2, [4, [7], 1], 5], 0)
    -> [2, [4, [7], 1], 5] // the same array
  
  flattenDepth([2, [4, [7], 1], 5], 1)
    -> [2, 4, [7], 1, 5] // flattened at one level
  
  flattenDepth([2, [4, [7], 1], 5], 2)
    -> [2, 4, 7, 1, 5] // flattened at two levels
  
  flattenDepth([2, [4, [7], 1], 5], 3)
    -> [2, 4, 7, 1, 5] // flattening at greater levels just produces a completely
  flattened array
  
  */

const flattenDepth = (arr, depth) => {
  // Base case: if depth is zero, return arr
  if (depth === 0) {
    // Return arr
    return arr;
  }
  // Recursive case:
  const result = [];
  // Iterate through the array
  for (const e of arr) {
    // If the current element is an array
    if (Array.isArray(e)) {
      // Recursively call flattenDepth, passing in the current element, and decrement depth
      result.push(...flattenDepth(e, depth - 1));
    }
    // Else
    // Push the value to result
    else result.push(e);
  }
  // Return result array
  return result;
};

// console.log(flattenDepth([2, [4, [7], 1], 5], 0));
