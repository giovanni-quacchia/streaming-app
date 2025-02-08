import PropTypes from "prop-types";
import { Link } from "react-router-dom";

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string
};

export default function GenresList({ className, genres }) {
  return (
    <div className={`d-flex flex-row gap-3 ${className}`}>
      {genres &&
        genres.map((genre) => (
          <Link
            to={`./../../?genres=${genre.id}`}
            type="button"
            key={`genre-${genre.id}`}
            className="genre-btn btn btn-secondary border text-white rounded-pill"
          >
            {genre.name}
          </Link>
        ))}
    </div>
  );
}
