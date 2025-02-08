import Slide from "./Slide";
import { useQuery } from "@tanstack/react-query";
import tmdbAPI from "../../services/tmdbAPI";
import { useMemo } from "react";

export default function HeroSlide() {

  const trendingQuery = useQuery({
    queryKey: ["trending"],
    queryFn: () => tmdbAPI.getTrending()
  })

  const trendingData = useMemo(() => {
    return trendingQuery.data?.data.results.slice(0,10) || []
  }, [trendingQuery.data])

  return (
    <>
      <div
        id="heroSlide"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          {trendingData.map((data, index) => (
            <Slide
              key={`HeroSlide-${index}`}
              data={{...data, index: index}}
            />
          ))}
        </div>
        <button
          className="carousel-control-prev d-sm-block d-none"
          type="button"
          data-bs-target="#heroSlide"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next d-sm-block d-none"
          type="button"
          data-bs-target="#heroSlide"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
