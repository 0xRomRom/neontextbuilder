import stl from "./Canvas.module.css";

const Canvas = ({ currentText, selectedColor, backgroundImage }) => {
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
