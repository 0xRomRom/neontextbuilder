import { useState } from "react";
import stl from "./Canvas.module.css";

const images = ["./images/Brickwall.webp"];

const Canvas = ({ currentText, selectedColor }) => {
  const [backgroundImage, setBackgroundImage] = useState(images[0]);

  return (
    <div className={stl.canvas}>
      <h1
        className={stl.mainText}
        style={{
          color: selectedColor,
          textShadow: `0px 0px 20px ${selectedColor}`,
        }}
      >
        {currentText}
      </h1>
      <img src={backgroundImage} alt="Background" className={stl.bgImg} />
    </div>
  );
};

export default Canvas;
