/* 
Determine whether a target substring can be found within a string! 
No regex allowed! No string.prototype.includes or string.prototype.indexOf!

Your solution should have O(n * m) time-complexity where:
n is equal to the given string length
m is equal to the target substring length

I.e. in 'xztzcatbfbbq' find 'cat' 

Input: 'xztzcatbfbbq', 'cat'
Output: true

Input: 'finding a needle in a haystack', 'lein'
Output: false
*/

// This is a sliding window problem
// Time Complexity: O(n*m) where n is length of string and m is length of substring
// Space Complexity: O(1)
const needleInHaystack = (string, substring) => {
  // Intialize sliding window
  let l = 0;
  let r = 0;

  // Loop through the substring
  while (r < string.length) {
    const stringChar = string[r];
    const substringChar = substring[r - l];

    // if letter at r match with substring
    if (stringChar === substringChar) {
      // if found full substring, return true
      if (r - l + 1 == substring.length) return true;
      // else continue traverse to next char
      r++;
    }
    // if letter does not match, move l & reset r
    else {
      l++;
      while (string[l] !== substring[0] && l < string.length) l++;
      r = l;
    }
  }
  return false;
};

// console.log(needleInHaystack('ssdcacaccccccccat', 'cat'));
/*
  Extension: Now imagine the target substring and string both might have underscores '_'.
  Treat '_'s as wildcards, or blank pieces in Scrabble - i.e., they can be any letter.
  
  Input: '_ello_orld', 'helloworl_'
  Output: true
  
  Input: 'montana', '__o__'
  Output: false
  */
// Time Complexity: O(n*m) where n is length of string and m is length of substring
// Space Complexity: O(1)
const needleInHaystackWithWildcards = (string, substring) => {
  // Intialize sliding window
  let l = 0;
  let r = 0;

  // Loop through the substring
  while (r < string.length) {
    const stringChar = string[r];
    const substringChar = substring[r - l];
    // if letter at r match with substring
    if (
      stringChar === substringChar ||
      stringChar === '_' ||
      substringChar === '_'
    ) {
      // if found full substring, return true
      if (r - l + 1 == substring.length) return true;
      // else continue traverse to next char
      r++;
    }
    // if letter does not match, move l & reset r
    else {
      l++;
      while (
        string[l] !== substring[0] &&
        string[l] !== '_' &&
        substring[0] !== '_' &&
        l < string.length
      )
        l++;
      r = l;
    }
  }
  return false;
};
// console.log(needleInHaystackWithWildcards('y_l_', 'o'));

