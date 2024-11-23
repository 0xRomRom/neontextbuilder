import stl from "./UploadModal.module.css";
import { HiOutlineUpload } from "react-icons/hi";
import VideoPlayer from "../videoplayer/VideoPlayer";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const UploadModal = ({
  handleDragLeave,
  isDraggingOver,
  setUploadedImg,
  uploadedImg,
  setProgressState,
  progressState,
  setAspectRatio,
  setLongestSide,
  setToggleIconBool,
  setUnsupportedFormat,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imgKBSize = acceptedFiles[0].size;
      if (imgKBSize > 10000000) {
        alert("Bestandsgrootte overschreden. Maximaal 2.5MB");
        return;
      }
      let newFiles = [];
      const filetypes = [
        "png",
        "jpg",
        "jpeg",
        "bmp",
        "tiff",
        "svg",
        "webp",
        "ai",
        "pdf",
        "PNG",
        "JPG",
        "JPEG",
        "BMP",
        "TIFF",
        "SVG",
        "AI",
        "WEBP",
        "PDF",
      ];
      acceptedFiles.forEach((file) => {
        const newFile = {
          file,
        };
        filetypes.forEach((type) => {
          if (type === newFile.file.name.split(".")[1].toLowerCase()) {
            newFiles.push(newFile);
          }
        });
      });

      if (newFiles.length === 0) {
        handleDragLeave(true);
        alert(
          "Bestandsformaat niet ondersteund. Probeer: .png .jpg .jpeg .bmp .tiff .svg .webp"
        );
        return;
      }

      const uploadedFileExtension = newFiles[0].file.path.split(".")[1];
      let tempbool = false;
      if (
        uploadedFileExtension === "ai" ||
        uploadedFileExtension === "Ai" ||
        uploadedFileExtension === "pdf" ||
        uploadedFileExtension === "PDF"
      ) {
        alert(
          "Voor dit type bestand is geen indicatieprijs beschikbaar. Upload een SVG, JPEG, JPG of PNG als je een indicatieprijs wilt generenen."
        );
        setUnsupportedFormat(true);
        tempbool = true;
      } else {
        setUnsupportedFormat(false);
      }

      setUploadedImg(newFiles[0]);
      handleDragLeave(false);
      setAspectRatio(null);
      setLongestSide(null);
      setToggleIconBool(false);
      if (progressState === 0 && !tempbool) {
        setProgressState(1);
        return;
      }
      if (tempbool) {
        setProgressState(3);
      }
      setProgressState(3);
    },
    [
      handleDragLeave,
      setUploadedImg,
      progressState,
      setAspectRatio,
      setLongestSide,
      setProgressState,
      setToggleIconBool,
      setUnsupportedFormat,
    ]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
      <div className={`${stl.modal} ${uploadedImg ? stl.checked : ""}`}>
        <div
          className={`${stl.videoWrapper} ${
            isDraggingOver ? stl.pointers : ""
          }`}
        >
          <VideoPlayer videoID={"G8p6vr0Of4I"} />
        </div>
        {!isDraggingOver && (
          <>
            <div className={stl.bottomBox}>
              <div className={stl.btnWrapper}>
                <div
                  className={`${stl.btnBackground} ${
                    uploadedImg ? stl.activeBackground : ""
                  }`}
                >
                  <button
                    className={`${stl.uploadFileCta} ${
                      uploadedImg ? stl.activeCta : ""
                    }`}
                    {...getRootProps()}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {uploadedImg ? (
                      <span className={stl.uploadSpan}>
                        {isHovered ? "Upload bestand" : "Bestand Geupload"}{" "}
                        {isHovered && (
                          <HiOutlineUpload className={stl.uploadIcon} />
                        )}
                        {!isHovered && <FaCheck />}
                      </span>
                    ) : (
                      <span className={stl.uploadSpan}>
                        Upload bestand
                        <HiOutlineUpload className={stl.uploadIcon} />
                      </span>
                    )}
                    <input
                      {...getInputProps()}
                      name="Fileinput"
                      accept="image/*"
                    />
                  </button>
                </div>
                <span className={stl.sleepBestanden}>
                  {window.innerWidth > 1000 && <>Sleep uw bestand hierheen</>}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {isDraggingOver && (
        <div
          className={stl.largedropbox}
          {...getRootProps()}
          onDragLeave={handleDragLeave}
        >
          <div className={stl.sphere}></div>
          <div className={stl.cornerBox}>
            <span className={stl.filedrop}>
              <FiPlusSquare /> Drop bestand
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
