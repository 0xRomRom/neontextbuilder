import stl from "./App.module.css";
import { useEffect, useState } from "react";
import NavOverlay from "./components/nav/NavOverlay";
import Config from "./components/config/Config";
import Canvas from "./components/canvas/Canvas";
import {
  colors,
  backgrounds,
  maxChars,
  fontFamilies,
} from "./utils/dataArrays";
import VideoOverlay from "./components/videooverlay/VideoOverlay";

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentText, setCurrentText] = useState("Uw Text");
  const [regel2, setRegel2] = useState("");
  const [regel3, setRegel3] = useState("");
  const [regel4, setRegel4] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[2]);
  const [backgroundImage, setBackgroundImage] = useState(backgrounds[0]);
  const [customBg, setCustomBg] = useState("");
  const [customLength, setCustomLength] = useState(100);
  const [selectedFont, setSelectedFont] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [backPanelColor, setBackPanelColor] = useState("Transparant");
  const [backPlateShape, setBackPlateShape] = useState("Rechthoekig");
  const [mountingMethod, setMountingMethod] = useState("Afstandhouders");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [videoOverlay, setVideoOverlay] = useState("");
  const [lineAmount, setLineAmount] = useState(1);
  const [alignment, setAlignment] = useState("center");

  const OUTLINE_FONT_COUNT = 6;
  //////////////// Frontend Price Constants ///////////////////
  const BASE_PRICE = 175;
  const BACKPANEL_TYPE = backPanelColor === "Zwart" ? 1.25 : 1;
  const LED_TYPE = selectedColor === "RGB" ? 1.4 : 1;
  const FONT_FACTOR =
    selectedFont > fontFamilies.length - OUTLINE_FONT_COUNT - 1 ? 1.15 : 1;

  // Increase linemultiplier based on line amount/content per line
  useEffect(() => {
    let lineMultiplier = 0.225;

    if (lineAmount >= 2) {
      if (regel2.length > 0) {
        lineMultiplier = 0.375;
      }
    }
    if (lineAmount >= 3) {
      if ((regel2.length > 0 && regel3.length > 0) || regel3.length > 0) {
        lineMultiplier = 0.525;
      }
    }
    if (lineAmount === 4) {
      if (regel4.length > 0) {
        lineMultiplier = 0.675;
      }
    }

    const base =
      customLength * customLength * lineMultiplier * 0.0425 + BASE_PRICE;
    const finalPrice = Math.floor(
      base * BACKPANEL_TYPE * LED_TYPE * FONT_FACTOR
    );
    setFinalPrice(finalPrice);
  }, [
    customLength,
    currentText,
    selectedColor,
    selectedFont,
    backPanelColor,
    BACKPANEL_TYPE,
    FONT_FACTOR,
    LED_TYPE,
    lineAmount,
    regel2.length,
    regel3.length,
    regel4.length,
  ]);

  useEffect(() => {
    const currentLength = currentText.length;
    const allowedForLength = maxChars[customLength];

    if (currentLength > allowedForLength) {
      setCurrentText(currentText.slice(0, allowedForLength));
      setRegel2(regel2.slice(0, allowedForLength));
      setRegel3(regel3.slice(0, allowedForLength));
      setRegel4(regel4.slice(0, allowedForLength));
    }
  }, [currentText, customLength, regel2, regel3, regel4]);

  return (
    <div className={stl.app}>
      <NavOverlay setShowNav={setShowNav} showNav={showNav} />
      {videoOverlay && (
        <VideoOverlay
          videoOverlay={videoOverlay}
          setVideoOverlay={setVideoOverlay}
        />
      )}
      <div className={stl.brickBg}>
        <a href="https://ledsgoneon.nl">
          <img
            src="./images/Mainlogo.png"
            alt="Led's Go Neon logo"
            className={stl.mainLogo}
            onClick={() => window.open("https://ledsgoneon.nl", "_self")}
          />
        </a>
        <div className={stl.transition}></div>
      </div>
      <div className={stl.paddWrapper}>
        <div className={stl.purpleSphere2}></div>
        <div className={stl.purpleSphere3}></div>
        <div className={stl.purpleSphere4}></div>
        <button className={stl.burgerCta} onClick={() => setShowNav(!showNav)}>
          <img
            src="./images/Hamburger.svg"
            alt="Hamburger menu"
            className={stl.hamburger}
          />
        </button>

        <header className={stl.header}>
          <h1 className={stl.pageHero}>
            <span className={stl.pink}>Text</span> configurator
          </h1>
        </header>
        <main className={stl.mainApp}>
          <Canvas
            currentText={currentText}
            selectedColor={selectedColor}
            backgroundImage={backgroundImage}
            customBg={customBg}
            selectedFont={selectedFont}
            finalPrice={finalPrice}
            backPanelColor={backPanelColor}
            backPlateShape={backPlateShape}
            mountingMethod={mountingMethod}
            customLength={customLength}
            lineAmount={lineAmount}
            alignment={alignment}
            regel2={regel2}
            regel3={regel3}
            regel4={regel4}
            OUTLINE_FONT_COUNT={OUTLINE_FONT_COUNT}
          />
          <Config
            currentText={currentText}
            setCurrentText={setCurrentText}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setBackgroundImage={setBackgroundImage}
            backgroundImage={backgroundImage}
            setCustomBg={setCustomBg}
            customBg={customBg}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            customLength={customLength}
            setCustomLength={setCustomLength}
            backPanelColor={backPanelColor}
            setBackPanelColor={setBackPanelColor}
            backPlateShape={backPlateShape}
            setBackPlateShape={setBackPlateShape}
            mountingMethod={mountingMethod}
            setMountingMethod={setMountingMethod}
            checkoutMessage={checkoutMessage}
            setCheckoutMessage={setCheckoutMessage}
            setVideoOverlay={setVideoOverlay}
            lineAmount={lineAmount}
            alignment={alignment}
            setAlignment={setAlignment}
            regel2={regel2}
            setRegel2={setRegel2}
            regel3={regel3}
            setRegel3={setRegel3}
            regel4={regel4}
            setRegel4={setRegel4}
            setLineAmount={setLineAmount}
            OUTLINE_FONT_COUNT={OUTLINE_FONT_COUNT}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
