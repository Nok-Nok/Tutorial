import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    You'll notice below that we have a Wait component.
    The purpose of Wait is to render the `ui` prop after
    `delay` seconds. Before `delay` seconds, it should
    render `placeholder`.
*/

function Wait({ delay = 1000, placeholder, ui }) {
  //Render placeholder
  const [text, setText] = useState(placeholder);

  //Set time out then reder ui
  useEffect(() => {
    const id = setTimeout(() => setText(ui), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return text;
}

function WaitDelay() {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

export default WaitDelay;
