import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import tmdbAPI from "../../services/tmdbAPI";
import utils from "../../services/utils";
import streamingAPI from "../../services/streamingAPI";
import Hls from "hls.js";

export default function VideoPlayer() {
  const { id, season_number, episode_number, media_type } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);

  const contentQuery = useQuery({
    queryKey: ["content", id],
    queryFn: () => tmdbAPI.getDetail(media_type, id),
  });

  const episodeQuery = useQuery({
    queryKey: ["episode", id, season_number, episode_number],
    queryFn: () => tmdbAPI.getEpisodeDetails(id, season_number, episode_number),
    enabled: media_type === "tv",
  });

  const content = useMemo(() => {
    const data = contentQuery.data?.data;
    return {
      name: data?.title || data?.original_name,
      slug: utils.getSlug(data?.title ?? data?.original_name ?? ""), // ?? works as coalesce
      episode_name: episodeQuery.data?.data.name || "",
    };
  }, [contentQuery.data, episodeQuery.data]);

  const local_path =
    media_type === "movie"
      ? `/videos/movies/${content?.slug}.mp4`
      : `/videos/tv/${content?.slug}/S${season_number}/E${episode_number}.mp4`;

  // streaming logic
  // TODO: reasearch is not always correct (avengers)
  const streamingIdQuery = useQuery({
    queryKey: ["streaming", content?.slug],
    queryFn: () => streamingAPI.getContentSlug(content?.slug),
    enabled: !!content?.slug,
  });
  // TODO: adgjust for tv series too
  const movieLinkQuery = useQuery({
    queryKey: ["movieLink", streamingIdQuery.data?.data.link],
    queryFn: () => streamingAPI.getMovieLink(streamingIdQuery.data?.data.link),
    enabled: !!streamingIdQuery.data?.data.link,
  });
  const ext_link = movieLinkQuery.data?.data.link;
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const handleSrcChange = () => {
    if (videoRef.current) {
      if (isStreaming) {
        // If switching to local video, destroy HLS instance first
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        videoRef.current.src = local_path;
        videoRef.current.load(); // Ensure reloading of source
        videoRef.current.play();
      } else if (Hls.isSupported() && ext_link) {
        // Destroy existing HLS instance before creating a new one
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hls = new Hls();
        hls.loadSource(ext_link);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
        hlsRef.current = hls;
      }
      setIsStreaming(!isStreaming);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-white"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-row align-items-baseline mt-5">
        <div
          className="p-3 d-flex flex-column align-items-start flex-grow-1"
          style={{ width: "50vw" }}
        >
          <h1>{content.name}</h1>
          {media_type === "tv" && (
            <span>{`S${season_number}:E${episode_number} - ${content.episode_name}`}</span>
          )}
        </div>
        <div className="text-end" style={{ width: "20vw" }}>
          <button className="btn btn-primary" onClick={handleSrcChange}>
            {isStreaming ? "Streaming" : "Local"}{" "}
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        className="rounded-3 mb-4"
        controls
        style={{ width: "70vw" }}
      />
      <div
        className="text-white p-3 d-flex flex-column align-items-start"
        style={{ width: "70vw" }}
      >
        {!isStreaming && <p>Looking for file: {local_path}</p>}
      </div>
    </div>
  );
}
