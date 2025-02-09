import { axiosInstance_STREAMING } from "./axiosInstance";

const streamingAPI = {
    getMovieLink: (movie) => {
        return axiosInstance_STREAMING.get(`movies/${movie}`)
    },
    getEpisodeLink: (tv, season, episode) => {
        return axiosInstance_STREAMING.get(`tv/${tv}/${season}/${episode}`)
    }
}

export default streamingAPI;