import stl from "./App.module.css";
import { useState } from "react";
import NavOverlay from "./components/nav/NavOverlay";
import Config from "./components/config/Config";
import Canvas from "./components/canvas/Canvas";
import { colors, backgrounds } from "./utils/dataArrays";
import VideoOverlay from "./components/videooverlay/VideoOverlay";

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentText, setCurrentText] = useState("LED's GO  NEON");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [backgroundImage, setBackgroundImage] = useState(backgrounds[0]);
  const [selectedFont, setSelectedFont] = useState("Hanken");
  const [customBg, setCustomBg] = useState("");
  const [customLength, setCustomLength] = useState(60);
  const [finalPrice, setFinalPrice] = useState(120);
  const [backPanelColor, setBackPanelColor] = useState("Transparant");
  const [backPlateShape, setBackPlateShape] = useState("Rechthoekig");
  const [mountingMethod, setMountingMethod] = useState("Afstandhouders");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [videoOverlay, setVideoOverlay] = useState("");

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
          />
        </main>
      </div>
    </div>
  );
};

export default App;
