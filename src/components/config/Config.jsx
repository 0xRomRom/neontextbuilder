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
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const carousselItems = [
  "Text",
  "Lettertype",
  "Kleur",
  "Lengte",
  "Achterpaneel Kleur",
  "Achterpaneel Vorm",
  "Voorbeeld Achtergrond",
  "Montage Methode",
  "Afrekenen",
];

const icons = [
  <BiText />,
  <ImFontSize />,
  <IoColorPaletteOutline />,
  <FaRulerVertical />,
  <IoColorPaletteOutline />,
  <RiShape2Fill />,
  <IoColorPaletteOutline />,
  <GiScrew />,
  <FaCreditCard />,
];

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
  lineAmount,
  alignment,
  setAlignment,
  regel2,
  setRegel2,
  regel3,
  setRegel3,
  regel4,
  setRegel4,
  setLineAmount,
  OUTLINE_FONT_COUNT,
}) => {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [carousselIndex, setCarousselIndex] = useState(0);
  const [allowIncrement, setAllowIncrement] = useState(false);
  const [decrementWarning, setDecrementWarning] = useState(false);

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
    let lineMultiplier = 0.225;

    if (lineAmount === 2) {
      lineMultiplier = 0.375;
    }
    if (lineAmount === 3) {
      lineMultiplier = 0.525;
    }
    if (lineAmount === 4) {
      lineMultiplier = 0.675;
    }
    try {
      setCheckoutLoading(true);
      const response = await fetch(
        "https://neonbackend.netlify.app/.netlify/functions/server",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            backPanelColor,
            backPlateShape,
            selectedColor,
            lineMultiplier,
            selectedFont,
            customLength,
            mountingMethod,
            currentText,
            regel2,
            regel3,
            regel4,
            checkouttext: checkoutMessage,
            lettertype: fontFamilies[selectedFont],
            OUTLINE_FONT_COUNT,
            font_length: fontFamilies.length,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const cartKey = data.cartKey;

        console.log(data.message);
        window.location.href = `https://ledsgoneon.nl/afrekenen/?cocart-load-cart=${cartKey}`;
      } else {
        const error = await response.json();
        setCheckoutLoading(false);
        console.error("Failed to add to cart:", error.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setCheckoutLoading(false);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const incrementCaroussel = () => {
    if (carousselIndex === 0) {
      setCarousselIndex(8);
      setActiveTab(8);
    } else {
      setActiveTab((prev) => prev - 1);
      setCarousselIndex((prev) => prev - 1);
    }
  };
  const decrementCaroussel = () => {
    if (carousselIndex === 8) {
      setCarousselIndex(0);
      setActiveTab(0);
    } else {
      setActiveTab((prev) => prev + 1);
      setCarousselIndex((prev) => prev + 1);
    }
  };

  const incrementLength = () => {
    if (customLength < 250) {
      setCustomLength((prev) => +prev + 10);
      setAllowIncrement(false);
    }
  };

  // Set & reset increment warning box on length cap reach
  useEffect(() => {
    if (lineAmount === 1) {
      if (currentText.length === maxChars[customLength]) {
        setAllowIncrement(true);
      } else {
        setAllowIncrement(false);
      }
    }

    if (lineAmount === 2) {
      if (
        regel2.length === maxChars[customLength] ||
        currentText.length === maxChars[customLength]
      ) {
        setAllowIncrement(true);
      } else {
        setAllowIncrement(false);
      }
    }

    if (lineAmount === 3) {
      if (
        currentText.length === maxChars[customLength] ||
        regel2.length === maxChars[customLength] ||
        regel3.length === maxChars[customLength]
      ) {
        setAllowIncrement(true);
      } else {
        setAllowIncrement(false);
      }
    }

    if (lineAmount === 4) {
      if (
        currentText.length === maxChars[customLength] ||
        regel2.length === maxChars[customLength] ||
        regel3.length === maxChars[customLength] ||
        regel4.length === maxChars[customLength]
      ) {
        setAllowIncrement(true);
      } else {
        setAllowIncrement(false);
      }
    }
  }, [
    currentText,
    regel2.length,
    regel3.length,
    regel4.length,
    currentText.length,
    lineAmount,
    customLength,
  ]);

  // Update sign length only if allowed
  const updateLengthSlider = (e) => {
    const newValue = +e.target.value;
    if (newValue < customLength) {
      const allowedForLength = maxChars[newValue];
      const regel1Length = currentText.length;
      const regel2Length = regel2.length;
      const regel3Length = regel3.length;
      const regel4Length = regel4.length;
      if (
        regel1Length > allowedForLength ||
        regel2Length > allowedForLength ||
        regel3Length > allowedForLength ||
        regel4Length > allowedForLength
      ) {
        setDecrementWarning(true);
        return;
      }
    }
    setDecrementWarning(false);
    setCustomLength(e.target.value);
  };

  // Reset warning message on tab switch
  useEffect(() => {
    if (activeTab !== 3) {
      setDecrementWarning(false);
    }
  }, [activeTab, setDecrementWarning]);

  return (
    <div className={stl.config}>
      <div className={stl.caroussel}>
        {carousselIndex === 0 && <button></button>}
        {carousselIndex > 0 && (
          <button onClick={incrementCaroussel}>
            <FaArrowLeft />
          </button>
        )}
        <span className={stl.tabSpan}>
          {icons[carousselIndex]}
          {carousselItems[carousselIndex]}
        </span>
        {carousselIndex < 8 && (
          <button onClick={decrementCaroussel}>
            <FaArrowRight />
          </button>
        )}
        {carousselIndex === 8 && <button></button>}
      </div>
      {activeTab !== 8 && (
        <div className={stl.restRows}>
          {((window.innerWidth < 500 && activeTab === 0) ||
            window.innerWidth > 500) && (
            <div
              className={`${stl.box} ${activeTab === 0 ? stl.activeBg : ""}`}
              onClick={() => setActiveTab(activeTab === 0 ? 0 : 0)}
            >
              <div className={stl.topRow}>
                <span className={stl.title}>
                  <BiText className={stl.icon} />
                  Text
                </span>
                {activeTab === 0 && (
                  <button onClick={() => setVideoOverlay(videoIDs[0])}>
                    <FiYoutube />
                    Voorbeeld
                  </button>
                )}
              </div>
              {activeTab === 0 && window.innerWidth < 500 && (
                <button
                  onClick={() => setVideoOverlay(videoIDs[0])}
                  className={stl.mobileYT}
                >
                  <FiYoutube />
                  Voorbeeld
                </button>
              )}

              {activeTab === 0 && (
                <div className={stl.content}>
                  {allowIncrement && customLength < 150 && (
                    <span className={stl.maxCharsSpan}>
                      Karakterlimiet voor bordlengte bereikt.
                      <br /> Voeg extra regel toe of vergroot lengte
                      <br />
                      <button
                        className={stl.vergrootLengte}
                        onClick={incrementLength}
                      >
                        Vergroot lengte
                      </button>
                    </span>
                  )}
                  <div className={stl.textWrap}>
                    <textarea
                      type="text"
                      placeholder="Regel 1"
                      className={stl.textInput}
                      value={currentText}
                      spellCheck={false}
                      maxLength={maxChars[customLength]}
                      onInput={(e) => {
                        setCurrentText(e.target.value);
                      }}
                      ref={inputRef}
                      style={{
                        border:
                          currentText.length === maxChars[customLength]
                            ? "1px solid red"
                            : "",
                      }}
                    ></textarea>
                  </div>
                  {lineAmount > 1 && (
                    <>
                      <textarea
                        type="text"
                        placeholder="Regel 2"
                        className={stl.textInput}
                        value={regel2}
                        spellCheck={false}
                        maxLength={maxChars[customLength]}
                        onInput={(e) => {
                          setRegel2(e.target.value);
                        }}
                        style={{
                          border:
                            regel2.length === maxChars[customLength]
                              ? "1px solid red"
                              : "",
                        }}
                      ></textarea>
                    </>
                  )}
                  {lineAmount > 2 && (
                    <textarea
                      type="text"
                      placeholder="Regel 3"
                      className={stl.textInput}
                      value={regel3}
                      spellCheck={false}
                      maxLength={maxChars[customLength]}
                      onInput={(e) => {
                        setRegel3(e.target.value);
                      }}
                      style={{
                        border:
                          regel3.length === maxChars[customLength]
                            ? "1px solid red"
                            : "",
                      }}
                    ></textarea>
                  )}
                  {lineAmount > 3 && (
                    <textarea
                      type="text"
                      placeholder="Regel 4"
                      className={stl.textInput}
                      value={regel4}
                      spellCheck={false}
                      maxLength={maxChars[customLength]}
                      onInput={(e) => {
                        setRegel4(e.target.value);
                      }}
                      style={{
                        border:
                          regel4.length === maxChars[customLength]
                            ? "1px solid red"
                            : "",
                      }}
                    ></textarea>
                  )}
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
                        className={
                          alignment === "center" ? stl.activeAlign : ""
                        }
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
                  {lineAmount < 5 && (
                    <div className={stl.regelCtas}>
                      {lineAmount < 4 && (
                        <button
                          className={stl.addsentence}
                          onClick={() => {
                            setLineAmount((prev) => prev + 1);
                            setAllowIncrement(false);
                          }}
                        >
                          Regel Toevoegen
                        </button>
                      )}
                      {lineAmount > 1 && (
                        <button
                          className={stl.addsentence}
                          onClick={() => setLineAmount((prev) => prev - 1)}
                        >
                          Regel Verwijderen
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {((window.innerWidth < 500 && activeTab === 1) ||
            window.innerWidth > 500) && (
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
                        <h5
                          style={{
                            fontFamily: font,
                          }}
                        >
                          {font}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {((window.innerWidth < 500 && activeTab === 2) ||
            window.innerWidth > 500) && (
            <div
              className={`${stl.box} ${activeTab === 2 ? stl.activeBg : ""}`}
              onClick={() => setActiveTab(2)}
            >
              <div className={stl.topRow}>
                <span className={stl.title}>
                  <IoColorPaletteOutline className={stl.icon} />
                  Kleur
                </span>
                {activeTab === 2 && (
                  <button onClick={() => setVideoOverlay(videoIDs[1])}>
                    <FiYoutube />
                    Voorbeeld
                  </button>
                )}
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
          )}
          {((window.innerWidth < 500 && activeTab === 3) ||
            window.innerWidth > 500) && (
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
                  {decrementWarning && (
                    <div className={stl.warningBox}>
                      Maximale karakter limiet voor bordlengte bereikt.
                      <br /> Maak u tekst kleiner of plaats woorden onder
                      elkaar.
                    </div>
                  )}
                  <input
                    type="range"
                    min="40"
                    max="240"
                    step="10"
                    value={customLength}
                    onChange={updateLengthSlider}
                    className={stl.rangeInput}
                  />
                  <span className={stl.rangeValue}>{customLength}CM</span>
                </div>
              )}
            </div>
          )}
          {((window.innerWidth < 500 && activeTab === 4) ||
            window.innerWidth > 500) && (
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
                  <button onClick={() => setVideoOverlay(videoIDs[2])}>
                    <FiYoutube />
                    Voorbeeld
                  </button>
                )}
              </div>

              {activeTab === 4 && (
                <>
                  {activeTab === 4 && window.innerWidth < 500 && (
                    <button
                      onClick={() => setVideoOverlay(videoIDs[2])}
                      className={stl.mobileYT}
                    >
                      <FiYoutube />
                      Voorbeeld
                    </button>
                  )}
                  <div className={stl.choiceCtas}>
                    <button
                      className={
                        backPanelColor === "Transparant"
                          ? stl.activePlateCta
                          : ""
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
                </>
              )}
            </div>
          )}
          {((window.innerWidth < 500 && activeTab === 5) ||
            window.innerWidth > 500) && (
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
                  <button onClick={() => setVideoOverlay(videoIDs[3])}>
                    <FiYoutube />
                    Voorbeeld
                  </button>
                )}
              </div>

              {activeTab === 5 && (
                <>
                  {activeTab === 5 && window.innerWidth < 500 && (
                    <button
                      onClick={() => setVideoOverlay(videoIDs[3])}
                      className={stl.mobileYT}
                    >
                      <FiYoutube />
                      Voorbeeld
                    </button>
                  )}
                  <div className={stl.choiceCtas}>
                    <button
                      className={
                        backPlateShape === "Rechthoekig"
                          ? stl.activePlateCta
                          : ""
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
                </>
              )}
            </div>
          )}
          {((window.innerWidth < 500 && activeTab === 6) ||
            window.innerWidth > 500) && (
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
          )}
          {((window.innerWidth < 500 && activeTab === 7) ||
            window.innerWidth > 500) && (
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
                  <button onClick={() => setVideoOverlay(videoIDs[4])}>
                    <FiYoutube />
                    Voorbeeld
                  </button>
                )}
              </div>

              {activeTab === 7 && (
                <>
                  {activeTab === 7 && window.innerWidth < 500 && (
                    <button
                      onClick={() => setVideoOverlay(videoIDs[4])}
                      className={stl.mobileYT}
                    >
                      <FiYoutube />
                      Voorbeeld
                    </button>
                  )}
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
                          mountingMethod === "Railmontage"
                            ? stl.activePlateCta
                            : ""
                        }
                        onClick={() => setMountingMethod("Railmontage")}
                      >
                        Railmontage
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {activeTab === 8 && window.innerWidth > 500 && (
        <div className={stl.spaceDiv} onClick={() => setActiveTab(0)}>
          <FaArrowTurnDown className={stl.backArrow} />
          <button>Terug naar instellingen</button>
        </div>
      )}
      {((window.innerWidth < 500 && activeTab === 8) ||
        window.innerWidth > 500) && (
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
              <button onClick={() => setVideoOverlay(videoIDs[5])}>
                <FiYoutube />
                Voorbeeld
              </button>
            )}
          </div>

          {activeTab === 8 && (
            <>
              {activeTab === 8 && window.innerWidth < 500 && (
                <button
                  onClick={() => setVideoOverlay(videoIDs[5])}
                  className={stl.mobileYT}
                >
                  <FiYoutube />
                  Voorbeeld
                </button>
              )}
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
                    <img src="./images/Spinner.svg" alt="Spinner" />
                  )}
                  {!checkoutLoading && "Afrekenen"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Config;
