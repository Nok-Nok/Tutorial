/*

Write a function that returns an array containing the numbers 1 to NUM.

Put "fizz" in place of numbers divisible by 3 but not by 5,
"buzz" in place of numbers divisible by 5 but not by 3,
and "fizzbuzz" in place of numbers divisible by both 3 and 5.

fizzbuzz(16);
-> [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz',
11, 'fizz', 13, 14, 'fizzbuzz', 16]

*/

const fizzbuzz = (num) => {
  return new Array(num).fill(0).map((_, i) => {
    const val = i + 1;
    return (val % 3 ? '' : 'fizz') + (val % 5 ? '' : 'buzz') || val;
  });
};
/*
  
  Extension: 
  Write a function that returns an array containing the numbers 1 to NUM.
  
  Put "fizz" in place of numbers divisible by 3 but not by 5 or 7,
  "buzz" in place of numbers divisible by 5 but not by 3 or 7,
  "bazz" in place of numbers divisible by 7 but not by 3 or 5,
  "fizzbuzz" in place of numbers divisible by 3 and 5 but not 7,
  "fizzbazz" in place of numbers divisible by 3 and 7 but not 5,
  "buzzbazz" in place of numbers divisible by 5 and 7 but not 3,
  and "fizzbuzzbazz" in place of numbers divisible by 3, 5, and 7.
  
  fizzbuzzbazz(25);
  -> [1, 2, 'fizz', 4, 'buzz', 'fizz', 'bazz', 8, 'fizz', 'buzz',
  11, 'fizz', 13, 'bazz', 'fizzbuzz', 16, 17, 'fizz', 19, 'buzz', 'fizzbazz', 22,
  23, 'fizz', 'buzz']
  
  */

const fizzbuzzbazz = (num) => {
  return new Array(num).fill(0).map((_, i) => {
    const val = i + 1;
    return (
      (val % 3 ? '' : 'fizz') +
        (val % 5 ? '' : 'buzz') +
        (val % 7 ? '' : 'bazz') || val
    );
  });
};

