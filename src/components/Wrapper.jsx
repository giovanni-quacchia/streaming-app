import classNames from "classnames";
import PropTypes from "prop-types";

// specify types for components props
Wrapper.propTypes = {
  children: PropTypes.node, // node allows single element, multiple elements, strings and numbers
  className: PropTypes.string,
};

export default function Wrapper({ className, children }) {
  return (
    <div
      className={classNames(
        "container-fluid col-lg-9 col-sm-11 col-12 mx-auto px-lg-0 px-sm-3 px-3",
        className
      )}
    >
      {children}
    </div>
  );
}
