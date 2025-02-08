import { useEffect, useMemo, useRef, useState } from "react";
import GridContainer from "../GridContainer/GridContainer";
import { useQuery } from "@tanstack/react-query";
import tmdbAPI from "../../services/tmdbAPI";
import MovieCard from "../ListMovie/MovieCard";

export default function ModalSearch() {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const modalElement = document.getElementById("searchContext");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }

    const delBtn = document.getElementById("delBtn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        setInput("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, []);

  const { data:dataQuery, refetch } = useQuery({
    queryKey: [`latest_${"movie"}`],
    queryFn: () => tmdbAPI.search("movie", {query: input || ""}),
    keepPreviousData: true,
    retry: 2,
  });

  const data = useMemo(() => {
    const res = dataQuery?.data.results.filter(item => item.media_type != "person" && item.popularity > 6) || []
    res.sort((a,b) => b.vote_average - a.vote_average)
    return res
  })

  useEffect(() => {
    refetch();
  },[input])

  return (
    <div
      className="modal fade"
      id="searchContext"
      aria-labelledby="searchContext"
      aria-hidden="true"
      tabIndex="-1"
    >
      <div className="modal-dialog" style={{ maxWidth: "90vw" }}>
        <div className="modal-content" style={{ backgroundColor: "#141921" }}>
          <div className="modal-body">
            <div className="input-group p-1">
              <button
                className="input-group-text pe-1"
                style={{ backgroundColor: "#33373d" }}
                onClick={() => setInput("")}
                disabled
              >
                <i className="bi bi-search text-white"></i>
              </button>
              <input
                ref={inputRef}
                type="text"
                className="form-control text-white fw-semibold"
                placeholder="Search"
                value={input}
                style={{ backgroundColor: "#33373d" }}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button
                id="delBtn"
                className="input-group-text"
                style={{ backgroundColor: "#33373d" }}
                disabled={input === ""}
              >
                <i className="bi bi-x text-white fs-4"></i>
              </button>
            </div>
            {data && input && <div className="p-1 mt-5">
              <GridContainer className="justify-content-around mb-3">
                {data.map((item, _) => {
                  return (
                    <div
                      key={`${item.title}-${item.id}`}
                      className={`list-movies py-md-4 p-2`}
                      data-bs-dismiss="modal"
                    >
                      <MovieCard data={item} media_type={item.media_type} />
                    </div>
                  );
                })}
              </GridContainer>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
