import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom"

PlayBtns.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  media_type: PropTypes.string,
  streamingSlug: PropTypes.string,
};

export default function PlayBtns({ streamingSlug, className, media_type }) {

  const navigate = useNavigate();

  const handleMoviePlay = () => {
    // animation
    const body = document.body;
    body.classList.add("playing")

    setTimeout(() => {
      navigate(`/player/${streamingSlug}`)
      body.classList.remove("playing")
    }, 1400)
  };

  return (
    <div className={`${className}`}>
      <div className={`d-flex gap-4`}>
        {media_type === "movie" && (
          <button
            className="btn btn-light px-3 py-2 text-uppercase"
            type="button"
            onClick={handleMoviePlay}
          >
            <FaPlay className="me-2" />
            Play
          </button>
        )}

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
