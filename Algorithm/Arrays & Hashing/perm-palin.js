/**
 * Given a string, determine if any of the permutations of that string is a palindrome
 * @see: Permutations: https://stattrek.com/statistics/dictionary.aspx?definition=permutation
 * @see: Palindromes: https://examples.yourdictionary.com/palindrome-examples.html
 *
 * In terms of time complexity, see if you can solve this in O(n) / linear time.
 *
 * Example:
 * 	- permPalin('abab') => true
 * 	- permPalin('cbaba') => true
 * 	- permPalin('cbac') => false
 * 	- permPalin('a') => true
 *
 * Hint: Think about the length of the string and how that relates to the frequencies of the characters
 */

// Time complexity: O(n) where n is length of the string since we iterate through the string once
// Space complexity: O(1) since we have maximum 26 characters in alphabet
const permPalin = (str) => {
  // Ensure passed in str is a string, else return false
  if (typeof str !== 'string') return false;
  //  Initalize a hash to store unique characters
  const hash = {};
  // Intialize a counter (increase by 1 if find a new char, and decrease by 1 if a duplicate)
  let counter = 0;
  // Iterate through the string
  for (const i in str) {
    // Obtain the current character
    const char = str[i];
    // If the current character does not exist in the hash
    if (!hash[char]) {
      // Add the character with value true to hash
      hash[char] = true;
      // Increase counter
      counter++;
    }
    // Else
    else {
      // Update the value to false
      hash[char] = false;
      // Decrease the counter
      counter--;
    }
  }

  //   return true if counter is 0
  return counter <= 1;
};
// console.log(permPalin('ababcaabc'));
