import React, { useEffect, useRef, useState } from "react";
import { useRenderer } from "./useRenderer";

import "./Viewport.css";

interface Props {
  image: HTMLImageElement;
}

export const Viewport = ({ image }: Props) => {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const viewportRef = useRenderer(image);

  return <div className="viewport" ref={viewportRef}></div>;
};
