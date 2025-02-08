import { useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import tmdbAPI from "../../services/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useMemo } from "react";
import RunTimeIcon from "../../components/Icons/RunTimeIcon";
import StarsIcon from "../../components/Icons/StarsIcon";
import GenresList from "./GenresList";
import PlayBtns from "./PlayBtns";
import MoreInfo from "./MoreInfo";

Detail.propTypes = {
  media_type: PropTypes.string,
};

export default function Detail({ media_type }) {
  const { id } = useParams();

  // Set navbar fixed on top
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
      navbar.classList.add("position-fixed", "top-0");
    }
    return () => {
      if (navbar) {
        navbar.classList.remove("position-fixed", "top-0");
      }
    };
  }, []);

  const detailsQuery = useQuery({
    queryKey: [`details-${media_type}`, id],
    queryFn: () => tmdbAPI.getDetail(media_type, +id),
  });

  const castQuery = useQuery({
    queryKey: [`cast-${media_type}`, id],
    queryFn: () => tmdbAPI.getCast(media_type, +id),
  });

  const details = useMemo(() => {
    const data = detailsQuery.data?.data;
    return {
      ...data,
      name: data?.title || data?.name,
      first_release: new Date(
        data?.release_date || data?.first_air_date
      ).getFullYear(),
      last_release: new Date(data?.last_air_date).getFullYear(),
      stars: parseFloat(data?.vote_average.toFixed(2)),
    };
  });

  const cast = useMemo(() => {
    return {
      actors: castQuery.data?.data.cast.slice(0, 10),
      director: castQuery.data?.data.crew.find(
        (item) => item.known_for_department === "Directing"
      ),
      creator: media_type === "tv" && detailsQuery.data?.data.created_by[0]
    };
  });

  return (
    <div className="main-detail">
      <div
        className="detail"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
        }}
      >
        <Wrapper>
          <div className="detail-content position-relative z-2 container-fluid p-0">
            <div className="row">
              {/* Poster image */}
              <div className=" col-lg-4 col-md-5 col-12">
                <LazyLoadImage
                  effect="blur"
                  loading="lazy"
                  className="w-100 rounded-4"
                  style={{}}
                  src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
                  alt={``}
                />
              </div>
              {/* Main content */}
              <div className="text-white col-lg-8 col-md-7 col-12 d-flex flex-column">
                <h1 className="fw-bold mb-3">{details.name}</h1>
                <div className="d-flex flex-row gap-4 mb-3">
                  <span>
                    {details.first_release}
                    {media_type === "tv" && ` - ${details.last_release}`}
                  </span>
                  -
                  {media_type === "movie" && (
                    <>
                      <RunTimeIcon time={details.runtime} />-
                    </>
                  )}
                  {media_type === "tv" && (
                    <>
                      <span>{details.number_of_seasons} seasons</span>-
                    </>
                  )}
                  <StarsIcon stars={details.stars} />
                </div>
                <GenresList
                  className=""
                  genres={details.genres}
                  media_type={media_type}
                />
                <div className="mt-5">
                  <p className="fs-5 mb-0">{details.tagline}</p>
                </div>
                {/* Play buttons */}
                <PlayBtns className="mt-auto" />
                {/* Cast, generes info */}
                <div className="mt-4" style={{ color: "lightgrey" }}>
                  {/* <p className="mb-0">
                    <span>Cast: </span>
                    {cast && cast.map((item) => item.name).join(", ")}
                  </p> */}
                  <p className="mb-0">
                    <span>Genres: </span>
                    {details.genres &&
                      details.genres.map((item) => item.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      {/* More info and related content */}
      <Wrapper>
        <MoreInfo media_type={media_type} data={{ ...details, cast }} />
      </Wrapper>
    </div>
  );
}
