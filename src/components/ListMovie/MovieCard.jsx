import PropTypes from "prop-types";
import { useMemo } from "react";
/* Load images only when effectivly viewable */
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

MovieCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  media_type: PropTypes.string
};

export default function MovieCard({ data, className, media_type }) {

  const detail_page = media_type === "movie" ? 
    "movies" : "tv-series"

  const parsedData = useMemo(() => {
    if(data.length != 0){
      return {
        name: data.title || data.name,
        link_name: (data.title || data.name).toLowerCase().replaceAll(" ", "-"),
        date: data.release_date || data.first_air_date,
        year: new Date(data.release_date || data.first_air_date).getFullYear(),
        vote: data.vote_average.toFixed(1),
        img: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        media_type: media_type || data.media_type === "movie" ? "movies" : "tv-series"
      };
    } else {
      return []
    }
  }, [data]);

  return (
    <Link
      className={`movie-card card border-0 ${className} w-100`}
      style={{ backgroundColor: "transparent" }}
      to={`/${detail_page}/${parsedData.link_name}/${data.id}`}
    >
      <LazyLoadImage
        effect="blur"
        loading="lazy"
        className="w-100 h-100 rounded-3"
        src={parsedData.img}
        alt={`Poster-${parsedData.name}`}
      />
      <div className="card-img-overlay text-white z-2 d-flex flex-column align-self-end">
        <h5 className="card-title">{parsedData.name}</h5>
        <div className="d-flex flex-row gap-2" style={{ fontSize: "80%" }}>
          <span>{parsedData.year}</span>
          <span>
            <i className="bi bi-star-fill me-2"></i>
            {parsedData.vote}
          </span>
        </div>
      </div>
    </Link>
  );
}
