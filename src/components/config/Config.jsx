import { useEffect, useRef, useState } from "react";
import stl from "./Config.module.css";
import { BiText } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { colors, backgrounds, fontFamilies } from "../../utils/dataArrays";
import { ImFontSize } from "react-icons/im";
import { FaRulerVertical } from "react-icons/fa";

const Config = ({
  currentText,
  setCurrentText,
  selectedColor,
  setSelectedColor,
  setBackgroundImage,
  backgroundImage,
  setCustomBg,
  customBg,
  selectedFont,
  setSelectedFont,
  customLength,
  setCustomLength,
}) => {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (activeTab === 0) {
      inputRef?.current?.focus();
    }
  }, [activeTab]);

  const uploadImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomBg(reader.result);
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={stl.config}>
      <div className={`${stl.box} ${activeTab === 0 ? stl.activeBg : ""}`}>
        <span
          className={stl.title}
          onClick={() => setActiveTab(activeTab === 0 ? "" : 0)}
        >
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

      <div className={`${stl.box} ${activeTab === 1 ? stl.activeBg : ""}`}>
        <span
          className={stl.title}
          onClick={() => setActiveTab(activeTab === 1 ? "" : 1)}
        >
          <ImFontSize className={stl.icon} />
          Lettertype
        </span>
        {activeTab === 1 && (
          <div className={stl.content}>
            <div className={stl.fontGrid}>
              {fontFamilies.map((font, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFont(font)}
                  className={`${stl.fontDiv} ${
                    selectedFont === font ? stl.activeFont : ""
                  }`}
                >
                  <span
                    style={{
                      fontFamily: font,
                    }}
                  >
                    {font}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`${stl.box} ${activeTab === 2 ? stl.activeBg : ""}`}>
        <span
          className={stl.title}
          onClick={() => setActiveTab(activeTab === 2 ? "" : 2)}
        >
          <IoColorPaletteOutline className={stl.icon} />
          Kleur
        </span>
        {activeTab === 2 && (
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

      <div className={`${stl.box} ${activeTab === 3 ? stl.activeBg : ""}`}>
        <span
          className={stl.title}
          onClick={() => setActiveTab(activeTab === 3 ? "" : 3)}
        >
          <IoColorPaletteOutline className={stl.icon} />
          Achtergrond
        </span>
        {activeTab === 3 && (
          <div className={stl.content}>
            <div className={stl.bgGrid}>
              {backgrounds.map((background, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setBackgroundImage(background);
                    setCustomBg("");
                    if (index === backgrounds.length - 1) {
                      uploadImage();
                    }
                  }}
                  className={`${stl.bgDiv} ${
                    backgroundImage === background ? stl.selectedBg : ""
                  }`}
                  style={{
                    backgroundImage: `url(${
                      index !== backgrounds.length - 1 ? background : customBg
                    })`,
                    border:
                      index === backgrounds.length - 1
                        ? "1px solid rgb(134, 0, 134)"
                        : "",
                  }}
                >
                  {index === backgrounds.length - 1 && <span>Upload Foto</span>}
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      <div className={`${stl.box} ${activeTab === 4 ? stl.activeBg : ""}`}>
        <span
          className={stl.title}
          onClick={() => setActiveTab(activeTab === 4 ? "" : 4)}
        >
          <FaRulerVertical className={stl.icon} />
          Breedte
        </span>
        {activeTab === 4 && (
          <div className={stl.lengthBox}>
            <input
              type="range"
              min="60"
              max="240"
              step="20"
              value={customLength}
              onChange={(e) => setCustomLength(e.target.value)}
              className={stl.rangeInput}
            />
            <span className={stl.rangeValue}>{customLength}CM</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
