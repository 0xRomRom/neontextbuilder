import stl from "./App.module.css";
import { useEffect, useState } from "react";
import NavOverlay from "./components/nav/NavOverlay";
import Config from "./components/config/Config";
import Canvas from "./components/canvas/Canvas";
import { colors, backgrounds, maxChars } from "./utils/dataArrays";
import VideoOverlay from "./components/videooverlay/VideoOverlay";

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentText, setCurrentText] = useState("Vul uw text in");
  const [selectedColor, setSelectedColor] = useState(colors[2]);
  const [backgroundImage, setBackgroundImage] = useState(backgrounds[0]);
  const [customBg, setCustomBg] = useState("");
  const [customLength, setCustomLength] = useState(100);
  const [selectedFont, setSelectedFont] = useState(0);
  const [finalPrice, setFinalPrice] = useState(120);
  const [backPanelColor, setBackPanelColor] = useState("Transparant");
  const [backPlateShape, setBackPlateShape] = useState("Rechthoekig");
  const [mountingMethod, setMountingMethod] = useState("Afstandhouders");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [videoOverlay, setVideoOverlay] = useState("");
  const [textLength, setTextLength] = useState(13);
  const [lineAmount, setLineAmount] = useState(1);
  const [alignment, setAlignment] = useState("center");

  // useEffect(() => {
  //   setFinalPrice();
  // }, []);

  useEffect(() => {
    const currentLength = currentText.length;
    const lineCap1 = maxChars[customLength];
    const lineCap2 = maxChars[customLength] * 2;
    const lineCap3 = maxChars[customLength] * 3;
    const lineCap4 = maxChars[customLength] * 4;

    if (currentLength <= lineCap1) {
      setLineAmount(1);
    }
    if (currentLength > lineCap1 && currentLength <= lineCap2) {
      setLineAmount(2);
    }
    if (currentLength > lineCap2 && currentLength <= lineCap3) {
      setLineAmount(3);
    }
    if (currentLength > lineCap3 && currentLength <= lineCap4) {
      setLineAmount(4);
    }

    setTextLength(currentLength);
  }, [currentText]);

  // Truncate text if custom length is decreased below bounds
  useEffect(() => {
    const maxAllowedLengthForCustomSignLength =
      maxChars[customLength] * lineAmount;
    if (currentText.length > maxAllowedLengthForCustomSignLength) {
      setCurrentText(currentText.slice(0, maxAllowedLengthForCustomSignLength));
      setTextLength(maxAllowedLengthForCustomSignLength);
    }
  }, [customLength]);

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
            textLength={textLength}
            lineAmount={lineAmount}
            alignment={alignment}
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
            textLength={textLength}
            setTextLength={setTextLength}
            lineAmount={lineAmount}
            alignment={alignment}
            setAlignment={setAlignment}
          />
        </main>
      </div>
    </div>
  );
};

export default App;

/*
Prijs Formule (graag afronden op hele euros):

((LxLxHx0,0425)+175)xSxLxF

L= Lengte

H= Hoogte waarde (hoeveel regels onder elkaar); 
1 regel;0,225
2 regels;0,375
3 regels;0,525
4 regels;0,675

S= Soort achterpaneel;
Transparant; 1
Zwart;1,25

L= Soort LED
Enkele kleur; 1
RGB; 1,4

F= Factor Lettertype
Single line font; 1
Outline font; 1,15

Max karakters per regel
Totale lengte range= 40-240cm

40cm=8
50cm=10
60cm=14
70cm=18
80cm=22
100cm=32
120cm=42
140cm=52
Groter dan 150cm is er geen max karakters. 
*/
