import React from "react";
import stl from "./VideoOverlay.module.css";
import { IoClose } from "react-icons/io5";

const VideoOverlay = ({ videoOverlay = "cIoYUQhKJUo", setVideoOverlay }) => {
  return (
    <div className={stl.videoOverlay} onClick={() => setVideoOverlay("")}>
      <IoClose className={stl.close} />
      <div className={stl.videoModal}>
        <iframe
          onClick={(e) => e.stopPropagation()}
          className={stl.videoFrame}
          src={`https://www.youtube.com/embed/${videoOverlay}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoOverlay;
