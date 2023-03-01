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

export default function Loading({ text, speed }) {
  const [content, setContent] = useState(text);
  const interval = useRef(null);
  useEffect(() => {
    window.clearInterval(interval.current);
    interval.current = window.setInterval(() => {
      content === text + '...'
        ? setContent(text)
        : setContent((content) => content + '.');
    }, speed);
    return () => window.clearInterval(interval.current);
  }, [content]);
  return <p style={styles.content}>{content}</p>;
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};
