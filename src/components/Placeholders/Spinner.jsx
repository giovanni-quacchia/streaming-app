import PropTypes from "prop-types";

Spinner.propTypes = {
  className: PropTypes.string
}

export default function Spinner({className}) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${className}`}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
