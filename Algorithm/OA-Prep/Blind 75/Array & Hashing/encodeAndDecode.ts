// 271. Encode and Decode Strings

/**
 * Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
Machine 2 (receiver) has the function:
vector<string> decode(string s) {
  //... your code
  return strs;
}
So Machine 1 does:

string encoded_string = encode(strs);
and Machine 2 does:

vector<string> strs2 = decode(encoded_string);
strs2 in Machine 2 should be the same as strs in Machine 1.

Implement the encode and decode methods.

You are not allowed to solve the problem using any serialize methods (such as eval).

 

Example 1:

Input: dummy_input = ["Hello","World"]
Output: ["Hello","World"]
Explanation:
Machine 1:
Codec encoder = new Codec();
String msg = encoder.encode(strs);
Machine 1 ---msg---> Machine 2

Machine 2:
Codec decoder = new Codec();
String[] strs = decoder.decode(msg);
Example 2:

Input: dummy_input = [""]
Output: [""]
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] contains any possible characters out of 256 valid ASCII characters.
 

Follow up: Could you write a generalized algorithm to work on any possible set of characters?
 */

/**
 * Encodes a list of strings to a single string.
 */
// Time Complexity: O(n) hwere n is length of the array
// Space Complexity: O(1) since we are only modifying the input array
function encode(strs: string[]): string {
  // For each work in the string, add the length and a pound
  return strs.map((str) => str.length + '#' + str).join('');
}

/**
 * Decodes a single string to a list of strings.
 */
// Time Complexity: O(n) where n is length of string
// Space Complexity: O(1) since we are not caching
function decode(s: string): string[] {
  // Loop through the string
  let i: number = 0;
  const result: string[] = [];
  while (i < s.length) {
    // Extract the number
    let num = '';
    while (s[i] != '#') {
      num += s[i++];
    }
    // Extract word
    i++; //Skip the #
    const word: string = s.slice(i, i + Number(num));
    result.push(word);
    // Update i
    i += Number(num);
  }
  return result;
}

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

const dummy_input = ['Hello', 'World', 'this', 'is', '', 'Nok', '###'];
console.log(encode(dummy_input));
console.log(decode(encode(dummy_input)));
