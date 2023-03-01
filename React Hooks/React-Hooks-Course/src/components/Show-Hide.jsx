import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    Given the array of "posts", recreate the functionality for this app.
    By default, each post preview is cut off until the user clicks "Open".
    Only one post can be "Open" at a time.
*/

function ShowHide({ posts }) {
  const [openIndex, setOpenIndex] = useState(0);
  const handleOpenClick = (i) => {
    setOpenIndex(i);
  };

  return (
    <div>
      <ul>
        {posts.map(({ id, img, text }, i) => {
          const isOpen = i === openIndex;
          const textToShow = isOpen ? text : text.substring(0, 100) + '...';
          return (
            <li>
              <div
                style={{
                  width: 1200,
                  border: isOpen ? '1px solid black' : 'none',
                }}
              >
                <img src={img} alt="" />
                <p>{textToShow}</p>
                <button onClick={() => handleOpenClick(i)}>open</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ShowHide;
