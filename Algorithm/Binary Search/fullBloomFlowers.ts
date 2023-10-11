// 2251. Number of Flowers in Full Bloom

/**
 * You are given a 0-indexed 2D integer array flowers, where flowers[i] = [starti, endi] means the ith flower will be in full bloom from starti to endi (inclusive). You are also given a 0-indexed integer array people of size n, where people[i] is the time that the ith person will arrive to see the flowers.

Return an integer array answer of size n, where answer[i] is the number of flowers that are in full bloom when the ith person arrives.

 

Example 1:


Input: flowers = [[1,6],[3,7],[9,12],[4,13]], poeple = [2,3,7,11]
Output: [1,2,2,2]
Explanation: The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.
Example 2:


Input: flowers = [[1,10],[3,3]], poeple = [3,3,2]
Output: [2,2,1]
Explanation: The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.
 

Constraints:

1 <= flowers.length <= 5 * 104
flowers[i].length == 2
1 <= starti <= endi <= 109
1 <= people.length <= 5 * 104
1 <= people[i] <= 109
 */
// This is an question on overlapping interval

// Time Complexity: O(F + FlogF) to construct the sorted start and end array + O(P * 2logF) sicne we traverse the people array and perform binary search to find the # of flowers has bloomed/start and withered/end => O((F+P)*logF)
// Space Complexity: O*(2F + 2logF) for constructing the start and end array => O(F)

function fullBloomFlowers(flowers: number[][], people: number[]): number[] {
  // Note" Thhink about curFlower = # start - # Stop
  // Sort the start and stop blooming: Time Complexity: O(F + FlogF) & Space Complexity: O(2F + 2logF)
  const start: number[] = [-Infinity];
  const end: number[] = [-Infinity];
  flowers.forEach(([s, e]) => {
    start.push(s);
    end.push(e + 1);
  });
  start.sort((s1, s2) => s1 - s2);
  end.sort((e1, e2) => e1 - e2);
  // Loop through the people
  const result: number[] = [];
  for (const p of people) {
    // Find the start index
    const startI = findMaxIndex(p, start, 0, start.length - 1);
    // Find the end index
    const endI = findMaxIndex(p, end, 0, end.length - 1);
    result.push(startI - endI);
  }
  return result;

  /** Find the max start & end index <= target :
   * Time Complexity: O(logN)
   * Space Complexity: O(1)
   */
  function findMaxIndex(
    target: number,
    start: number[],
    l: number,
    r: number
  ): number {
    let m = 0;
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      // Base case
      if (
        start[m] <= target &&
        (m === start.length - 1 || start[m + 1] > target)
      )
        break;
      else if (start[m] > target) r = m - 1;
      else l = m + 1;
    }
    return m;
  }
}
const flowers = [
    [1, 10],
    [3, 3],
  ],
  people = [3, 3, 2];
console.log(fullBloomFlowers(flowers, people));
