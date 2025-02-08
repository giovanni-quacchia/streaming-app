import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbAPI from "../../services/tmdbAPI";
import SeasonsDropdown from "./SeasonsDropdown";
import SwiperEpisodes from "./SwiperEpisodes";

export default function Episodes({ data }) {
  const { id } = useParams();
  const [season, setSeason] = useState(1);

  const SeasonsQuery = useQuery({
    queryKey: ["season", id, season],
    queryFn: () => tmdbAPI.getSeason(id, season),
  });

  const episodes = useMemo(() =>
    SeasonsQuery.data?.data.episodes.filter((ep) => ep.still_path != null)
  );

  console.log(episodes);

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
