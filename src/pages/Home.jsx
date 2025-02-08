import { useQuery } from "@tanstack/react-query";
import HeroSlide from "../components/HeroSlide/HeroSlide";
import ListMovie from "../components/ListMovie/ListMovie";
import Wrapper from "../components/Wrapper";
import tmdbAPI from "../services/tmdbAPI";
import GridContainer from "../components/GridContainer/GridContainer";
import MovieCard from "../components/ListMovie/MovieCard";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Set navbar fixed on top
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
      navbar.classList.add("position-fixed", "top-0");
    }
    return () => {
      if (navbar){
        navbar.classList.remove("position-fixed", "top-0");
      }
    }
  }, []);

  const sections = [
    {
      title: "Top Trending",
      query: useQuery({
        queryKey: ["trending"],
        queryFn: () => tmdbAPI.getTrendingMovies(),
      }),
    },
    {
      title: "New in Theaters",
      media_type: "movie",
      query: useQuery({
        queryKey: ["theater"],
        queryFn: () => tmdbAPI.getTheaterMovies(),
      }),
    },
    {
      title: "Trending TV series",
      media_type: "tv",
      query: useQuery({
        queryKey: ["topRatedTV"],
        queryFn: () => tmdbAPI.getTrendingTV(),
      }),
    },
  ];

  const movies_tv_query = [
    useQuery({
      queryKey: ["movies"],
      queryFn: () =>
        tmdbAPI.getDiscoverList("movie", { sort_by: "vote_count.desc" }),
    }),
    useQuery({
      queryKey: ["tv"],
      queryFn: () =>
        tmdbAPI.getDiscoverList("tv", { sort_by: "vote_count.desc" }),
    }),
  ];

  const movies_tv_data = useMemo(() => {
    return [
      {
        title: "Movies",
        type: "movies",
        data: movies_tv_query[0].data?.data.results.slice(0, 12) || [],
        href: "/movies",
      },
      {
        title: "TV Series",
        type: "tv-series",
        data: movies_tv_query[1].data?.data.results.slice(0, 12) || [],
        href: "/tv-series",
      },
    ];
  });

  return (
    <>
      <HeroSlide></HeroSlide>

      {sections.map((section, _) => (
        <section key={section.title}>
          <Wrapper className="">
            <ListMovie
              title={section.title}
              media_type={section.media_type || "both"}
              data={section.query.data?.data.results}
            ></ListMovie>
          </Wrapper>
        </section>
      ))}

      {movies_tv_data.map((data, index) => (
        <section key={data.title} className="my-4">
          <Wrapper className="">
            <div className="d-flex flex-row justify-content-between">
              <h1 className="text-white">{data.title}</h1>
              <Link to={data.href} className="" style={{ color: "#00aac0" }}>
                View all <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
            </div>

            <GridContainer className="justify-content-around">
              {data.data.map((content, _) => {
                return (
                  <div
                    key={`${content.title}-${content.id}`}
                    className="list-movies py-md-4 p-2"
                  >
                    <MovieCard data={content} media_type={index === 0 ? "movie" : "tv"} />
                  </div>
                );
              })}
            </GridContainer>
          </Wrapper>
        </section>
      ))}
    </>
  );
}
