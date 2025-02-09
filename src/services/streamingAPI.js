import { axiosInstance_STREAMING } from "./axiosInstance";

const streamingAPI = {
    getContentSlug: (name) => {
        return axiosInstance_STREAMING.get(`content/${name}`)
    },
    getMovieLink: (slug) => {
        return axiosInstance_STREAMING.get(`movies/${slug}`)
    },
    getSeasonIds: (slug, season_number) => {
        return axiosInstance_STREAMING.get(`tv/${slug}/seasons/${season_number}`)
    },
    getEpisodeLink: (slug, episode_id) => {
        return axiosInstance_STREAMING.get(`tv/${slug}/episodes/${episode_id}`)
    }
}

export default streamingAPI;