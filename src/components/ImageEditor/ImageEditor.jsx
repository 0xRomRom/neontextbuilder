import stl from "./ImageEditor.module.css";
import { useRef, useState, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { GrTopCorner } from "react-icons/gr";

const MIN_DIMENSION = 25;
const ASPECT_RATIO = 0;

const ImageEditor = ({
  uploadedImg,
  setAspectRatio,
  setProgressState,
  setToggleIconBool,
  setLongestSide,
  setUploadedImg,
}) => {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imgSrc) {
      setImgSrc(uploadedImg);
    }
  }, [uploadedImg, imgSrc]);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      2,
      width * 3,
      height * 3
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  useEffect(() => {
    const handleFileChange = () => {
      const file = uploadedImg.file;
      if (!file) {
        return;
      }
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result; // use reader.result to get the data URL
        imageElement.src = imageUrl;
        imageElement.addEventListener("load", (e) => {
          if (error) setError("");
          const { naturalWidth, naturalHeight } = e.currentTarget;
          if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Image must be at least 150 x 150 pixels.");
            setImgSrc("");
          } else {
            setImgSrc(imageUrl);
          }
        });
      });

      reader.readAsDataURL(file);
    };

    handleFileChange({ target: { files: [uploadedImg] } });

    // Add any dependencies if needed
  }, [uploadedImg, error, setImgSrc, setUploadedImg]);

  const handleCropSave = () => {
    const cropObject = convertToPixelCrop(
      crop,
      imgRef.current.width,
      imgRef.current.height
    );
    const { width, height } = cropObject;

    if (width < 50 || height < 50) {
      alert("Selecteer de juiste afmeting altevorens te bevestigen.");
      return;
    }
    const aspectRatio = +(width / height).toFixed(4);

    setAspectRatio(aspectRatio);
    setProgressState(3);
    setToggleIconBool(false);
    setLongestSide(null);
  };

  const handleCancel = () => {
    setProgressState(1);
    setToggleIconBool(false);
  };

  return (
    <div className={stl.imageEditor}>
      {imgSrc && (
        <div className={stl.workSpace}>
          <h2 className={stl.logoBijSnijden}>Verhouding bepalen</h2>
          <span className={stl.subSpan}>
            Sleep een rechthoek passend om je logo
          </span>
          <div className={stl.workSpaceInner}>
            <GrTopCorner className={stl.cornerLeftTop} />
            <GrTopCorner className={stl.cornerRightTop} />
            <GrTopCorner className={stl.cornerBottomLeft} />
            <GrTopCorner className={stl.cornerBottomRight} />
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => {
                setCrop(percentCrop);
              }}
              // keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              className={stl.parent}
              style={{
                backgroundImage: "url(./images/Grid.webp)",
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
              }}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <div className={stl.btnsWrapper}>
            <button className={stl.annuleer} onClick={handleCancel}>
              Annuleren
            </button>
            <button
              className={`${stl.bevestigenCta} ${
                crop?.width > 0 && crop?.height > 0 ? "" : stl.disabledBtn
              }`}
              onClick={handleCropSave}
            >
              Bevestigen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
