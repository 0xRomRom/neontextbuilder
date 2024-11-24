import { useState } from "react";
import stl from "./Canvas.module.css";

const Canvas = ({
  currentText,
  selectedColor,
  backgroundImage,
  customBg,
  selectedFont,
  finalPrice,
  backPanelColor,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");

  return (
    <div className={stl.canvas}>
      <div className={stl.backgroundLightning}>
        <span>Dim Achtergrond</span>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.01"
          onInput={(e) => setBgOpacity(e.target.value)}
          value={bgOpacity}
        />
      </div>
      <div className={stl.endPrice}>
        <span>Totaal Prijs €{finalPrice},-</span>
      </div>
      <div
        className={stl.textCol}
        style={{
          backgroundColor: backPanelColor === "Zwart" ? "black" : "",
        }}
      >
        <h1
          className={stl.mainText}
          style={{
            color: selectedColor,
            textShadow: `0px 0px 20px ${selectedColor}`,
            fontFamily: selectedFont,
          }}
        >
          {currentText}
        </h1>
      </div>
      <img
        src={customBg || backgroundImage}
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
