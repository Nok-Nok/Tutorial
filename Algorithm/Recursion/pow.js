/** Write a function that calculates x^y, where x is given as the base and y is given as the power.
 *
 * Example:
 * pow(2,4) => 2^4 = 16
 * Rational: 2 * 2 * 2 * 2 = 16
 *
 * Extension: Use recursion
 */

function pow(base, power) {
  // for a recursive approach remember to write your base case
  if (power === 0) return 1;
  // write your recursive logic here
  return base * pow(base, power - 1);
}

/**
 * Extension: Use recursion to solve the problem in O(n) time complexity -> Linear time complexity
 */

function powRecurse(base, power, result = 1) {
  // for a recursive approach remember to write your base case
  if (power === 0) return result;
  // write your recursive logic here
  return powRecurse(base, power - 1, result * base);
}
