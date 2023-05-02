/*

Given an array of numbers (integers), return the mode, that is, the number that
appears most often. If there are multiple modes, use the max of the modes.

Assume that at least one number is present in the array.

e.g.
mode([3, 2, 4, 3]) -> 3
mode([7, 5, 8, 8, 2, 5]) -> 8

*/

const mode = (array) => {
  // Create a cache to store duplicate
  const frequency = {};
  let maxFreq = 0;
  let maxDuplicate = -Infinity;
  // Loop throuhg the array to calculate the frequency
  for (const num of array) {
    // Update frequency count
    frequency[num] = (frequency[num] || 0) + 1;
    // If new maxFrequency is found, update maxFreq and maxDuplicate
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      maxDuplicate = num;
    }
    // If same maxFrequnecy is found, update maxDuplicate if applicable
    else if (frequency[num] === maxFreq) {
      maxDuplicate = Math.max(maxDuplicate, num);
    }
  }
  // Return maxDuplicate
  return maxDuplicate;
};

// console.log(mode([3, 2, 4, 3]));
// console.log(mode([7, 5, 8, 8, 2, 5]));
/*
  
  Extension:
  
  Given an arbitrarily nested array of numbers (integers), return the mode, that
  is, the number that appears most often. If there are multiple modes, use the max
  of the modes.
  
  Assume that at least one number is present in the nested array structure,
  although some of the nested arrays may be empty.
  
  e.g.
  modeNested([[3], [2, [4]], 3]) -> 3
  modeNested([7, [[5, [8], 8], 2, 5]]) -> 8
  modeNested([4, []]) -> 4 
  
  */

const modeNested = (array) => {
  // Create a cache to store duplicate
  const frequency = {};
  let maxFreq = 0;
  let maxDuplicate = -Infinity;
  flattenAndFindMode(array);
  return maxDuplicate;

  function flattenAndFindMode(array) {
    // Loop through the array
    for (const num of array) {
      // If the current element is an array, recursively call the flatten function
      if (Array.isArray(num)) flattenAndFindMode(num);
      // Else, find mode
      else {
        // Update frequency count
        frequency[num] = (frequency[num] || 0) + 1;
        // If new maxFrequency is found, update maxFreq and maxDuplicate
        if (frequency[num] > maxFreq) {
          maxFreq = frequency[num];
          maxDuplicate = num;
        }
        // If same maxFrequnecy is found, update maxDuplicate if applicable
        else if (frequency[num] === maxFreq) {
          maxDuplicate = Math.max(maxDuplicate, num);
        }
      }
    }
  }
};

const flattenArray = (array) => {
  // Loop through the array
  for (const num of array) {
    // If the current element is an array, recursively call the flatten function
    if (Array.isArray(num)) flattenArray(num);
    // Else, console log the number
    else {
      console.log(num);
    }
  }
};
flattenArray([7, [[5, [8], 8], 2, 5]]);

// console.log(modeNested([[3], [2, [4]], 3]));
// console.log(modeNested([7, [[5, [8], 8], 2, 5]]));
// console.log(modeNested([4, []]));
