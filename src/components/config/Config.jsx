import { useEffect, useRef, useState } from "react";
import stl from "./Config.module.css";
import { BiText } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  colors,
  backgrounds,
  maxChars,
  videoIDs,
  fontFamilies,
} from "../../utils/dataArrays";
import { ImFontSize } from "react-icons/im";
import { FaRulerVertical } from "react-icons/fa";
import { GiScrew } from "react-icons/gi";
import { FaCreditCard } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { FaAlignJustify } from "react-icons/fa6";
import { FaAlignLeft } from "react-icons/fa6";
import { FaAlignRight } from "react-icons/fa6";

import { RiShape2Fill } from "react-icons/ri";

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
  backPanelColor,
  setBackPanelColor,
  backPlateShape,
  setBackPlateShape,
  mountingMethod,
  setMountingMethod,
  checkoutMessage,
  setCheckoutMessage,
  setVideoOverlay,
  textLength,
  setTextLength,
  lineAmount,
  alignment,
  setAlignment,
}) => {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 0) {
      inputRef?.current?.focus();
      inputRef.current.setSelectionRange(
        inputRef?.current?.value?.length,
        inputRef?.current?.value?.length
      );
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

  const submitForm = async () => {
    setCheckoutLoading(true);

    const apiUrl = "https://ledsgoneon.nl/wp-json/wc/v3/products";
    const consumerKey = "ck_f84b2a20e0eaf06d0b78094ea5a4fa0de1b7129a";
    const consumerSecret = "cs_4563ce379d816f780c83266375ef507959165095";

    // Item details to add to the cart
    const itemDetails = {
      name: "Custom text",
      regular_price: "13.37",
    };

    // dKu78a38&

    try {
      // Add items to the cart
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
        },
        body: JSON.stringify(itemDetails),
        credentials: "include", // Make sure cookies are sent and received
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      console.log(data);
      setCheckoutLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setCheckoutLoading(false);
    }
  };

  // const submitForm = async () => {
  //   try {
  //     const response = await fetch("http://localhost:1337/submit-form", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: "3407",
  //         quantity: "1",
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const cartKey = data.data.cart_key;

  //       console.log(data.message);
  //       window.location.href = `https://ledsgoneon.nl/winkelwagen/?cocart-load-cart=${cartKey}`;
  //     } else {
  //       const error = await response.json();
  //       console.error("Failed to add to cart:", error.message);
  //     }
  //   } catch (err) {
  //     console.error("Error adding to cart:", err);
  //   }
  // };

  return (
    <div className={stl.config}>
      {activeTab !== 8 && (
        <div className={stl.restRows}>
          <div
            className={`${stl.box} ${activeTab === 0 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(activeTab === 0 ? 0 : 0)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <BiText className={stl.icon} />
                Text
              </span>
            </div>

            {activeTab === 0 && (
              <div className={stl.content}>
                <div className={stl.textWrap}>
                  <span className={stl.currentLength}>
                    [{textLength}/
                    <span className={lineAmount > 3 ? stl.redEnd : stl.gray}>
                      {maxChars[customLength] * lineAmount || 250}
                    </span>
                    ]
                  </span>

                  <textarea
                    type="text"
                    placeholder="Voer uw text in"
                    className={stl.textInput}
                    value={currentText}
                    maxLength={maxChars[customLength] * 4}
                    onInput={(e) => {
                      setTextLength(currentText.length);
                      setCurrentText(e.target.value);
                    }}
                    ref={inputRef}
                    style={{
                      height: textLength > 100 ? "8rem" : "6rem",
                    }}
                  ></textarea>
                </div>
                {lineAmount > 1 && (
                  <div className={stl.alignment}>
                    <button
                      onClick={() => setAlignment("left")}
                      className={alignment === "left" ? stl.activeAlign : ""}
                    >
                      {" "}
                      <FaAlignLeft />
                    </button>
                    <button
                      onClick={() => setAlignment("center")}
                      className={alignment === "center" ? stl.activeAlign : ""}
                    >
                      <FaAlignJustify />
                    </button>
                    <button
                      onClick={() => setAlignment("right")}
                      className={alignment === "right" ? stl.activeAlign : ""}
                    >
                      <FaAlignRight />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 1 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <ImFontSize className={stl.icon} />
                Lettertype
              </span>
            </div>
            {activeTab === 1 && (
              <div className={stl.content}>
                <div className={stl.fontGrid}>
                  {fontFamilies.map((font, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedFont(index)}
                      className={`${stl.fontDiv} ${
                        fontFamilies[selectedFont] === font
                          ? stl.activeFont
                          : ""
                      }`}
                    >
                      <h2
                        style={{
                          fontFamily: font,
                        }}
                      >
                        {font}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 2 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(2)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <IoColorPaletteOutline className={stl.icon} />
                Kleur
              </span>
            </div>
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
                        style={{
                          backgroundColor:
                            index !== colors.length - 1 ? color : "black",
                        }}
                      >
                        {index === colors.length - 1 && (
                          <div className={stl.rgbTile}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 3 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(3)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <FaRulerVertical className={stl.icon} />
                Lengte
              </span>
            </div>

            {activeTab === 3 && (
              <div className={stl.lengthBox}>
                <input
                  type="range"
                  min="40"
                  max="240"
                  step="10"
                  value={customLength}
                  onChange={(e) => setCustomLength(e.target.value)}
                  className={stl.rangeInput}
                />
                <span className={stl.rangeValue}>{customLength}CM</span>
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 4 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(4)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <IoColorPaletteOutline className={stl.icon} />
                Achterpaneel Kleur
              </span>
              {activeTab === 4 && (
                <button onClick={() => setVideoOverlay(videoIDs[0])}>
                  <FiYoutube />
                  Voorbeeld
                </button>
              )}
            </div>

            {activeTab === 4 && (
              <div className={stl.choiceCtas}>
                <button
                  className={
                    backPanelColor === "Transparant" ? stl.activePlateCta : ""
                  }
                  onClick={() => setBackPanelColor("Transparant")}
                >
                  Transparant
                </button>
                <button
                  className={
                    backPanelColor === "Zwart" ? stl.activePlateCta : ""
                  }
                  onClick={() => setBackPanelColor("Zwart")}
                >
                  Zwart (+25%)
                </button>
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 5 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(5)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <RiShape2Fill className={stl.icon} />
                Achterpaneel Vorm
              </span>
              {activeTab === 5 && (
                <button onClick={() => setVideoOverlay(videoIDs[1])}>
                  <FiYoutube />
                  Voorbeeld
                </button>
              )}
            </div>

            {activeTab === 5 && (
              <div className={stl.choiceCtas}>
                <button
                  className={
                    backPlateShape === "Rechthoekig" ? stl.activePlateCta : ""
                  }
                  onClick={() => setBackPlateShape("Rechthoekig")}
                >
                  Rechthoekig
                </button>
                <button
                  className={
                    backPlateShape === "Contour" ? stl.activePlateCta : ""
                  }
                  onClick={() => setBackPlateShape("Contour")}
                >
                  Contour
                </button>
              </div>
            )}
          </div>

          <div
            className={`${stl.box} ${activeTab === 6 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(6)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <IoColorPaletteOutline className={stl.icon} />
                Voorbeeld Achtergrond
              </span>
            </div>
            {activeTab === 6 && (
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
                          index !== backgrounds.length - 1
                            ? background
                            : customBg
                        })`,
                        border:
                          index === backgrounds.length - 1
                            ? "1px solid rgb(134, 0, 134)"
                            : "",
                      }}
                    >
                      {index === backgrounds.length - 1 && (
                        <span>Upload Foto</span>
                      )}
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
          <div
            className={`${stl.box} ${activeTab === 7 ? stl.activeBg : ""}`}
            onClick={() => setActiveTab(7)}
          >
            <div className={stl.topRow}>
              <span className={stl.title}>
                <GiScrew className={stl.icon} />
                Montage Methode
              </span>
              {activeTab === 7 && (
                <button onClick={() => setVideoOverlay(videoIDs[2])}>
                  <FiYoutube />
                  Voorbeeld
                </button>
              )}
            </div>

            {activeTab === 7 && (
              <div className={stl.choiceCtas}>
                <button
                  className={
                    mountingMethod === "Afstandhouders"
                      ? stl.activePlateCta
                      : ""
                  }
                  onClick={() => setMountingMethod("Afstandhouders")}
                >
                  Afstandhouders
                </button>
                <button
                  className={
                    mountingMethod === "Ketting" ? stl.activePlateCta : ""
                  }
                  onClick={() => setMountingMethod("Ketting")}
                >
                  Ketting
                </button>
                {backPanelColor === "Zwart" && (
                  <button
                    className={
                      mountingMethod === "Railmontage" ? stl.activePlateCta : ""
                    }
                    onClick={() => setMountingMethod("Railmontage")}
                  >
                    Railmontage
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 8 && (
        <div className={stl.spaceDiv} onClick={() => setActiveTab(0)}>
          <FaArrowTurnDown className={stl.backArrow} />
          <button>Terug naar instellingen</button>
        </div>
      )}
      <div
        className={`${stl.box} ${activeTab === 8 ? stl.activeBg : ""}`}
        onClick={() => setActiveTab(8)}
      >
        <div className={stl.topRow}>
          <span
            className={stl.title}
            style={{
              cursor: activeTab === 8 ? "initial" : "pointer",
            }}
          >
            <FaCreditCard className={stl.icon} />
            Afrekenen
          </span>
          {activeTab === 8 && (
            <button onClick={() => setVideoOverlay(videoIDs[3])}>
              <FiYoutube />
              Voorbeeld
            </button>
          )}
        </div>

        {activeTab === 8 && (
          <div className={stl.checkoutDiv}>
            <textarea
              placeholder="Opmerkingen (optioneel)"
              value={checkoutMessage}
              onInput={(e) => setCheckoutMessage(e.target.value)}
            ></textarea>
            <button
              disabled={checkoutLoading ? true : false}
              onClick={submitForm}
            >
              {checkoutLoading && (
                <img src="../images/Spinner.svg" alt="Spinner" />
              )}
              {!checkoutLoading && "Afrekenen"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
