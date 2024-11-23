import stl from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={stl.ripple}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
