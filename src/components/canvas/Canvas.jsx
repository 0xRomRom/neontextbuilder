import { useState, useEffect, useRef, useCallback } from "react";
import stl from "./Canvas.module.css";
import {
  colors as ColorsArray,
  fontFamilies,
  customfontWeights,
  desktopLineWidths,
  mobileLineWidths,
  customLetterSpacing,
  glowIntensity,
} from "../../utils/dataArrays";

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
  OUTLINE_FONT_COUNT,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [neonGlow, setNeonGlow] = useState(0.8);
  const [colorIndex, setColorIndex] = useState(0);
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

      const decreaseFont = fontFamilies[selectedFont] === "Melody";
      const calculatedFontSize = Math.max(
        containerWidth / currentText.length,
        10
      );
      if (decreaseFont) {
        // Set small for melody
        setFontSize(4.5);
        setZoom(2.5);
      } else {
        // Scale font size based on width and ensure a minimum size
        setFontSize(calculatedFontSize - 4);
      }
    }
  }, [currentText.length, selectedFont]);

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [currentText, containerRef, adjustFontSize]);

  return (
    <div className={stl.canvas} ref={containerRef}>
      <div className={stl.backgroundLightning}>
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
                selectedFont < OUTLINE_FONT_COUNT
                  ? "transparent"
                  : selectedColor !== "RGB"
                  ? ColorsArray[colorIndex]
                  : rgbColors[colorIndex],
              fontFamily: fontFamilies[selectedFont],
              WebkitTextStrokeColor: ColorsArray[colorIndex],
              WebkitTextStrokeWidth:
                window.innerWidth < 500
                  ? mobileLineWidths[selectedFont]
                  : desktopLineWidths[selectedFont],
              fontSize: `${fontSize}px`,
              textAlign: alignment,
              fontWeight: customfontWeights[selectedFont],
              letterSpacing: customLetterSpacing[selectedFont],
            }}
          >
            {currentText}
          </h2>
          <h2
            className={stl.ghostText}
            style={{
              color:
                selectedFont < OUTLINE_FONT_COUNT
                  ? "transparent"
                  : selectedColor !== "RGB"
                  ? ColorsArray[colorIndex]
                  : rgbColors[colorIndex],
              fontFamily: fontFamilies[selectedFont],
              WebkitTextStrokeColor: ColorsArray[colorIndex],
              WebkitTextStrokeWidth:
                window.innerWidth < 500
                  ? mobileLineWidths[selectedFont]
                  : desktopLineWidths[selectedFont],
              fontSize: `${fontSize}px`,
              opacity: neonGlow,
              textAlign: alignment,
              fontWeight: customfontWeights[selectedFont],
              letterSpacing: customLetterSpacing[selectedFont],
              filter: `blur(${glowIntensity[selectedFont]}rem)`,
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
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
              }}
            >
              {regel2}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
                filter: `blur(${glowIntensity[selectedFont]}rem)`,
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
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
              }}
            >
              {regel3}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
                filter: `blur(${glowIntensity[selectedFont]}rem)`,
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
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
              }}
            >
              {regel4}
            </h2>
            <h2
              className={stl.ghostText}
              style={{
                color:
                  selectedFont < OUTLINE_FONT_COUNT
                    ? "transparent"
                    : selectedColor !== "RGB"
                    ? ColorsArray[colorIndex]
                    : rgbColors[colorIndex],
                fontFamily: fontFamilies[selectedFont],
                WebkitTextStrokeColor: ColorsArray[colorIndex],
                WebkitTextStrokeWidth:
                  window.innerWidth < 500
                    ? mobileLineWidths[selectedFont]
                    : desktopLineWidths[selectedFont],
                fontSize: `${fontSize}px`,
                opacity: neonGlow,
                textAlign: alignment,
                fontWeight: customfontWeights[selectedFont],
                letterSpacing: customLetterSpacing[selectedFont],
                filter: `blur(${glowIntensity[selectedFont]}rem)`,
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
