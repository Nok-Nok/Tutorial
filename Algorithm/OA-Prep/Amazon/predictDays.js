/**
 * /**
 * Alexa is Amazon's virtual AI assistant. It makes it easy to set up your Alexa-enabled devices, listen to music, get weather updates and much more. The team is working on a new feature that suggests days for camping based on the weather forecase.
 *
 * According to a survey, a day is ideal for camping if the amount of rainfall has been non-increasing for the prior k days from the considered and will be non-decreasing for the following k days from the considered day. Given the predicted rainfall for the next n days, find all the ideal days. Formally the day i is ideal if the follow is true:
 *
 * day[i-k] >= day [i-k+1] >= .... >= day[i-1] >= day[i]  <= day[i+1] <= ... <= day[i+k-1] <= day [i+k]
 *
 * Return the array of ideal days in ascending order. Note the ith element of the array represents the data for the day i+1. It is guaranteed that there is atleast 1 ideal day
 */
/*
 *
 *
 * For a day to be ideal, the amount of rainfall has to be non-increasing for 2 days and non-decreasing for the following 2 days
 *
 * The rainfall trend for day3 is day1>=day2>= day3 <=day4<=day5 => so day3 is ideal
 * The rainfall trend for day4 is day2>=day3 day4 <=day5<=day6 => so day day4 is ideal
 *
 * Function description
 * Complete the function predictDays in the editor below
 *
 * predictDays has the following parameters
 * int day(n) predicted rainfall for each day
 * k an integer
 *
 * output: an array of ideal days
 */
// Curent brute force we would have
// Time Complexity: O(day length * k)
// Space Complexity: O(1)

function predictDays(day, k) {
  // Initialize result
  const result = [];
  const arr = new Array(day.length).fill(false);
  // Loop through the given day
  for (let i = k; i < day.length - k; i++) {
    result.push(i + 1);
    arr[i] = true;
    const rain = day[i];
    for (let j = 1; j <= k; j++) {
      if (rain > day[i - j] || rain > day[i + j]) {
        console.log(i, j);
        result.pop();
        arr[i] = false;
        break;
      }
    }
  }
  console.log(arr);
  return result;
}

// Think of dp array
// Time Complexity: O(day + k)
// Space Complexity: O(2 * day) => can optimize to O(1 * day)
function predictDays(day, k) {
  const dpLtoR = new Array(day.length).fill(0);
  const dpRtoL = new Array(day.length).fill(0);

  // Loop day from left to right, accumlate how many previous days has rain >= cur day
  for (let i = 1; i < day.length; i++) {
    if (day[i - 1] >= day[i]) dpLtoR[i] = dpLtoR[i - 1] + 1;
  }

  // Loop day from right to left, accumlate how may days after has rain >= cur day
  for (let i = day.length - 2; i >= 0; i--) {
    if (day[i + 1] >= day[i]) dpRtoL[i] = dpRtoL[i + 1] + 1;
  }
  // Intiailize result array
  const result = [];
  // Loop throgh the dp array, push if both val >=k
  for (let i = 0; i < day.length; i++) {
    if (dpLtoR[i] >= k && dpRtoL[i] >= k) result.push(i + 1);
  }

  return result;
}

function predictDays(day, k) {
  // Edge case: k=0, return all day
  if (k === 0) return new Array(day.length).fill(0).map((e, i) => i + 1);
  // Edge case: k<0, return a negative array
  if (k < 0) return [];

  const dp = new Array(day.length).fill(0);
  // Loop day from right to left, accumlate how may days after has rain >= cur day
  for (let i = day.length - 2; i >= 0; i--) {
    if (day[i + 1] >= day[i]) dp[i] = dp[i + 1] + 1;
  }
  // Loop day from right to left, accumlate how may days after has rain >= cur day
  // Loop throgh the dp array, push if both val >=k
  const result = [];
  let prev = 0;
  for (let i = 1; i < day.length; i++) {
    if (day[i - 1] >= day[i]) prev++;
    else prev = 0;

    // Update result array
    if (prev >= k && dp[i] >= k) result.push(i + 1);
  }
  return result;
}

day = [3, 2, 2, 2, 2, 3, 4, 1, 2, 4, 3, 2, 2, 2, 2, 2, 5];
k = 2;

day = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
k = 3;

day = [1, 0, 0, 0, 1];
k = 2;
console.log(predictDays(day, k));
