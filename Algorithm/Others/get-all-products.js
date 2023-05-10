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

const getAllProducts = (array) => {
  // Get the left Product
  let prev = 1;
  const leftProduct = [];
  for (let i = 0; i < array.length; i++) {
    prev *= array[i - 1] ?? 1;
    leftProduct[i] = prev;
  }

  // Get the right Product and mutiply with the left Product to get final ones.
  prev = 1;
  const prod = [];
  for (let i = array.length - 1; i >= 0; i--) {
    prev *= array[i + 1] ?? 1;
    prod[i] = prev * leftProduct[i];
  }
  return prod;
};

// getAllProducts([1, 7, 3, 4]);
// getAllProducts([1, 0, 3, 4]);
