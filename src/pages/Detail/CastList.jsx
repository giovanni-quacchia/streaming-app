import PropTypes from "prop-types";

CastList.propTypes = {
  cast: PropTypes.array,
};

export default function CastList({ cast }) {
  return (
    <div className="d-flex flex-row flex-wrap gap-4">
      {cast &&
        cast.map((item) => (
          <div key={`cast-${item.id}`} className="d-flex align-items-center gap-2">
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="rounded-circle object-fit-cover"
              style={{width: "3em", height: "3em"}}
            />
            <span style={{color: "lightgrey"}}>{item.name}</span>
          </div>
        ))}
    </div>
  );
}
