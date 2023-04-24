/* 
Write a function that logs to the console an nxn representation of a staircase for any 
given nonnegative height, n. If the passed-in height is negative, console log an empty string.
The staircase must climb up from left to right. Each level of stairs logs a string of
asterisks and/or leading spaces. Note that the last stair should only consist of 
asterisks without any leading spaces.
 
For example:     
drawStairs(6) ->          
     *
    **
   ***
  ****
 *****
******
*/

// Input: number
// Output: undefined
const drawStairs = (n) => {
  // Initialize result str
  let result = '';
  // Loop from 1 to n
  for (let i = 1; i <= n; i++) {
    //  Initialize a str level, that is empty
    let level = '';
    // Use padEnd to append * to the str level based on n value
    level = `${' '.repeat(n-i)}${'*'.repeat(i)}`;
    // Append the str level to the result str, follow with an \n if i!=n
    result += level;
    if (i != n) result += '\n';
  }
  // console log the string
  console.log(result);
};

drawStairs(7);
