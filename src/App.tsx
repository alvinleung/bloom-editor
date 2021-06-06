import React, { useState } from "react";
import { Viewport } from "./components/Viewport/Viewport";

import "./App.css";
import { useFileDrop } from "./hook/useFileDrop";

export default function App() {
  const [currentImage, setCurrentImage] = useState<HTMLImageElement>();

  const handleFileDrop = async (file: File) => {
    // process the file here
    let reader = new FileReader();
    reader.readAsDataURL(file);

    // finish processing the file
    reader.onloadend = () => {
      let img = document.createElement("img");
      img.src = reader.result as string;
      setCurrentImage(img);
    };
  };
  const dropAreaRef = useFileDrop(["image/png", "image/jpeg"], handleFileDrop);

  return (
    <div ref={dropAreaRef}>
      <Viewport image={currentImage} />
    </div>
  );
}
