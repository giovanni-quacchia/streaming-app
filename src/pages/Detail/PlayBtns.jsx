import { FaPlay } from "react-icons/fa";

export default function PlayBtns({ className }) {
  return (
    <div className={`${className}`}>
      <div className={`d-flex gap-4`}>
        <button
          className="btn btn-light px-3 py-2 text-uppercase"
          //style={{ color: "lightgrey" }}
          type="button"
        >
          <FaPlay className="me-2" />
          Play
        </button>
        <button
          className="btn btn-dark border-secondary px-3 py-2 text-uppercase"
          style={{}}
          type="button"
        >
          Trailer
        </button>
        <button
          className="btn btn-dark border-secondary rounded-circle px-3 py-2 text-uppercase"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}
