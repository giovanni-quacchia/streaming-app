import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

Slide.propTypes = {
  data: PropTypes.object,
};

export default function Slide({ data = [] }) {
  const navigate = useNavigate();

  const img_url = `https://image.tmdb.org/t/p/original/`;

  const parsedData = useMemo(() => {
    return {
      index: data.index,
      link_name: (data.title || data.name).toLowerCase().replaceAll(" ", "-"),
      name: data.title || data.name,
      date: data.release_date || data.first_air_date,
      year: new Date(data.release_date || data.first_air_date).getFullYear(),
      vote: data.vote_average.toFixed(1),
      media_type: data.media_type === "movie" ? "movies" : "tv-series"
    };
  }, [data]);

  return (
    <div
      className={`carousel-item ${parsedData.index === 0 ? "active" : ""}`}
      onClick={() => navigate(`/${parsedData.media_type}/${parsedData.link_name}/${data.id}`)}
    >
      <img
        id={`hero-slide-${data.index}`}
        src={img_url + data.backdrop_path}
        className="carousel-image d-flex w-100 d-sm-block d-none"
        style={{
          height: "75vh", // Adjust the height for a larger view
          objectFit: "cover", // Ensure the image covers the container without stretching
        }}
        alt={`Poster: ${parsedData.name}`}
      />
      <img
        id={`hero-slide-${data.index}`}
        src={img_url + data.poster_path}
        className="carousel-image d-flex w-100 d-sm-none d-block"
        style={{
          height: "75vh", // Adjust the height for a larger view
          objectFit: "cover", // Ensure the image covers the container without stretching
        }}
        alt={`Poster: ${parsedData.name}`}
      />
      <div className="carousel-caption text-start d-flex flex-column gap-2 mb-sm-3">
        <h1>{parsedData.name}</h1>
        <div className="d-flex flex-row align-items-center gap-4">
          {/* Icon */}
          <button className="btn text-bg-primary">
            <i
              className={`bi ${
                data.media_type === "movie" ? "bi-camera-reels" : "bi-tv"
              }`}
            ></i>
          </button>
          {/* Stars */}
          <div className="d-flex flex-row">
            <i className="bi bi-star-fill me-2"></i>
            <span>{parsedData.vote}</span>
          </div>
          {/* Genres */}
          <div className="d-flex ">
            {["adventure"].map((genre, id) => (
              <Link
                key={`Slide-${parsedData.index}-genre-${id}`}
                className="text-white me-3"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-truncate-multiline">{data.overview}</p>
      </div>
    </div>
  );
}
