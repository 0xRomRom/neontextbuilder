import React, { useState } from "react";
import stl from "./LongestRow.module.css";

const LongestRow = ({ setLongestSide, setProgressState, longestSide }) => {
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState("Empty");

  // Function to handle select value change
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setLongestSide(event.target.value);
    setProgressState(4);
  };

  return (
    <div className={`${stl.longestRow} ${longestSide ? stl.checked : ""}`}>
      <h3 className={stl.hero}>
        Lengte <span className={stl.pink}>langste</span> zijde
      </h3>
      <select
        className={stl.longestSelect}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="Empty" default disabled>
          Kies een waarde
        </option>
        <option value="60cm">60cm</option>
        <option value="70cm">70cm</option>
        <option value="80cm">80cm</option>
        <option value="90cm">90cm</option>
        <option value="100cm">100cm</option>
        <option value="120cm">120cm</option>
        <option value="140cm">140cm</option>
        <option value="160cm">160cm</option>
        <option value="180cm">180cm</option>
        <option value="200cm">200cm</option>
        <option value="220cm">220cm</option>
        <option value="240cm">240cm</option>
        <option value="Groter" disabled>
          Groter? Geef aan bij opmerkingen
        </option>
      </select>
    </div>
  );
};

export default LongestRow;
