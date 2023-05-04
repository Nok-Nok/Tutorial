/*
You have an unsorted array of n + 1 numbers, with the numbers from 1 to n.
One number is duplicated. Find it.
ex: [1,5,4,3,6,2,4,7] should return 4
*/

const duplicateNumber = (array) => {
  const duplicate = new Set();
  for (const num of array) {
    if (duplicate.has(num)) return num;
    duplicate.add(num);
  }
};

/* EXTENSION:
  You have an unsorted array of n + 1 numbers, with the range of k to k + n - 1, with an extra number that is a duplicate.
  (k is not necessarily 1) Find the duplicate. Do this in O(n) time and O(1) space complexity.
  ex: [3, 4, 7, 6, 8, 5, 6] should return 6
  */

const duplicateNumberAdvanced = (array) => {
  // Loop through the array to find min, max and total
  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  for (const num of array) {
    if (num > max) max = num;
    if (num < min) min = num;
    total += num;
  }
  // Sum of a continuous array is (min+max)/2 * array length
  // To find the extra number, we find the difference
  return total - ((min + max) / 2) * (array.length - 1);
};
