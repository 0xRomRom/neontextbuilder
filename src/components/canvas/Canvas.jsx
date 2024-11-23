import { useState } from "react";
import stl from "./Canvas.module.css";

const Canvas = ({ currentText, selectedColor, backgroundImage }) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  return (
    <div className={stl.canvas}>
      <div className={stl.backgroundLightning}>
        <span>Dim Achtergrond</span>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.1"
          onInput={(e) => setBgOpacity(e.target.value)}
          value={bgOpacity}
        />
      </div>
      <h1
        className={stl.mainText}
        style={{
          color: selectedColor,
          textShadow: `0px 0px 20px ${selectedColor}`,
        }}
      >
        {currentText}
      </h1>
      <img
        src={backgroundImage}
        alt="Background"
        className={stl.bgImg}
        style={{
          opacity: bgOpacity,
        }}
      />
    </div>
  );
};

export default Canvas;
