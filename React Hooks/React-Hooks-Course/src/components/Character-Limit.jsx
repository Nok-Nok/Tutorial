import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    Assume you're creating an app that allows the user to
    post status updates (ala Twitter). Your UI should have a
    textarea and a button. The button should be disabled if the
    length of the textarea is 0 or greater than 240 characters.
    The document's title should inform the user on how many
    characters they have left to type before they hit the 240
    character limit - "115 characters left."
*/

function CharacterLimit() {
  const [input, setInput] = useState('');
  useEffect(() => {
    document.title = `${240 - input.length} characters left.`;
  }, [input]);
  return (
    <div className="CharacterLimit">
      <input
        type="text"
        placeholder="Type Here"
        onChange={(e) => setInput(e.target.value)}
      />
      <button disabled={input.length === 0 || input.length > 240}>Send</button>
    </div>
  );
}
export default CharacterLimit;
