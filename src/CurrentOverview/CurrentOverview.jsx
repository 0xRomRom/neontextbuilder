import stl from "./CurrentOverview.module.css";

const CurrentOverview = ({ priceEstimate }) => {
  return (
    <div className={stl.currentOveriew}>
      <div className={stl.nameList}>
        <span className={stl.greenName}>Indicatieprijs:</span>
        <span className={stl.priceSm}>
          €{Math.floor(priceEstimate)},- Excl. BTW
        </span>
      </div>
      <div className={stl.priceList}></div>
    </div>
  );
};

export default CurrentOverview;
