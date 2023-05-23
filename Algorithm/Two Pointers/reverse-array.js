/*

Reverse and return an array in-place. Do not create a new array in memory.
Instead, modify the array as given. Do not use the array reverse method built in
to the array prototype while solving the problem.

*/

// Time Complexity: O(n) where n is number of elements in the array
// Space Complexity: O(1) 
const reverseArray = (array) => {
  // Intialize left and right pointers
  let l = 0;
  let r = array.length - 1;
  //   While left and right has not overlaped:
  while (l < r) {
    // Swap the value
    [array[l], array[r]] = [array[r], array[l]];
    // Update left and right pointer
    l++, r--;
  }
  return array;
};

/*
  
  Extension: (recommended to solve reverseArray first)
  
  Given a string as a sentence "bob likes dogs alot" return the word reversal
  "alot dogs likes bob". Do not use the array reverse method built in to the array
  prototype.
  
  The input string will always be a series of words separated by spaces between
  them, with each word containing only lowercase letters and no punctuation. The
  input string will always have at least one word
  
  */
// Time Complexity: O(n) where n is number of words in the sentence
// Space Complexity: O(1) 
const reverseSentence = (sentence) => {
  return reverseArray(sentence.split(' ')).join(' ');
};
