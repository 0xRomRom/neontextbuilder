import { useEffect, useRef, useState } from "react";
import stl from "./Config.module.css";
import { BiText } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { colors, backgrounds } from "../../utils/dataArrays";

const Config = ({
  currentText,
  setCurrentText,
  selectedColor,
  setSelectedColor,
  setBackgroundImage,
  backgroundImage,
}) => {
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (activeTab === 0) {
      inputRef?.current?.focus();
    }
  }, [activeTab]);

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
              ref={inputRef}
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

      <div className={stl.box}>
        <span className={stl.title} onClick={() => setActiveTab(2)}>
          <IoColorPaletteOutline className={stl.icon} />
          Achtergrond
        </span>
        {activeTab === 2 && (
          <div className={stl.content}>
            <div className={stl.colorGrid}>
              {backgrounds.map((background, index) => (
                <div
                  key={index}
                  onClick={() => setBackgroundImage(background)}
                  className={`${stl.bgDiv} ${
                    backgroundImage === background ? stl.selectedBg : ""
                  }`}
                  style={{
                    backgroundImage: `url(${background})`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
