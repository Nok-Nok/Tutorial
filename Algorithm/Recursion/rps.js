/*

Return an array of strings (all of length n) whose values are all the possible
ways of creating strings from the letters 'r', 'p', and 's'.

For example:

rps(0) -> ['']
rps(1) -> ['r', 'p', 's']
rps(2) -> ['rr', 'rp', 'rs', 'pr', 'pp', 'ps', 'sr', 'sp', 'ss']
rps(3) -> [
  'rrr', 'rrp', 'rrs', 'rpr', 'rpp', 'rps', 'rsr', 'rsp', 'rss',
  'prr', 'prp', 'prs', 'ppr', 'ppp', 'pps', 'psr', 'psp', 'pss',
  'srr', 'srp', 'srs', 'spr', 'spp', 'sps', 'ssr', 'ssp', 'sss'
]

The strings must be returned in the order suggested above.

*/
// Space complexity: O(1) if we don't count result into space complexit
// Time Complexity: O(n) hwere n is the length n of the str
const rps = (n) => {
  let result = [''];
  while (n) {
    result = result.flatMap((el) => [el + 'r', el + 'p', el + 's']);
    // Udpate n
    n--;
  }
  // Return result
  return result;
};

// console.log(rps(0));
// console.log(rps(1));
// console.log(rps(2));
// console.log(rps(3));
/*
  
  Extension:
  
  Return an array of strings (all of length n) whose values are all the possible
  ways of creating strings from the letters in 'chars'. Assume that there will be
  no duplicates in 'chars'.
  
  This is equivalent to returning all possible passwords of length n given a
  character set 'chars'.
  
  For example:
  
  passwords('ab', 1) -> ['a', 'b']
  passwords('abxy', 2) -> [
    'aa', 'ab', 'ax', 'ay',
    'ba', 'bb', 'bx', 'by',
    'xa', 'xb', 'xx', 'xy',
    'ya', 'yb', 'yx', 'yy'
  ]
  
  The strings must be returned in order reflecting the order of letters in 'chars'
  
  */

// Space complexity: O(1) if we don't count result into space complexit
// Time Complexity: O(n) hwere n*m is the length n of the str, and m is the length of the chars
const passwords = (chars, n) => {
  let result = [''];
  while (n) {
    result = result.flatMap((el) => {
      const comb = [];
      for (const i in chars) comb.push(el + chars[i]);
      return comb;
    });
    // Update n
    n--;
  }
  return result;
};
// console.log(passwords('ab', 1));
// console.log(passwords('abxy', 2))
