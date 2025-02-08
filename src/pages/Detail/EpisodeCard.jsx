import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaPlay } from "react-icons/fa";

export default function EpisodeCard({ episode }) {
  useEffect(() => {
    const playBtn = document.getElementById(
      `play-ep-${episode.episode_number}`
    );
    const card = document.getElementById(
      `card-episode-${episode.episode_number}`
    );

    if (card && playBtn) {
      const showButton = () => playBtn.classList.remove("d-none");
      const hideButton = () => playBtn.classList.add("d-none");

      card.addEventListener("mouseenter", showButton);
      card.addEventListener("mouseleave", hideButton);

      return () => {
        card.removeEventListener("mouseenter", showButton);
        card.removeEventListener("mouseleave", hideButton);
      };
    }
  }, [episode.episode_number]);

  return (
    <div
      id={`card-episode-${episode.episode_number}`}
      className="card-episode card border-0 user-select-none"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="position-relative">
        <div
          id={`play-ep-${episode.episode_number}`}
          className="position-absolute d-flex w-100 h-100 justify-content-center align-items-center d-none"
        >
          <button
            className="btn text-white border z-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
              width: "50px",
              height: "50px",
            }}
          >
            <FaPlay />
          </button>
        </div>
        <LazyLoadImage
          loading="lazy"
          effect="blur"
          src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
          className="card-img-top rounded-1"
          alt="..."
        />
        <div className="text-white fs-4 position-absolute bottom-0 ps-2">
          {episode.episode_number}
        </div>
      </div>
      <div className="card-body text-white px-0" style={{ fontSize: "70%" }}>
        <p className="card-title fw-bold">{episode.name}</p>
        <p className="card-text" style={{ color: "grey" }}>
          {episode.overview}
        </p>
      </div>
    </div>
  );
}
