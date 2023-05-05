// throttle - each activation is a prompt to call as soon as you can.

/*

Write a function that takes in a function (without parameters) and a time
interval (in ms), and returns the *throttled* version of the function.

The throttled version of the function works in the following way. Throttling
enforces a maximum number of times a function can be called over time. For example,
"execute this function at most once every 100 milliseconds."

--------------------------------------------------------------------------------

The following analogy helps in understanding throttle:

Imagine yourself as a child at a birthday party that wants a piece of birthday cake.
Your mom is happy to give you a slice if you ask, but once you receive it, you cannot
have another piece for at least one hour. 

So you ask your mom, and to your delight, you get a piece of cake! You finish it in 
one big bite and immediately ask your mom for another slice of cake. She reminds you 
that you'll have to wait an hour, and the moment an hour passes she will give you a 
piece. 

You ask again and again over the next hour, but your mom stays strong and will not 
budge. The moment an hour has gone by, she hands you the piece of cake you've been 
pestering about and you start eating.

In the above analogy, think of asking for cake as triggering an event such as a button 
click, and receiving cake as invoking the attached functionality within that event. 
Throttling is a technique in which, no matter how many times the user fires the event, 
the attached function will be executed only once in a given time interval.


--------------------------------------------------------------------------------

HINT: consider the following example. Imagine the "no cake" time interval is
1000ms, and that the throttled function is called at time t = 0ms, 10ms, 20ms.

The first call at t = 0ms gets you cake and starts the "no cake" time interval. 
The second call at t = 10ms makes a request for cake. The third call at t = 20ms 
does nothing. Then, at t = 1000ms the "no cake" period is over and so the (requested) 
cake gets served. Thus, we have cake at t = 0ms and t = 1000ms.

Consider another example. Again, imagine the "no cake" time interval is 1000ms, 
but this time the throttled function is called at time t = 0ms, 1500ms.

The first call at t = 0ms gets you cake and starts the "no cake" time interval. 
Then, at t = 1000ms the "no cake" period is over, but you haven't asked for another
slice of cake so you don't receive any. Then the second call at t = 1500ms gets you 
cake and starts the "no cake" period again. Thus, we have cake at t = 0ms and t = 1500ms.

--------------------------------------------------------------------------------

HINT: make a helper sub-function that allows you to receive cake. 
See http://emn178.github.io/js-throttle-debounce/samples/demo/ for a visual demo of throttle. 

Note that the practical application of throttle in real-life web development is
to lessen the rate at which a function can be repeatedly called (whether the
function be from a button click, scroll, window resize and result in API calls
or browser reflows or not etc). You can read more about this (and the difference between 
throttle and debounce) here: https://tomekdev.com/posts/throttle-vs-debounce-on-real-examples

*/

const throttle = (f, t) => {
  // Initialize a flag to determine if specific time has passed
  let isReady = true;
  // Initialize a variable to track if there is any function in the queue
  let isInQueue = true;

  // This function get invoked t-ms after the funcition is invoked
  function delayIsReady() {
    // Set isReady to True
    isReady = true;
    // If there is a request in queue, invoke the function update isReady and isInqueue flag
    if (isInQueue) {
      f();
      isReady = false;
      isInQueue = false;
      // Delay to set isReady to true for t-ms
      setTimeout(delayIsReady, t);
    }
  }
  return () => {
    // If Time has not passed, set isInQueue to true since there is a request in queue
    if (!isReady) {
      isInQueue = true;
      return;
    }
    // Else if Time has passed, invoke the function update isReady and isInqueue flag
    f();
    isReady = false;
    isInQueue = false;
    // Delay to set isReady to true for t-ms
    setTimeout(delayIsReady, t);
  };
};

