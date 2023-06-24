/*

Given an array of at least two integers (which may be positive, negative, or zero),
return an array of all the possible products made by multiplying all but one number.
In other words, find all the products of multiplying any array.length - 1 numbers
in the array.

Example:

getAllProducts([1, 7, 3, 4]) -> [84, 12, 28, 21]
this is done via:
[7*3*4, 1*3*4, 1*7*4, 1*7*3]

getAllProducs([2, 5, 3]) -> [15, 6, 10]
this is done via:
[5*3, 2*3, 2*5]

Be careful in this problem! What if there is a zero (or multiple zeroes) in the
input array? How would you handle this?

*/
// Time Complexity: O(n) where n is length of array
// Space Complexity: O(2n) where n is length of array
const getAllProducts = (array) => {
  // Initialize a prefix array to store the product of the prefix
  const prefix = new Array(array.length).fill(1);
  for (let i = 1; i < array.length; i++) {
    // Current prefix product = previous prefix product * previous number
    prefix[i] = prefix[i - 1] * array[i - 1];
  }
  // Initialize a suffix array to store the product of the suffix
  let curSuffix = 1;
  const suffix = [];
  for (let i = array.length - 1; i >= 0; i--) {
    // Current suffix product = previous suffix product * previous number
    curSuffix *= array[i + 1] ?? 1;
    suffix[i] = curSuffix;
  }
  // Return result array, which is product of prefix * suffix
  return suffix.map((_, i) => prefix[i] * suffix[i]);
};

// Time Complexity: O(n) where n is length of array
// Space complexity: O(1) if we do not count result array into space complexity
const getAllProductsOptimize = (array) => {
  // Initialize a result array to store the product of the prefix * suffix
  const result = new Array(array.length).fill(1);
  for (let i = 1; i < array.length; i++) {
    // Current prefix product = previous prefix product * previous number
    result[i] = result[i - 1] * array[i - 1];
  }
  // Initialize a suffix variable to store the product of the suffix
  let suffix = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    // Current suffix product = previous suffix product * previous number
    suffix *= array[i + 1] ?? 1;
    // Update result
    result[i] *= suffix;
  }
  return result;
};

getAllProducts([0, 1, 2, 3, 4]);
// getAllProducts([1, 0, 3, 4]);
