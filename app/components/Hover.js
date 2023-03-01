import React, { useCallback, useState } from 'react';

export default function useHover() {
  const [hovering, setHovering] = useState(false);
  const onMouseOver = useCallback(() => setHovering(true));
  const onMouseOut = useCallback(() => setHovering(false));
  const attrs = {
    onMouseOver,
    onMouseOut,
  };

  return [hovering, attrs];
}
