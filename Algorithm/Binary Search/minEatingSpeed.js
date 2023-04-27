// Koko Eating Bananas

/**
 * Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23
 

Constraints:

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109
 */

// Time complexity: O(n log(m)) where n is the length of piles and m is the maximum value in piles array
// Space complexity: O(1)
function minEatingSpeed(piles, target) {
  // Initialize left and right pointers
  let left = 1;
  let right = Math.max(...piles);
  // Initialize result
  let minBanana = Infinity;

  // While(left<=right)
  while (left <= right) {
    // Find the mid point
    const mid = Math.floor((left + right) / 2);
    // Find total hours to eat the piles:
    const hour = piles.reduce((prev, cur) => prev + Math.ceil(cur / mid), 0);
    // If hour > target hour, move left pointer
    if (hour > target) left = mid + 1;
    // Else
    else {
      // Update minBanana
      minBanana = Math.min(minBanana, mid);
      // Move right pointer
      right = mid - 1;
    }
  }
  return minBanana;
}

// (piles = [3, 6, 7, 11]), (h = 8);
// minEatingSpeed(piles, h);
// (piles = [30, 11, 23, 4, 20]), (h = 5);
// minEatingSpeed(piles, h);
// (piles = [30, 11, 23, 4, 20]), (h = 6);
// minEatingSpeed(piles, h);
