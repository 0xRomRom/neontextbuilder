import stl from "./Mounting.module.css";
import { useState } from "react";
import VideoPlayer from "../videoplayer/VideoPlayer";

const Mounting = ({ setMountType, setProgressState, backplateType }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setProgressState(8);
    setMountType(value);
  };

  return (
    <div className={`${stl.longestRow} ${selectedValue ? stl.checked : ""}`}>
      <div className={stl.videoWrapper}>
        <VideoPlayer videoID={"L2G1LQRGeq4"} />
      </div>
      <h3 className={stl.hero}>
        <span className={stl.green}>Montage</span> systeem
      </h3>
      <select
        className={stl.longestSelect}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="" default disabled>
          Kies methode
        </option>
        <option value="Afstandhouders">Afstandhouders</option>
        <option value="Ketting">Ketting</option>
        {backplateType === "Gekleurd" && <option value="Rails">Rails</option>}
      </select>
    </div>
  );
};

export default Mounting;
