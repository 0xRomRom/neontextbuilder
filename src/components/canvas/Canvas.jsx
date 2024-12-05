import { useState, useEffect, useRef, useCallback } from "react";
import stl from "./Canvas.module.css";
import { colors as ColorsArray, fontFamilies } from "../../utils/dataArrays";

const Canvas = ({
  currentText,
  selectedColor,
  backgroundImage,
  customBg,
  selectedFont,
  finalPrice,
  customLength,
  alignment,
  lineAmount,
  regel2,
  regel3,
  regel4,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [neonGlow, setNeonGlow] = useState(0.8);
  const [colorIndex, setColorIndex] = useState(0);
  // const [rgbSpeed, setRgbSpeed] = useState(500);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(1);

  const rgbColors = ["red", "green", "yellow", "orange", "cyan", "purple"];
  useEffect(() => {
    if (selectedColor === "RGB") {
      const interval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % rgbColors.length);
      }, 500);
      return () => clearInterval(interval); // Cleanup interval
    } else {
      const index = ColorsArray.indexOf(selectedColor);
      setColorIndex(index);
    }
  }, [selectedColor, rgbColors.length]);

  const adjustFontSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const calculatedFontSize = Math.max(
        containerWidth / currentText.length,
        10
      ); // Scale font size based on width and ensure a minimum size
      setFontSize(calculatedFontSize);
    }
  }, [currentText.length]);

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [currentText, containerRef, adjustFontSize]);

  return (
    <div className={stl.canvas} ref={containerRef}>
      <div className={stl.backgroundLightning}>
        {/* {selectedColor === "RGB" && (
          <>
            <span>RGB Snelheid</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="10"
              onInput={(e) => setRgbSpeed(e.target.value)}
              value={rgbSpeed}
            />
          </>
        )} */}
        {selectedColor !== "RGB" && (
          <>
            <span>Dim NEON</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              onInput={(e) => setNeonGlow(e.target.value)}
              value={neonGlow}
            />
          </>
        )}
        <span>Zoom</span>
        <input
          type="range"
          min="0.1"
          max="6"
          step="0.1"
          onInput={(e) => setZoom(e.target.value)}
          value={zoom}
        />
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

      <div
        className={stl.innerColWrap}
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <div className={stl.textWrap}>
          <h2
            className={stl.mainText}
            style={{
              color:
                selectedFont < 5
                  ? "transparent"
                  : selectedColor !== "RGB"
                  ? ColorsArray[colorIndex]
                  : rgbColors[colorIndex],
              fontFamily: fontFamilies[selectedFont],
              WebkitTextStrokeColor: ColorsArray[colorIndex],
              WebkitTextStrokeWidth: window.innerWidth < 500 ? "0.5px" : "1px",
              fontSize: `${fontSize}px`,
              textAlign: alignment,
            }}
          >
            {currentText}
          </h2>
          <h2
            className={stl.ghostText}
            style={{
              color:
                selectedFont < 5
                  ? "transparent"
                  : selectedColor !== "RGB"
                  ? ColorsArray[colorIndex]
                  : rgbColors[colorIndex],
              fontFamily: fontFamilies[selectedFont],
              WebkitTextStrokeColor: ColorsArray[colorIndex],
              WebkitTextStrokeWidth: window.innerWidth < 500 ? "0.5px" : "1px",
              fontSize: `${fontSize}px`,
              opacity: neonGlow,
              textAlign: alignment,
            }}
          >
            {currentText}
          </h2>
        </div>

        {lineAmount > 1 && (
          <div className={stl.textWrap}>
            <h2
              className={stl.mainText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                textAlign: alignment,
              }}
            >
              {regel2}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
              }}
            >
              {regel2}
            </h2>
          </div>
        )}
        {lineAmount > 2 && (
          <div className={stl.textWrap}>
            <h2
              className={stl.mainText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                textAlign: alignment,
              }}
            >
              {regel3}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
              }}
            >
              {regel3}
            </h2>
          </div>
        )}
        {lineAmount > 3 && (
          <div className={stl.textWrap}>
            <h2
              className={stl.mainText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                textAlign: alignment,
              }}
            >
              {regel4}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < 5
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500 ? "0.5px" : "1px",
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
              }}
            >
              {regel4}
            </h2>
          </div>
        )}
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
