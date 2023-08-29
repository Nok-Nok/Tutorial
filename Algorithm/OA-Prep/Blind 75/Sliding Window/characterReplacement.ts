// 424. Longest Repeating Character Replacement

/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achive this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
 */
// Time Complexity: O(n)
// Space Complexity: O(n), max 26 => O(1)
function characterReplacement(s: string, k: number): number {
  // Initiailize
  let maxFreq: number = 0;
  let maxLength: number = 0;
  let l: number = 0;
  const cache: Record<string, number> = {};
  for (let r: number = 0; r < s.length; r++) {
    // Update the frequency cache
    cache[s[r]] = (cache[s[r]] ?? 0) + 1;
    // Update maxFreq
    maxFreq = Math.max(maxFreq, cache[s[r]]);
    // If replacement > k, move the left pointer
    // No need to update maxFreq after move left since the substring length can't increase unless we can get more duplicate letters
    if (r - l + 1 - maxFreq > k) {
      cache[s[l]]--;
      l++;
    }
    maxLength = Math.max(maxLength, r - l + 1);
  }
  return maxLength;
}
const s = 'AABABBA',
  k = 1;
console.log(characterReplacement(s, k));
