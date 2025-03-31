import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbAPI from "../../services/tmdbAPI";
import SeasonsDropdown from "./SeasonsDropdown";
import SwiperEpisodes from "./SwiperEpisodes";
import PropTypes from "prop-types";

Episodes.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function Episodes({ data }) {
  const { id } = useParams();
  const [season, setSeason] = useState(1);

  // Retrieve Episodes data from TMDBAPI
  const episodesQuery = useQuery({
    queryKey: ["season", id, season],
    queryFn: () => tmdbAPI.getSeason(id, season),
  });

  // Add streamingId to each episode
  const episodes = useMemo(
    () => episodesQuery.data &&
      episodesQuery.data?.data.episodes
        // .filter((ep) => ep.still_path != null)
        .map((ep) => ({ ...ep})),
    [episodesQuery.data]
  );

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
        <SwiperEpisodes episodes={episodes} />
      </div>
    </div>
  );
}
