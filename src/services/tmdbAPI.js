import {axiosInstance_TMDB} from "./axiosInstance";

const tmdbAPI = {
  getTrendingMovies: (params) => {
    const url = `trending/movie/week`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getTrendingTV: (params) => {
    const url = `trending/tv/week`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getTrending: (params) => {
    const url = `trending/all/week`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getTheaterMovies: (params) => {
    const url = `movie/now_playing`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getPopularMovies: (params) => {
    const url = `movie/popular`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getPopularTV: (params) => {
    const url = `tv/top_rated`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getTopRatedMovies: (params) => {
    const url = `movie/top_rated`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getUpcomingMovies: (params) => {
    const url = `movie/upcoming`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getTopRatedTV: (params) => {
    const url = `tv/top_rated`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getDiscoverList: (media_type, params) => {
    const url = `discover/${media_type}`;
    return axiosInstance_TMDB.get(url, { params: { ...params } });
  },
  getGenres: (media_type) => {
    const url = `genre/${media_type}/list`;
    return axiosInstance_TMDB.get(url);
  },
  search: (media_type, params) => {
    const url = `search/multi?sort_by=vote_count`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getProviders: (media_type, params) => {
    const url = `/watch/providers/${media_type}`;
    return axiosInstance_TMDB.get(url, { params });
  },
  getLogoProviders: (logo_path) => {
    const url = `/watch/providers/logo`;
    return axiosInstance_TMDB.get(url, { params: { logo_path } });
  },
  getDetail: (media_type, id) => {
    const url = `${media_type}/${id}`;
    return axiosInstance_TMDB.get(url);
  },
  getCast: (media_type, id) => {
    const url = `${media_type}/${id}/credits`;
    return axiosInstance_TMDB.get(url);
  },
  getRecommendations: (media_type, id) => {
    const url = `${media_type}/${id}/recommendations`;
    return axiosInstance_TMDB.get(url);
  },
  getSeason: (id, season_number) => {
    const url = `tv/${id}/season/${season_number}`;
    return axiosInstance_TMDB.get(url);
  }
};

export default tmdbAPI;
