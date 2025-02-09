import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbAPI from "../../services/tmdbAPI";
import SeasonsDropdown from "./SeasonsDropdown";
import SwiperEpisodes from "./SwiperEpisodes";
import PropTypes from "prop-types";
import streamingAPI from "../../services/streamingAPI";

Episodes.propTypes = {
  data: PropTypes.array.isRequired,
  streamingSlug: PropTypes.string,
};

export default function Episodes({ data, streamingSlug }) {
  const { id } = useParams();
  const [season, setSeason] = useState(1);

  // Retrieve Episodes data from TMDBAPI
  const episodesQuery = useQuery({
    queryKey: ["season", id, season],
    queryFn: () => tmdbAPI.getSeason(id, season),
  });

  // Retrieve Streaming ids for episodes
  const seasonIdsQuery = useQuery({
    queryKey: ["seasonIds", id, season],
    queryFn: () => streamingAPI.getSeasonIds(streamingSlug, season),
    enabled: !!streamingSlug,
  });

  // Add streamingId to each episode
  const episodes = useMemo(
    () => episodesQuery.data && seasonIdsQuery.data &&
      episodesQuery.data?.data.episodes
        // .filter((ep) => ep.still_path != null)
        .map((ep, index) => ({ ...ep, streamingId: seasonIdsQuery.data?.data.idS[index]?.id})),
    [episodesQuery.data, seasonIdsQuery.data]
  );

  console.log(seasonIdsQuery.data)

  return (
    <div className="text-white mb-5">
      <div className="d-flex flex-row justify-content-between mb-4">
        <h3>Episodes</h3>
        <SeasonsDropdown
          selected_season={season}
          setSelected_season={setSeason}
          data={data}
        />
      </div>
      <div>
        <SwiperEpisodes streamingSlug={streamingSlug} episodes={episodes} />
      </div>
    </div>
  );
}
