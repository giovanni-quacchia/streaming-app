import axiosInstance from "./axiosInstance";

const tmdbAPI = {
  getTrendingMovies: (params) => {
    const url = `trending/movie/week`;
    return axiosInstance.get(url, { params });
  },
  getTrendingTV: (params) => {
    const url = `trending/tv/week`;
    return axiosInstance.get(url, { params });
  },
  getTrending: (params) => {
    const url = `trending/all/week`;
    return axiosInstance.get(url, { params });
  },
  getTheaterMovies: (params) => {
    const url = `movie/now_playing`;
    return axiosInstance.get(url, { params });
  },
  getPopularMovies: (params) => {
    const url = `movie/popular`;
    return axiosInstance.get(url, { params });
  },
  getPopularTV: (params) => {
    const url = `tv/top_rated`;
    return axiosInstance.get(url, { params });
  },
  getTopRatedMovies: (params) => {
    const url = `movie/top_rated`;
    return axiosInstance.get(url, { params });
  },
  getUpcomingMovies: (params) => {
    const url = `movie/upcoming`;
    return axiosInstance.get(url, { params });
  },
  getTopRatedTV: (params) => {
    const url = `tv/top_rated`;
    return axiosInstance.get(url, { params });
  },
  getDiscoverList: (media_type, params) => {
    const url = `discover/${media_type}`;
    return axiosInstance.get(url, { params: { ...params } });
  },
  getGenres: (media_type) => {
    const url = `genre/${media_type}/list`;
    return axiosInstance.get(url);
  },
  search: (media_type, params) => {
    const url = `search/multi?sort_by=vote_count`;
    return axiosInstance.get(url, { params });
  },
  getProviders: (media_type, params) => {
    const url = `/watch/providers/${media_type}`;
    return axiosInstance.get(url, { params });
  },
  getLogoProviders: (logo_path) => {
    const url = `/watch/providers/logo`;
    return axiosInstance.get(url, { params: { logo_path } });
  },
  getDetail: (media_type, id) => {
    const url = `${media_type}/${id}`;
    return axiosInstance.get(url);
  },
  getCast: (media_type, id) => {
    const url = `${media_type}/${id}/credits`;
    return axiosInstance.get(url);
  },
  getRecommendations: (media_type, id) => {
    const url = `${media_type}/${id}/recommendations`;
    return axiosInstance.get(url);
  },
  getSeason: (id, season_number) => {
    const url = `tv/${id}/season/${season_number}`;
    return axiosInstance.get(url);
  }
};

export default tmdbAPI;
