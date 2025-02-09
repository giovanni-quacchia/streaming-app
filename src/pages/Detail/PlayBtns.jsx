import { FaPlay } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import streamingAPI from "../../services/streamingAPI";

export default function PlayBtns({ className, name, media_type }) {
  // const link = useQuery({
  //   queryKey: [`${media_type}-${name}`],
  //   queryFn: () => streamingAPI.getMovieLink(name),
  // });

  const handleMoviePlay = () => {
    link.refetch();
    window.open(link.data?.data.link);
  };

  return (
    <div className={`${className}`}>
      <div className={`d-flex gap-4`}>
        {media_type === "movie" &&
          <button
            className="btn btn-light px-3 py-2 text-uppercase"
            //style={{ color: "lightgrey" }}
            type="button"
            onClick={handleMoviePlay}
          >
            <FaPlay className="me-2" />
            Play
          </button>
        }
        <button
          className="btn btn-dark border-secondary px-3 py-2 text-uppercase"
          style={{}}
          type="button"
        >
          Trailer
        </button>
        <button
          className="btn btn-dark border-secondary rounded-circle px-3 py-2 text-uppercase"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}
