/* 
  Given an array of integers, sort and return the array.
  The sorted integers should be in ascending order from left to right.
  Do not use the array sort method built in to the array prototype while solving the
  problem. 

  We will sort the array using a strategy called merge sort, which functions as follows:
  First, split the array by half until each array contains a single element.
  Then, compare each set of elements and combine them into a sorted pair.
  Next, compare sorted sets of elements and combine them in order to form a new sorted array.
  Continue this process until the entire array is sorted.

*/

const mergeSort = (array) => {
    // Split array in half
    if (array.length < 2) return array;
    const leftHalf = mergeSort(array.slice(0, Math.floor(array.length / 2)));
    const rightHalf = mergeSort(array.slice(Math.floor(array.length / 2)));
  
    // Merge two sorted part:
    let iL = 0;
    let iR = 0;
    const result = [];
  
    // While elements in either array have not been appended to the result aray
    while (iL in leftHalf || iR in rightHalf) {
      // If left value is smaller than right value or rightHalf has run out of elements, append left value to result arr
      // Increment left index
      if (leftHalf[iL] < rightHalf[iR] || !(iR in rightHalf))
        result.push(leftHalf[iL++]);
      // Else apprend right value to result arr
      // Increment right index
      else result.push(rightHalf[iR++]);
    }
    return result;
  };
  
  // const array = [1, 5, 2, 7, 3, 8, 4, 9, 5];
  // console.log(mergeSort(array));
  