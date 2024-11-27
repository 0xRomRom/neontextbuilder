import { useState } from "react";
import stl from "./Canvas.module.css";

const Canvas = ({
  currentText,
  selectedColor,
  backgroundImage,
  customBg,
  selectedFont,
  finalPrice,
  fontFamilies,
  customLength,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [neonGlow, setNeonGlow] = useState(15.5);

  return (
    <div className={stl.canvas}>
      <div className={stl.backgroundLightning}>
        {selectedColor !== "RGB" && (
          <>
            <span>Dim NEON</span>
            <input
              type="range"
              min="0"
              max="25"
              step="0.25"
              onInput={(e) => setNeonGlow(e.target.value)}
              value={neonGlow}
            />
          </>
        )}
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
        <span>Prijs €{finalPrice},-</span>
        <span>Exclusief BTW.</span>
        <span>Lengte: {customLength}CM</span>
      </div>
      <div className={stl.textCol}>
        <div className={stl.innerColWrap}>
          <h1
            className={`${stl.mainText} ${
              selectedColor === "RGB" ? stl.rgb : ""
            }`}
            style={{
              color: selectedColor,
              textShadow: `0px 0px ${neonGlow}px ${selectedColor}`,
              fontFamily: fontFamilies[selectedFont],
            }}
          >
            {currentText}
          </h1>
        </div>
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
