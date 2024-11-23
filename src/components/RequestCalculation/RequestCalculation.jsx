import stl from "./RequestCalculation.module.css";
import { BsAspectRatio } from "react-icons/bs";
import { CgExpand } from "react-icons/cg";

const RequestCalculation = ({
  aspectRatio,
  setAspectRatio,
  setProgressState,
  toggleIconBool,
  setToggleIconBool,
  setLongestSide,
  setPriceEstimate,
}) => {
  const handleNoThanks = () => {
    setProgressState(3);
    setToggleIconBool(true);
  };
  return (
    <div
      className={`${stl.requestcalculation} ${
        toggleIconBool ? stl.folded : ""
      } ${aspectRatio > 0 || toggleIconBool ? stl.checked : ""}`}
    >
      {toggleIconBool && (
        <CgExpand
          className={stl.expander}
          onClick={() => {
            setToggleIconBool(false);
            setProgressState(2);
            setLongestSide(null);
          }}
        />
      )}
      <h3 className={stl.hero}>
        {!aspectRatio && (
          <>
            Wil je een <span className={stl.pink}>indicatieprijs</span> generenen?
          </>
        )}
        {aspectRatio && !toggleIconBool && (
          <div className={stl.aspectFlex}>
            <span className={stl.opgeslagen}>Verhouding opgeslagen</span>
            <span className={stl.verhoudingenSpan}>
               {aspectRatio.toFixed(2)}{" "}
              <BsAspectRatio className={stl.aspectIcon} />
            </span>
            <span
              className={stl.berekenOpnieuw}
              onClick={() => {
                setAspectRatio(null);
                setProgressState(2);
                setPriceEstimate(null);
              }}
            >
              Bepaal opnieuw
            </span>
          </div>
        )}
      </h3>
      {!aspectRatio && !toggleIconBool && (
        <div className={stl.ctaWrap}>
          <div className={stl.btnBackground}>
            <button
              className={`${stl.cta} ${stl.cta2}`}
              onClick={handleNoThanks}
            >
              Nee bedankt
            </button>
          </div>
          <div className={stl.btnBackground}>
            <button
              className={`${stl.cta} ${stl.cta1}`}
              onClick={() => setProgressState(0)}
            >
              Graag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCalculation;
