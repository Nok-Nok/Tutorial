// 920. Number of Music Playlists

/**
 * Your music player contains n different songs. You want to listen to goal songs (not necessarily different) during your trip. To avoid boredom, you will create a playlist so that:

Every song is played at least once.
A song can only be played again only if k other songs have been played.
Given n, goal, and k, return the number of possible playlists that you can create. Since the answer can be very large, return it modulo 109 + 7.

 

Example 1:

Input: n = 3, goal = 3, k = 1
Output: 6
Explanation: There are 6 possible playlists: [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], and [3, 2, 1].
Example 2:

Input: n = 2, goal = 3, k = 0
Output: 6
Explanation: There are 6 possible playlists: [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2, 1], [2, 1, 2], and [1, 2, 2].
Example 3:

Input: n = 2, goal = 3, k = 1
Output: 2
Explanation: There are 2 possible playlists: [1, 2, 1] and [2, 1, 2].
 

Constraints:

0 <= k < n <= goal <= 100
 */

/**
 * @param {number} n
 * @param {number} goal
 * @param {number} k
 * @return {number}
 */
// This is a dynamic programming question
// Time Complexity: O(n*goal)
// Space Complexity: O(n*goal)
var numMusicPlaylists = function (n, goal, k) {
  // Create dp array: with columns to be number of unique songs (n unique songs), and rows to be the length of playlist (goal songs in playlist)
  const dp = new Array(goal + 1).fill(0).map((e) => new Array(n + 1).fill(0));
  // When there is 0 songs to play, and 0 unique song require, we can make 1 playlist []
  dp[0][0] = 1;
  // MOD for modulo the result
  const MOD = 10 ** 9 + 7;

  // Loop throuhg the length of the playlist
  for (let i = 1; i <= goal; i++) {
    // Loop through the number of unique songs
    /**
     * Note we can't make any playlist if we require more unique songs than the length of the play list
     * if (more unique then playlist length) => if (n > goal) => if i>j dp[i][j] = 0
     * Only loop till j<i && j<n
     */
    for (let j = 0; j <= Math.min(i, n); j++) {
      // To construct a playlist, we can choose too add unique song or add a repeat song that is not played in previous k songs
      // Add unique song to playlist:
      // At position [i-1][j-1], each playlist has a length of (i-1) and number of unique songs = (j-1). If we are to add 1 more UNIQUE song to reach length of i => we have n - (j-1) options to add
      // => each playlist will then have length of i and number of unique songs = j
      const uniqueAdd = j > 0 ? dp[i - 1][j - 1] * (n - (j - 1)) : 0;
      // Add repeat song to playlist
      // At position [i-1][j], each playlist has a length of (i-1) and number of unique songs = (j). If we are too add 1 more REPEAT song to reach length of i => we have (j-k) options to add
      // => each playlist will then have length of i and number of unique songs = j
      const repeatAdd = j > k ? dp[i - 1][j] * (j - k) : 0;
      dp[i][j] = (uniqueAdd % MOD) + (repeatAdd % MOD);
    }
  }
  // console.table(dp);
  return dp[goal][n] % MOD;
};

// Time Complexity: O(n*goal)
// Space Complexity: O(n)
var numMusicPlaylists = function (n, goal, k) {
  let dp = new Array(n + 1).fill(0);
  let newDp = new Array(n + 1).fill(0);
  // When there is 0 songs to play, and 0 unique song require, we can make 1 playlist []
  dp[0] = 1;
  // MOD for modulo the result
  const MOD = 10 ** 9 + 7;

  // Loop throuhg the length of the playlist
  for (let i = 1; i <= goal; i++) {
    // Loop through the number of unique songs
    /**
     * Note we can't make any playlist if we require more unique songs than the length of the play list
     * if (more unique then playlist length) => if (n > goal) => if i>j dp[i][j] = 0
     * Only loop till j<i && j<n
     */
    for (let j = 0; j <= Math.min(i, n); j++) {
      // To construct a playlist, we can choose too add unique song or add a repeat song that is not played in previous k songs
      // Add unique song to playlist:
      // At position [i-1][j-1], each playlist has a length of (i-1) and number of unique songs = (j-1). If we are to add 1 more UNIQUE song to reach length of i => we have n - (j-1) options to add
      // => each playlist will then have length of i and number of unique songs = j
      const uniqueAdd = j > 0 ? dp[j - 1] * (n - (j - 1)) : 0;
      // Add repeat song to playlist
      // At position [i-1][j], each playlist has a length of (i-1) and number of unique songs = (j). If we are too add 1 more REPEAT song to reach length of i => we have (j-k) options to add
      // => each playlist will then have length of i and number of unique songs = j
      const repeatAdd = j > k ? dp[j] * (j - k) : 0;
      newDp[j] = ((uniqueAdd % MOD) + (repeatAdd % MOD)) % MOD;
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[n];
};
(n = 3), (goal = 3), (k = 1);
console.log(numMusicPlaylists(n, goal, k));
(n = 2), (goal = 3), (k = 0);
console.log(numMusicPlaylists(n, goal, k));
(n = 2), (goal = 3), (k = 1);
console.log(numMusicPlaylists(n, goal, k));
