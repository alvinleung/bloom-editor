import React, { useEffect, useRef, useState } from "react";

import "./Viewport.css";

interface Props {}

export const Viewport = (props: Props) => {
  const viewportRef = useRef<HTMLDivElement>();

  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const boundingBox = viewportRef.current.getBoundingClientRect();
    setViewportWidth(boundingBox.width * window.devicePixelRatio);
    setViewportHeight(boundingBox.height * window.devicePixelRatio);
  }, []);

  return (
    <div className="viewport" ref={viewportRef}>
      <canvas
        className="viewport__canvas"
        width={viewportWidth}
        height={viewportHeight}
      />
    </div>
  );
};
