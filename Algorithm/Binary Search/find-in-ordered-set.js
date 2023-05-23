/*
Write a function findInOrderedSet that determines if a target value exists within an array of numbers.

Assuming that the array is sorted in ascending order, can you accomplish this with time complexity better than O(n)?

ex:
const nums = [-3, 0, 8, 13, 37]
findInOrderedSet(nums, 0);  -> true
findInOrderedSet(nums, 2);  -> false
*/

// This is a binary search problem
// Time Complexity: O(logn)where n is the length of the array
// Space Complexity: O(1)
const findInOrderedSet = (array, target) => {
    // Intiailize l and r pointer
    let l = 0;
    let r = array.length - 1;
    // If l had not passed r
    while (l <= r) {
      // Find mid value
      const m = Math.floor((l + r) / 2);
      // If m=target, return true
      if (array[m] === target) return true;
      // If m<target, move left
      if (array[m] < target) l = m + 1;
      // else move right
      else r = m - 1;
    }
    return false;
  };
  
  /*
  Extension:
  
  Write a function findIn2dMatrix that determines if a target value exists within a two dimensional matrix.
  The matrix has the following properties:
    - Each subarray in the matrix contains numbers sorted in ascending order
    - The *last* element in each subarray is smaller than than the *first* element in each following subarray  
  
  ex:
  const matrix = [
    [-3, -1,  2,  4,  5],
    [ 6,  7,  8, 13, 37],
    [41, 49, 50, 61, 75]
  ];
  findIn2dMatrix(matrix, 13); -> true
  findIn2dMatrix(matrix, 42); -> false
  
  */
  // Time Complexity: O(log(n+m))where n*m is the size of the matrix
  // Space Complexity: O(1)
  const findIn2dMatrix = (matrix, target) => {
    const row = matrix.length;
    const col = matrix[0].length;
    // Initialize left and right pointer
    let l = 0;
    let r = row - 1;
    let m;
    // Loop for row that contain the target
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      // If target is between values in row m, break
      if (target >= matrix[m][0] && target <= matrix[m][col - 1]) break;
      // If target < first value in row m, move right. Else move left
      if (target < matrix[m][0]) r = m - 1;
      else l = m + 1;
    }
  
    // Initialize left and right pointer
    l = 0;
    r = col - 1;
    const searchRow = matrix[m];
    // Loop to find the value in the row
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (target === searchRow[m]) return true;
      if (target > searchRow[m]) l = m + 1;
      else r = m - 1;
    }
    return false;
  };
  
  