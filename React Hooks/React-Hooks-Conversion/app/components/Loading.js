import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default function Loading({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = useState(text);
  const interval = useRef(null);
  useEffect(() => {
    interval.current = window.setInterval(() => {
      setContent((content) =>
        content === text + '...' ? text : `${content}.`
      );

      //This approach below is incorrect, since setState is async function => content === text + '...' will always be evaluated way before setContent be completed => we will not get the behavior of repating ., .., ... that we want.
      // content === text + '...'
      //   ? setContent(text)
      //   : setContent((content) => content + '.');
    }, speed);
    return () => window.clearInterval(interval.current);
  }, [text, speed]);
  return <p style={styles.content}>{content}</p>;
}
