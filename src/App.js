import stl from "./App.module.css";
import { TiArrowLeftThick } from "react-icons/ti";
import React, { useEffect, useState } from "react";

import UploadModal from "./components/UploadModal/UploadModal";
import ImageEditor from "./components/ImageEditor/ImageEditor";
import RequestCalculation from "./components/RequestCalculation/RequestCalculation";
import LongestRow from "./components/LongestRow/LongestRow";
import LedKind from "./components/LedKind/LedKind";
import BackplateType from "./components/BackplateType/BackplateType";
import BackplateShape from "./components/BackplateShape/BackplateShape";
import Mounting from "./components/Mounting/Mounting";
import { FaWhatsapp } from "react-icons/fa";
import SmallForm from "./components/SmallForm/SmallForm";
import CurrentOverview from "./CurrentOverview/CurrentOverview";
import NavOverlay from "./components/navoverlay/NavOverlay";

const App = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [longestSide, setLongestSide] = useState(null);
  const [progressState, setProgressState] = useState(0);
  const [toggleIconBool, setToggleIconBool] = useState(false);
  const [ledType, setLedType] = useState(null);
  const [backplateType, setBackplateType] = useState(null);
  const [backplateShape, setBackplateShape] = useState(null);
  const [mountType, setMountType] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [notice, setNotice] = useState(null);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [RGBPrice, setRGBPrice] = useState(null);
  const [backplatePrice, setBackPlatePrice] = useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [base64img, setBase64img] = useState(null);
  const [fileExtension, setFileExtension] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [unsupportedFormat, setUnsupportedFormat] = useState(false);

  useEffect(() => {
    if (uploadedImg) {
      const uploadedFileExtension = uploadedImg.file.path.split(".")[1];
      const imgDataType = uploadedImg.file.type;

      setFileExtension(uploadedFileExtension);
      setDataType(imgDataType);

      const convertImageToBase64 = () => {
        const file = uploadedImg.file;

        if (file) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const base64String = e.target.result.split(",")[1];
            setBase64img(base64String);
          };

          reader.readAsDataURL(file);
        }
      };
      convertImageToBase64();

      setTimeout(() => {
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        // Trigger the click on the body element
        document.body.dispatchEvent(clickEvent);
      }, 1000);
    }
  }, [uploadedImg]);

  useEffect(() => {
    if (!showNav) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden"; // Disable scrolling on the body
  }, [showNav]);

  const handleDragOver = () => {
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleClickDefault = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const offset = 0;

      if (scrollPosition + windowHeight >= documentHeight - offset) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (progressState > 0) {
      if (progressState === 5) return;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [progressState]);

  useEffect(() => {
    const length = +longestSide?.slice(0, -2);
    let priceCalculation = 0;
    let dimensions = 0;

    if (aspectRatio >= 1) {
      const height = length / aspectRatio;
      const width = length;

      dimensions = height * width;
    }

    if (aspectRatio < 1) {
      const height = length;
      const width = aspectRatio * height;

      dimensions = width * height;
    }

    priceCalculation = 0.0425 * dimensions + 200;
    if (+length > 0) {
      if (!backplateType && !ledType && !aspectRatio && !longestSide) {
        setPriceEstimate(null);
        return;
      }

      if (!ledType && !backplateType) {
        setPriceEstimate(priceCalculation);
      }
      if (ledType) {
        const ledMultiplied = priceCalculation * 1.4;

        if (ledType === "RGB" && !backplateType) {
          setRGBPrice(priceCalculation * 0.4);
          priceCalculation *= 1.4;
        }
        if (ledType === "RGB" && backplateType === "Gekleurd") {
          setRGBPrice(priceCalculation * 0.4);
          setBackPlatePrice(ledMultiplied * 0.25);
          priceCalculation = ledMultiplied * 1.25;
        }
        if (ledType === "RGB" && backplateType === "Transparant") {
          setRGBPrice(priceCalculation * 0.4);
          setBackPlatePrice(null);
          priceCalculation = priceCalculation * 1.4;
        }

        if (ledType === "Single color" && !backplateType) {
          priceCalculation *= 1;
          setRGBPrice(null);
        }
        if (ledType === "Single color" && backplateType === "Gekleurd") {
          setRGBPrice(null);
          setBackPlatePrice(priceCalculation * 0.25);
          priceCalculation *= 1.25;
        }
        if (ledType === "Single color" && backplateType === "Transparant") {
          setRGBPrice(null);
          setBackPlatePrice(null);
        }
        setPriceEstimate(priceCalculation);
      }
    }
  }, [aspectRatio, ledType, longestSide, backplateType]);

  return (
    <div
      className={stl.app}
      onClick={handleClickDefault}
      onDragOver={handleDragOver}
    >
      <NavOverlay setShowNav={setShowNav} showNav={showNav} />
      <div className={stl.whatsAppButton}>
        <a
          className={stl.appAnchor}
          href="https://wa.me/message/HLRIKBZBL4MRA1"
          onClick={() =>
            window.open("https://wa.me/message/HLRIKBZBL4MRA1", "_blank")
          }
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp className={stl.appLogo} />

          <span className={stl.appOns}>App ons</span>
        </a>
      </div>
      {priceEstimate && aspectRatio && longestSide && (
        <CurrentOverview
          priceEstimate={priceEstimate}
          ledType={ledType}
          RGBPrice={RGBPrice}
          backplateType={backplateType}
          backplatePrice={backplatePrice}
        />
      )}
      {uploadedImg && !aspectRatio && progressState === 0 && (
        <ImageEditor
          uploadedImg={uploadedImg}
          setUploadedImg={setUploadedImg}
          setAspectRatio={setAspectRatio}
          setProgressState={setProgressState}
          setToggleIconBool={setToggleIconBool}
          setLongestSide={setLongestSide}
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
            <span className={stl.pink}>Logo</span> samenstellen
          </h1>
          <h2 className={stl.subHero}>
            Stel hier <span className={stl.pink}>vrijblijvend</span> je eigen
            LED's Go Neon lamp samen
          </h2>
        </header>
        <main className={stl.mainApp}>
          <UploadModal
            handleDragLeave={handleDragLeave}
            isDraggingOver={isDraggingOver}
            setUploadedImg={setUploadedImg}
            uploadedImg={uploadedImg}
            setProgressState={setProgressState}
            progressState={progressState}
            setAspectRatio={setAspectRatio}
            setLongestSide={setLongestSide}
            setToggleIconBool={setToggleIconBool}
            setUnsupportedFormat={setUnsupportedFormat}
          />
          {progressState > 0 && !unsupportedFormat && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}
          {uploadedImg && progressState >= 1 && !unsupportedFormat && (
            <RequestCalculation
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              setProgressState={setProgressState}
              toggleIconBool={toggleIconBool}
              setToggleIconBool={setToggleIconBool}
              setLongestSide={setLongestSide}
              setPriceEstimate={setPriceEstimate}
            />
          )}
          {progressState === 1 ||
            (progressState >= 3 && (
              <TiArrowLeftThick className={stl.activeArrow} />
            ))}
          {progressState >= 3 && (
            <LongestRow
              setLongestSide={setLongestSide}
              setProgressState={setProgressState}
              longestSide={longestSide}
              aspectRatio={aspectRatio}
            />
          )}
          {progressState >= 4 && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}
          {progressState >= 4 && longestSide && (
            <LedKind
              setLedType={setLedType}
              setProgressState={setProgressState}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              progressState={progressState}
            />
          )}
          {progressState >= 5 && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}
          {progressState >= 5 && (
            <BackplateType
              setProgressState={setProgressState}
              setBackplateType={setBackplateType}
            />
          )}
          {progressState >= 6 && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}
          {progressState >= 6 && (
            <BackplateShape
              setBackplateShape={setBackplateShape}
              setProgressState={setProgressState}
            />
          )}
          {progressState >= 7 && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}
          {progressState >= 7 && (
            <Mounting
              setProgressState={setProgressState}
              setMountType={setMountType}
              backplateType={backplateType}
            />
          )}
          {progressState >= 8 && (
            <TiArrowLeftThick className={stl.activeArrow} />
          )}

          {progressState === 8 && (
            <SmallForm
              setName={setName}
              name={name}
              setEmail={setEmail}
              email={email}
              setProgressState={setProgressState}
              setNotice={setNotice}
              notice={notice}
              ledType={ledType}
              backplateType={backplateType}
              backplateShape={backplateShape}
              mountType={mountType}
              base64img={base64img}
              longestSide={longestSide}
              selectedColor={selectedColor}
              priceEstimate={priceEstimate}
              aspectRatio={aspectRatio}
              uploadedImg={uploadedImg}
              fileExtension={fileExtension}
              dataType={dataType}
            />
          )}
        </main>
      </div>
      {showFooter && email && (
        <div
          className={`${stl.footerBlock} ${showFooter ? stl.show : ""}`}
          onClick={() => window.open("https://0xWebDev.com/", "_blank")}
        >
          By <br />
          <a href="https://0xWebDev.com" target="_blank" rel="noreferrer">
            0<span className={stl.blueSpan}>x</span>WebDev
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
