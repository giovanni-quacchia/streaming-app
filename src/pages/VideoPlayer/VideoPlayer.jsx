import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import streamingAPI from "../../services/streamingAPI";
import Spinner from "../../components/Placeholders/Spinner";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer() {
  const { slug } = useParams();

  // TV params
  const { episode_id } = useParams();

  const videoRef = useRef(null);
  const linkQuery = useQuery({
    queryKey: [`Streaming-${slug}`],
    queryFn: () => episode_id ? streamingAPI.getEpisodeLink(slug,episode_id) : streamingAPI.getMovieLink(slug),
    enabled: true,
  });

  // Set HLS (Http livestreaming)
  useEffect(() => {
    const hls = new Hls();

    if (Hls.isSupported() && videoRef.current) {
      hls.loadSource(linkQuery.data?.data.link);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.play();
      });
      
    }
    return () => {
      // cleanup (when component destroyed or when useEffect runs twice on StrictMode)
      hls.destroy();
    };
  }, [linkQuery.data]);

  if (linkQuery.isError)
    return (
      <div
        className="d-flex justify-content-center align-items-center text-white fs-4"
        style={{ minHeight: "100vh" }}
      >
        Error
      </div>
    ); // TODO: create error page

  if (linkQuery.isLoading)
    return <Spinner className="position-absolute top-0 w-100 h-100" />;

  return (
    <div className="d-flex justify-content-center overflow-hidden">
      {/* <ReactPlayer
        ref={videoRef}
        url={linkQuery.data?.data.link}
        controls={true}
        width="100%"
        height="100vh"
      /> */}
      <video
        id="video"
        width="100%"
        controls
        ref={videoRef}
        style={{ minHeight: "100vh" }}
      ></video>
    </div>
    // <div className="bg-black text-white d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
    //     ciao
    // </div>
  );
}
