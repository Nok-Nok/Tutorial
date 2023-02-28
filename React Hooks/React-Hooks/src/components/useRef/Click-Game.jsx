import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    You're building an app to see how many times you can click
    a button in 10 seconds.

    The UI has three parts, a button, a timer counting down from 10,
    and a count of how many times you've clicked the button.

    Once the timer reaches 0, remove the button from the UI.
*/

function CounterGame() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const id = useRef();
  const clear = () => clearInterval(id.current);
  //Reduce time:
  useEffect(() => {
    id.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return clear;
  }, []);

  //Clear the setInterval timer
  useEffect(() => {
    if (!timeLeft) clear();
  }, [timeLeft]);
  return (
    <div className="App">
      <h1>{count}</h1>
      <h3>{`Time left: ${timeLeft} seconds`}</h3>
      {timeLeft ? (
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      ) : null}
    </div>
  );
}

export default CounterGame;
