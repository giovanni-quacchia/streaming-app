import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

StarsIcon.propTypes = {
  stars: PropTypes.number,
};

export default function StarsIcon({ stars }) {
  return (
    <span className="d-flex flex-row gap-2 align-items-center">
      <FaStar />
      {stars}
    </span>
  );
}
