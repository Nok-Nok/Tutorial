// Hand of Straights

/**
 * Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

 

Example 1:

Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
Example 2:

Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

 

Constraints:

1 <= hand.length <= 104
0 <= hand[i] <= 109
1 <= groupSize <= hand.length

 */

// Time Complexity: O(h+hlogh+h*(h/g)) where h is hand length and g is group size => this is the reason why we have slow Time but Good Space => Greedy is better since it has better time complexity
// Space Complexity: O(h/g) where h is hand length and g is group size
var isNStraightHand = function (hand, groupSize) {
  // Return false if hand length not divisible by groupSize
  if (hand.length % groupSize) return false;
  // Intialize groups, each of its element would be [size, max]
  const groups = new Array(hand.length / groupSize).fill(0).map((_) => [0]);
  // Sort the hand
  hand.sort((a, b) => a - b);
  // Loop through the hand
  for (const val of hand) {
    // Organize by group
    let added = false;
    for (let i = 0; i < groups.length; i++) {
      const [size, max] = groups[i];
      if (size === 0 || (size < groupSize && val - max === 1)) {
        groups[i] = [size + 1, val];
        added = true;
        break;
      }
    }

    if (!added) return false;
  }
  return true;
};

// Try greedy approach
// Time Complexity: O(h+hlogh+h) -> O(hlogh)
// Space Complexity: O(h)
var isNStraightHand = function (hand, groupSize) {
  // Return false if hand length not divisible by groupSize
  if (hand.length % groupSize) return false;

  // Obtain the frequency of the hand value
  const frequency = {}; //val : frequency
  hand.forEach((e) => (frequency[e] = (frequency[e] ?? 0) + 1));

  // Sort unique value of hand ascendingly
  const handSort = Object.keys(frequency)
    .map((e) => Number(e))
    .sort((a, b) => a - b);

  // Loop through the sorted unique values
  for (const val of handSort) {
    // While the card with this value has not been fully consumed, construct a group using consecutive number
    while (frequency[val]) {
      for (let i = 0; i < groupSize; i++) {
        // If can't find the consecutive value, return false
        if (!frequency[val + i]) return false;
        // Else, reduce frequency by 1 since we have used this card
        frequency[val + i]--;
      }
    }
  }
  return true;
};
(hand = [1, 2, 3, 6, 2, 3, 4, 7, 8]), (groupSize = 3);
console.log(isNStraightHand(hand, groupSize));
(hand = [1, 2, 3, 4, 5]), (groupSize = 4);
console.log(isNStraightHand(hand, groupSize));
(hand = [1, 2, 3, 4, 4, 5, 6, 6]), (groupSize = 4);
console.log(isNStraightHand(hand, groupSize));
hand = [1, 1, 2, 2, 3, 3];
groupSize = 3;
console.log(isNStraightHand(hand, groupSize));
