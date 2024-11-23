import stl from "./LedKind.module.css";
import { useState } from "react";
import VideoPlayer from "../videoplayer/VideoPlayer";
import { useEffect } from "react";

const LedKind = ({
  setLedType,
  setProgressState,
  selectedColor,
  setSelectedColor,
  progressState,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setLedType(event.target.value);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const setSelectedColors = (newColor) => {
    if (selectedColor.includes(newColor)) {
      setSelectedColor((prevValues) =>
        prevValues.filter((value) => value !== newColor)
      );
      return;
    }

    if (selectedColor.includes("Kleuren zoals je logo")) {
      // Remove "Kleuren zoals je logo" from the array
      setSelectedColor((prevValues) =>
        prevValues.filter((value) => value !== "Kleuren zoals je logo")
      );
    }

    if (newColor === "Kleuren zoals je logo" || selectedColor.includes(newColor)) {
      // If "Kleuren zoals je logo" is selected or the new color is already in the array, set it as the only selected color
      setSelectedColor([newColor]);
    } else {
      // Add the new color to the array
      setSelectedColor((prevValues) => [...prevValues, newColor]);
    }
  };

  useEffect(() => {
    if (selectedValue === "Single color" && selectedColor.length === 0) {
      setProgressState(4);
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    if (progressState >= 6) {
      return;
    }
    if (selectedValue === "RGB") {
      setProgressState(5);
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (progressState === 4) {
      window.scrollTo(0, document.body.scrollHeight);
      if (selectedColor.length > 0) {
        setProgressState(5);
      }
    }
  }, [selectedColor, selectedValue, progressState, setProgressState]);

  const colors = [
    {
      name: "Kleuren zoals je logo",
      bgColor: "rgb(197, 197, 197)",
      boxShadowColor: "rgb(197, 197, 197)",
    },
    { name: "Wit", bgColor: "white", boxShadowColor: "white" },
    {
      name: "Warm wit",
      bgColor: "rgb(244,223,133)",
      boxShadowColor: "rgb(244,223,133)",
    },
    {
      name: "Licht geel",
      bgColor: "rgb(252,251,32)",
      boxShadowColor: "rgb(252,251,32)",
    },
    {
      name: "Donker geel",
      bgColor: "rgb(249,198,2)",
      boxShadowColor: "rgb(249,198,2)",
    },
    {
      name: "Oranje",
      bgColor: "rgb(251,93,24)",
      boxShadowColor: "rgb(251,93,24)",
    },
    { name: "Rood", bgColor: "rgb(253,1,0)", boxShadowColor: "rgb(253,1,0)" },
    {
      name: "Groen",
      bgColor: "rgb(11,236,92)",
      boxShadowColor: "rgb(11,236,92)",
    },
    {
      name: "Blauw",
      bgColor: "rgb(34,34,228)",
      boxShadowColor: "rgb(34,34,228)",
    },
    {
      name: "Licht blauw",
      bgColor: "rgb(56,200,253)",
      boxShadowColor: "rgb(56,200,253)",
    },
    {
      name: "Roze",
      bgColor: "rgb(246,8,246)",
      boxShadowColor: "rgb(246,8,246)",
    },
    {
      name: "Paars",
      bgColor: "rgb(107,49,209)",
      boxShadowColor: "rgb(107,49,209)",
    },
  ];

  return (
    <div
      className={`${stl.longestRow} ${
        selectedColor.length > 0 || selectedValue === "RGB" ? stl.checked : ""
      }`}
    >
      {!selectedValue !== "RGB" && (
        <div className={stl.videoWrapper}>
          <VideoPlayer videoID={"Io194T5VC2w"} />
        </div>
      )}
      {selectedValue === "Single color" && (
        <>
          <h2 className={stl.kiesKleur}>Kies de kleur(en)</h2>
          <div className={stl.colorboxWrapper}>
            {colors.map((color, index) => (
              <button
                key={index}
                className={stl.colorBox}
                onClick={() => setSelectedColors(color.name)}
                style={{
                  border: selectedColor.includes(color.name)
                    ? "2px solid rgba(255, 5, 255, 0.3)"
                    : "2px solid transparent",
                  backgroundColor: selectedColor.includes(color.name)
                    ? "rgba(255, 5, 255, 0.15)"
                    : "",
                }}
              >
                <div
                  className={stl.kleurPreview}
                  style={{
                    backgroundColor: color.bgColor,
                    boxShadow: `0px 0px 20px ${color.boxShadowColor}`,
                  }}
                ></div>
                <span
                  className={stl.kleurTitle}
                  style={{
                    color: color.bgColor,
                    textShadow: `0px 0px 10px ${color.boxShadowColor}`,
                  }}
                >
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      <h3 className={stl.hero}>
        Soort
        <span
          className={`${stl.pink} ${selectedValue === "RGB" ? stl.rgb : ""}`}
        >
          {" "}
          LED
        </span>
      </h3>
      <select
        className={stl.longestSelect}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="" default disabled>
          Kies kleurtype
        </option>
        <option value="Single color">Single color (Vaste kleuren)</option>
        <option value="RGB">RGB € +40% (Verstelbare kleur)</option>
      </select>
    </div>
  );
};
export default LedKind;
