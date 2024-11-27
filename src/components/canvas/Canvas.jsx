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
  backPlateShape,
  mountingMethod,
  customLength,
}) => {
  const [bgOpacity, setBgOpacity] = useState("0.7");
  const [neonGlow, setNeonGlow] = useState(15.5);

  return (
    <div className={stl.canvas}>
      <div className={stl.backgroundLightning}>
        <span>Dim NEON</span>
        <input
          type="range"
          min="0"
          max="25"
          step="0.25"
          onInput={(e) => setNeonGlow(e.target.value)}
          value={neonGlow}
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
        className={`${stl.textCol} ${
          mountingMethod === "Afstandhouders" && backPanelColor === "Zwart"
            ? stl.backdrop
            : ""
        }`}
      >
        {mountingMethod === "Afstandhouders" && backPanelColor === "Zwart" && (
          <div className={stl.displayerBox}>
            <div className={stl.topleft}></div>
            <div className={stl.bottomleft}></div>
            <div className={stl.topRight}></div>
            <div className={stl.bottomRight}></div>
          </div>
        )}
        {mountingMethod === "Ketting" && backPanelColor === "Zwart" && (
          <div className={stl.displayerBox}>
            <img
              src="../images/Chain.png"
              alt="Chain"
              className={stl.leftChain}
            />
            <img
              src="../images/Chain.png"
              alt="Chain"
              className={stl.rightChain}
            />
          </div>
        )}
        {mountingMethod === "Railmontage" && backPanelColor === "Zwart" && (
          <div
            className={stl.displayerBox}
            style={{
              overflow: mountingMethod === "Railmontage" ? "hidden" : "",
            }}
          >
            <img src="../images/Rail.png" alt="Rail" className={stl.leftRail} />
            <img
              src="../images/Rail.png"
              alt="Rail"
              className={stl.rightRail}
            />
          </div>
        )}
        <div
          className={`${stl.innerColWrap} ${
            mountingMethod === "Afstandhouders" && backPanelColor === "Zwart"
              ? stl.displacer
              : ""
          }`}
          style={{
            backgroundColor:
              backPanelColor === "Zwart"
                ? (mountingMethod === "Afstandhouders" &&
                    backPanelColor === "Zwart") ||
                  (mountingMethod === "Railmontage" &&
                    backPanelColor === "Zwart")
                  ? "rgba(0, 0, 0, 0.65)"
                  : "black"
                : "",
            borderRadius: backPlateShape === "Contour" ? "1rem" : "",
          }}
        >
          <h1
            className={`${stl.mainText} ${
              selectedColor === "RGB" ? stl.rgb : ""
            }`}
            style={{
              color: selectedColor,
              textShadow: `0px 0px ${neonGlow}px ${selectedColor}`,
              fontFamily: selectedFont,
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
