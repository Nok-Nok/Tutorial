// Find the Duplicate Number
/**
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
 */

// This is a linked list cycle problem
/**
 * Floyd's Algorithm
 * In order to find the start of the cycle
 * 1. Get a fast and slow pointer, move until the two meet
 * 2. Get another slow pointer, move the 2 slow until they meet
 * 3. The meeting locaiton is the start of the cycle
 */
// Time Complexity: O(n) where n is the length of nums
// Space Complexity: O(1)
function findDuplicate(nums) {
  // Initialize fast and slow pointer
  let fast = 0;
  let slow = 0;
  // Traverse through the linked list
  while (true) {
    // Update slow and fast pointer
    slow = nums[slow];
    fast = nums[nums[fast]];
    // When slow and fast meet, stop
    if (slow === fast) break;
  }

  // Initialize 2nd slow pointer
  let slow2 = 0;
  while (true) {
    // Update 2 slow pointers
    slow2 = nums[slow2];
    slow = nums[slow];
    // If the two pointer meet, this is the start of the cycle (a.k.a the duplicate number)
    if (slow === slow2) return slow;
  }
}

// nums = [1, 3, 4, 2, 2];
// console.log(findDuplicate(nums));
// nums = [3, 1, 3, 4, 2];
// console.log(findDuplicate(nums));
