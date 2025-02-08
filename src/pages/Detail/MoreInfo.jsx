import { useState } from "react";
import BtnMoreInfo from "./btnMoreInfo";
import PropTypes from "prop-types";
import Details from "./Details";
import Recommends from "./Recommends";
import Episodes from "./Episodes";

MoreInfo.propTypes = {
  data: PropTypes.object,
  media_type: PropTypes.string.isRequired,
};

export default function MoreInfo({ media_type, data }) {
  const [page, setPage] = useState("overview");
  return (
    <div className="position-relative z-2 mb-5">
      {/* Buttons */}
      <div
        className="d-flex gap-4 my-4"
        style={{ borderBottom: "2px solid #4B4B57" }}
      >
        <BtnMoreInfo
          className={`${page === "overview" && "btn-more-info-active"}`}
          setPage={setPage}
        >
          overview
        </BtnMoreInfo>
        {media_type === "tv" && (
          <BtnMoreInfo
            className={`${page === "episodes" && "btn-more-info-active"}`}
            setPage={setPage}
          >
            episodes
          </BtnMoreInfo>
        )}
        <BtnMoreInfo
          className={`${page === "details" && "btn-more-info-active"}`}
          setPage={setPage}
        >
          details
        </BtnMoreInfo>
        <BtnMoreInfo
          className={`${page === "recommends" && "btn-more-info-active"}`}
          setPage={setPage}
        >
          recommends
        </BtnMoreInfo>
      </div>
      {/* Pages */}
      {page === "overview" && (
        <div className="text-white">
          <h3 className="mb-4">{data.name}</h3>
          <p>{data.overview}</p>
        </div>
      )}
      {page === "details" && <Details data={data} />}
      {page === "recommends" && <Recommends media_type={media_type} />}
      {page === "episodes" && <Episodes media_type={media_type} data={data.seasons} />}
    </div>
  );
}
