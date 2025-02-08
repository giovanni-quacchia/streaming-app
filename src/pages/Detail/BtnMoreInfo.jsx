import PropTypes from "prop-types";

BtnMoreInfo.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  setPage: PropTypes.func,
};

export default function BtnMoreInfo({ children, className, setPage }) {
  return (
    <button
      onClick={() => setPage(children)}
      className={`${className} btn-more-info rounded-0 btn btn-lg bg-transparent text-uppercase`}
    >
      {children}
    </button>
  );
}
