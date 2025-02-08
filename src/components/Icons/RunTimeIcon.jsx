import PropTypes from "prop-types";
import { FaRegClock } from "react-icons/fa6";

RunTimeIcon.propTypes = {
  time: PropTypes.number,
};

export default function RunTimeIcon({ time }) {
  return (
    <span className="d-flex flex-row gap-2 align-items-center">
      <FaRegClock/>
      {time}
    </span>
  );
}
