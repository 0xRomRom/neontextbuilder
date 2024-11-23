import React, { useState } from "react";
import stl from "./Config.module.css";
import { BiText } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#8E44AD",
  "#E74C3C",
  "#1ABC9C",
  "#2ECC71",
  "#3498DB",
  "#9B59B6",
  "#34495E",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AF",
];

const Config = ({
  currentText,
  setCurrentText,
  selectedColor,
  setSelectedColor,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={stl.config}>
      <div className={stl.box}>
        <span className={stl.title} onClick={() => setActiveTab(0)}>
          <BiText className={stl.icon} />
          Text
        </span>
        {activeTab === 0 && (
          <div className={stl.content}>
            <input
              type="text"
              placeholder="Voer uw text in"
              className={stl.textInput}
              value={currentText}
              onInput={(e) => setCurrentText(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className={stl.box}>
        <span className={stl.title} onClick={() => setActiveTab(1)}>
          <IoColorPaletteOutline className={stl.icon} />
          Kleur
        </span>
        {activeTab === 1 && (
          <div className={stl.content}>
            <div className={stl.colorGrid}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`${stl.outerDiv} ${
                    selectedColor === color ? stl.selected : ""
                  }`}
                >
                  <div
                    className={stl.colorBox}
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
