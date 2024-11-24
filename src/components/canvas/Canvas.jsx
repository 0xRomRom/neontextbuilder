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
