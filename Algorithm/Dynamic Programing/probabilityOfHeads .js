// Toss Strange Coins

/**
 * You have some coins.  The i-th coin has a probability prob[i] of facing heads when tossed.

Return the probability that the number of coins facing heads equals target if you toss every coin exactly once.

 

Example 1:

Input: prob = [0.4], target = 1
Output: 0.40000
Example 2:

Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125
 

Constraints:

1 <= prob.length <= 1000
0 <= prob[i] <= 1
0 <= target <= prob.length
Answers will be accepted as correct if they are within 10^-5 of the correct answer.
 */
function probabilityOfHeads(prob, target) {
  // Initialize an array to get frequency to reach a target
  let freq = new Array(prob.length).fill(0);

  for (let tar = 0; tar <= target; tar++) {
    const newFreq = [];
    for (let j = prob.length - 1; j >= 0; j--) {
      if (tar === 0 && j === prob.length - 1) newFreq[j] = 1 - prob[j];
      else if (tar === 1 && j === prob.length - 1) newFreq[j] = prob[j];
      else {
        // newFrequency = prop of head * prop (tar-1) + prop of tail * prop(tar)
        newFreq[j] =
          prob[j] * (freq[j + 1] || 0) + (1 - prob[j]) * (newFreq[j + 1] || 0);
      }
    }
    freq = newFreq;
  }
  return freq[0];
}

function probabilityOfHeads(prob, target) {
  // Initialize an array to get frequency to reach a target
  let freq = new Array(prob.length).fill(0);
  let head = 0;
  while (head <= target) {
    const newFreq = new Array(prob.length).fill(0);
    if (head === 0) newFreq[0] = 1 - prob[0];
    if (head === 1) newFreq[0] = prob[0];
    for (let i = 1; i < prob.length; i++) {
      /**
       * Current Probability =
       *  prop head * prop of previous amount of coins to reach 1 head less
       *  +
       *  prop tail * prop of previous amount of coins to reach the same head
       */
      newFreq[i] = prob[i] * freq[i - 1] + (1 - prob[i]) * newFreq[i - 1];
    }
    freq = newFreq;
    head++;
  }
  return freq.pop();
}

function probabilityOfHeads(prob, target) {
  // Initialize an array to get frequency to reach a target
  let freq = new Array(target + 1).fill(0);
  freq[0] = 1; //With no coin, there 100% to get no head

  for (const headProb of prob) {
    // Get new frequency
    const newFreq = [(1 - headProb) * freq[0]]; //for 0 head, we will only get the tail portion
    for (let head = 1; head < freq.length; head++) {
      // Frequency = prop of head * previous freq of head-1 + prop of tail * previous freq of head
      newFreq[head] = headProb * freq[head - 1] + (1 - headProb) * freq[head];
    }
    freq = newFreq;
  }
  return freq.pop();
}

(prob = [0.5, 0.4, 0.3]), (target = 1);
console.log(probabilityOfHeads(prob, target));
