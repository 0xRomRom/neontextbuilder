import { useState, useEffect } from "react";
import stl from "./Canvas.module.css";
import {
  colors as ColorsArray,
  maxChars,
  fontFamilies,
} from "../../utils/dataArrays";

const Canvas = ({
  currentText,
  selectedColor,
  backgroundImage,
  customBg,
  selectedFont,
  finalPrice,
  customLength,
  textLength,
  alignment,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [neonGlow, setNeonGlow] = useState(15.5);
  const [colorIndex, setColorIndex] = useState(0);
  const [rgbSpeed, setRgbSpeed] = useState(500);
  const [zoom, setZoom] = useState(2.3);

  const rgbColors = ["red", "orange", "yellow", "green", "cyan", "magenta"];
  useEffect(() => {
    if (selectedColor !== "RGB") {
      return;
    }
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % rgbColors.length);
    }, rgbSpeed);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [rgbSpeed, selectedColor]);

  useEffect(() => {
    const index = ColorsArray.indexOf(selectedColor);
    setColorIndex(index);
  }, [selectedColor]);

  return (
    <div className={stl.canvas}>
      <div className={stl.backgroundLightning}>
        {selectedColor === "RGB" && (
          <>
            <span>RGB Snelheid</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              onInput={(e) => setRgbSpeed(e.target.value)}
              value={rgbSpeed}
            />
          </>
        )}
        <span>Zoom</span>
        <input
          type="range"
          min="0.2"
          max="3"
          step="0.1"
          onInput={(e) => setZoom(e.target.value)}
          value={zoom}
        />
        {selectedColor !== "RGB" && selectedFont > 4 && (
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
            className={`${stl.mainText} ${selectedFont < 5 ? stl.outline : ""}`}
            style={{
              color:
                selectedColor !== "RGB"
                  ? ColorsArray[colorIndex]
                  : rgbColors[colorIndex],
              textShadow:
                selectedFont < 5
                  ? `0px 0px 25px ${ColorsArray[colorIndex]}`
                  : `0px 0px ${neonGlow}px ${rgbColors[colorIndex]}`,
              fontFamily: fontFamilies[selectedFont],
              WebkitTextStrokeWidth: selectedFont < 5 ? "2px" : "0px",
              WebkitTextStrokeColor:
                selectedFont < 5 ? ColorsArray[colorIndex] : "transparent",
              fontSize: fontFamilies[selectedFont] === "Melody" ? "0.55vw" : "",
              transform: `scale(${zoom})`,
              lineHeight: `${zoom * 25}px`,
              textAlign: alignment,
            }}
          >
            {currentText.slice(0, maxChars[customLength])}
          </h1>
          {textLength > maxChars[customLength] && (
            <h2
              className={`${stl.mainText2} ${
                selectedFont < 5 ? stl.outline : ""
              }`}
              style={{
                color:
                  selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                textShadow:
                  selectedFont < 5
                    ? `0px 0px 25px ${ColorsArray[colorIndex]}`
                    : `0px 0px ${neonGlow}px ${rgbColors[colorIndex]}`,
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeWidth: selectedFont < 5 ? "2px" : "0px",
                WebkitTextStrokeColor:
                  selectedFont < 5 ? ColorsArray[colorIndex] : "transparent",
                fontSize:
                  fontFamilies[selectedFont] === "Melody" ? "0.55vw" : "",
                transform: `scale(${zoom})`,
                lineHeight: `${zoom * 25}px`,
                textAlign: alignment,
              }}
            >
              {currentText.slice(
                maxChars[customLength],
                maxChars[customLength] * 2
              )}
            </h2>
          )}
          {textLength > maxChars[customLength] * 2 && (
            <h2
              className={`${stl.mainText2} ${
                selectedFont < 5 ? stl.outline : ""
              }`}
              style={{
                color:
                  selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                textShadow:
                  selectedFont < 5
                    ? `0px 0px 25px ${ColorsArray[colorIndex]}`
                    : `0px 0px ${neonGlow}px ${rgbColors[colorIndex]}`,
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeWidth: selectedFont < 5 ? "2px" : "0px",
                WebkitTextStrokeColor:
                  selectedFont < 5 ? ColorsArray[colorIndex] : "transparent",
                fontSize:
                  fontFamilies[selectedFont] === "Melody" ? "0.55vw" : "",
                transform: `scale(${zoom})`,
                lineHeight: `${zoom * 25}px`,
                textAlign: alignment,
              }}
            >
              {currentText.slice(
                maxChars[customLength] * 2,
                maxChars[customLength] * 3
              )}
            </h2>
          )}
          {textLength > maxChars[customLength] * 3 && (
            <h2
              className={`${stl.mainText2} ${
                selectedFont < 5 ? stl.outline : ""
              }`}
              style={{
                color:
                  selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                textShadow:
                  selectedFont < 5
                    ? `0px 0px 25px ${ColorsArray[colorIndex]}`
                    : `0px 0px ${neonGlow}px ${rgbColors[colorIndex]}`,
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeWidth: selectedFont < 5 ? "2px" : "0px",
                WebkitTextStrokeColor:
                  selectedFont < 5 ? ColorsArray[colorIndex] : "transparent",
                fontSize:
                  fontFamilies[selectedFont] === "Melody" ? "0.55vw" : "",
                transform: `scale(${zoom})`,
                lineHeight: `${zoom * 25}px`,
                textAlign: alignment,
              }}
            >
              {currentText.slice(
                maxChars[customLength] * 3,
                maxChars[customLength] * 4
              )}
            </h2>
          )}
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
