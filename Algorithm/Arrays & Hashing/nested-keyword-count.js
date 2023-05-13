/*

Given an arbitrarily nested array of strings, and a target keyword strong,
return the number of times a keyword appears in a nested array of arrays.

keywordCount(['bye', 'hi', ['cool', 'hi']], 'hi') -> 2 because 'hi' appears twice
keywordCount(['x', 'y', ['x', 'x'], 'a'], 'x') -> 3
keywordCount(['blah', 'key', ['inside', ['really inside']]], 'lol') -> 0

*/

const keywordCount = (array, keyword) => {
  // Initialize a count
  let count = 0;
  // Call helper function
  startCount(array, keyword);
  // Return count
  return count;
  // Declare a recursive helper function
  function startCount(array, keyword) {
    // Iterate through the array
    for (const e of array) {
      // If current element is an array, recursively call helper function passed in this element
      if (Array.isArray(e)) startCount(e, keyword);
      // Else
      // Update the count if applicable
      else if (e === keyword) count++;
    }
  }
};

// console.log(keywordCount(['bye', 'hi', ['cool', 'hi']], 'hi'));
// console.log(keywordCount(['x', 'y', ['x', 'x'], 'a'], 'x'));
// console.log(
//   keywordCount(['blah', 'key', ['inside', ['really inside']]], 'lol')
// );
/*
  
  Extension:
  
  Given a nested array of arrays, return an array of keywords that appear the most
  often. Return multiple results within the array if there's a tie. Return the
  multiple in lexiographical (alphabetic) order.
  
  keywordMode([['cars', 'bat'], 'apple', 'bat', 'cars']) -> ['bat', 'cars']
  keywordMode([['ace', 'cool'], ['hi'], 'cool']) -> ['cool']
  
  */

const keywordMode = (array) => {
  // Declare a hash to track the frequency
  const hash = {};
  // Initialize a max count
  let max = 0;
  // Declare a recursive helper function
  function startCount(array) {
    // Iterate through the array
    for (const e of array) {
      // If current element is an array, recursively call helper function passed in this element
      if (Array.isArray(e)) startCount(e);
      // Else
      // Update the hash and max if applicable
      else {
        hash[e] = (hash[e] || 0) + 1;
        max = Math.max(max, hash[e]);
      }
    }
  }
  // Invoke the function to update hash frequency
  startCount(array);
  // Initialize result array
  const result = [];
  // Loop through the hash and updat result if the frequency match max
  for (const word in hash) {
    if (hash[word] === max) result.push(word);
  }

  // Return sorted result
  return result.sort();
};
// console.log(keywordMode([['cars', 'bat'], 'apple', 'bat', 'cars']));
// console.log(keywordMode([['ace', 'cool'], ['hi'], 'cool']) )
