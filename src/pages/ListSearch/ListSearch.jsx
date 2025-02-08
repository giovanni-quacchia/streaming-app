import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import tmdbAPI from "../../services/tmdbAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import Wrapper from "../../components/Wrapper";
import FilterBar from "./FilterBar";
import GridContainer from "../../components/GridContainer/GridContainer";
import MovieCard from "../../components/ListMovie/MovieCard";
// library that tells when an element enters or leaves the viewport
import { useInView } from "react-intersection-observer";

ListSearch.propTypes = {
  media_type: PropTypes.string,
};

export default function ListSearch({ media_type }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Set navbar sticky on top
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if(navbar){
      navbar.classList.add("position-sticky","top-0")
    }
    return () => {
      if (navbar){
        navbar.classList.remove("position-sticky", "top-0");
      }
    }
  }, []);

  const params = useMemo(() => {
    let currPage = parseInt(searchParams.get("page") || "1");
    let currGenres = searchParams.getAll("genres").join("|");
    let currProviders = searchParams.getAll("providers").join("|");

    let params = {
      page: currPage,
      sort_by: "vote_count.desc",
      watch_region: "IT",
    };
    if (currGenres) {
      params.with_genres = currGenres;
    }
    if (currProviders) {
      params.with_watch_providers = currProviders;
    }
    return params;
  }, [searchParams]);

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [`latest_${media_type}`, params],
    queryFn: ({ pageParam = 1 }) =>
      tmdbAPI.getDiscoverList(media_type, { ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.page + 1;
      return nextPage <= 500 ? nextPage : undefined;
    },
    keepPreviousData: true,
    retry: 2,
  });
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading") return <p>loading</p>;
  if (status === "error") return <p>error</p>;

  const handleOnFilter = (data) => {
    setSearchParams({
      ...searchParams,
      genres: [...data.genres],
      providers: [...data.providers],
    });
  };

  // if (isError && error) {
  //     if (axios.isAxiosError(error && (error).response?.status === 404)) {
  //         return <Error404Page />
  //     }

  //     return <Error500Page />
  // }

  return (
    <div className="text-white mt-4">
      <Wrapper>
        <h2 className="mb-3" style={{ color: "lightgrey" }}>
          {media_type === "movie" ? "Movies" : "TV Shows"}
        </h2>
        <FilterBar media_type={media_type} handleFilter={handleOnFilter} />
        {data?.pages.map((page, index) => (
          <div key={`${media_type}-page-${index + 1}`}>
            <GridContainer className="justify-content-around mb-3">
              {page.data.results.map((content, _) => {
                return (
                  <div
                    key={`${content.title}-${content.id}`}
                    className={`list-movies py-md-4 p-2`}
                  >
                    <MovieCard data={content} media_type={media_type} />
                  </div>
                );
              })}
            </GridContainer>
          </div>
        ))}
        {isFetchingNextPage ? (
          <div className="text-white">loading</div>
        ) : (
          <div
            ref={ref}
            style={{ height: "50px", background: "transparent" }}
          ></div>
        )}
      </Wrapper>
    </div>
  );
}
