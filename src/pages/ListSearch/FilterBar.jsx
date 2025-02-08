import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import tmdbAPI from "../../services/tmdbAPI";
import DropDown from "./DropDown";
import { DropItem } from "./DropDown";
import React from "react";
import Icons from "../../components/Icons/icons";

FilterBar.propTypes = {
  media_type: PropTypes.string,
  handleFilter: PropTypes.func,
};

export default function FilterBar({ media_type, handleFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState({
    genres: [],
    providers: [],
  });

  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      genres: searchParams.getAll("genres").map((item) => parseInt(item)),
      providers: searchParams.getAll("providers").map((item) => parseInt(item)),
    }));
  }, [searchParams]);

  const handleFilters = (name, value, action) => {
    if (action === "add") {
      setFilterData((prev) => ({
        ...prev,
        [name]: [...(prev[name] || []), value],
      }));
    } else if (action === "remove") {
      setFilterData((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== value),
      }));
    }
  };

  const genresQuery = useQuery({
    queryKey: [`genres_${media_type}`],
    queryFn: () => tmdbAPI.getGenres(`${media_type}`),
  });

  const providersQuery = useQuery({
    queryKey: [`providers_${media_type}`],
    queryFn: () =>
      tmdbAPI.getProviders(`${media_type}`, { watch_region: "IT" }),
  });

  const providers = useMemo(() => {
    return providersQuery.data?.data.results.slice(0, 10).map((item) => ({
      id: item.provider_id,
      name: item.provider_name,
    }));
  });

  let genresSelectedString = useMemo(() => {
    if (filterData.genres.length === 0) return "All";
    if (filterData.genres.length > 1)
      return `${filterData.genres.length} selected`;
    return (
      genresQuery.data?.data.genres.find(
        (item) => item.id === +filterData.genres[0]
      )?.name || "All"
    );
  });

  let providersSelectedString = useMemo(() => {
    return (
      <div>
        {filterData?.providers.length > 1 ? (
          <span>2 selected</span>
        ) : (
          filterData.providers.map((provider, index) => (
            <React.Fragment key={`icon-provider-${index}`}>
              {providers && Icons[
                // "Apple TV" --> "apple"
                providers
                  .find((item) => item.id === provider)
                  ?.name.split(" ")[0]
                  .toLowerCase()
              ] || ""}
            </React.Fragment>
          ))
        )}
      </div>
    );
  });

  // render items
  const renderGenres = () => {
    if (!genresQuery.data) return;
    return genresQuery.data.data.genres.map((genre) => (
      <DropItem
        key={`dropdown-genres-${genre.id}`}
        name="genres"
        item={genre}
        onFilters={handleFilters}
        checked={filterData.genres.includes(genre.id)}
      />
    ));
  };

  const renderProviders = () => {
    if (!providers) return;
    return providers.map((item) => (
      <DropItem
        key={`dropdown-provider-${item.id}`}
        name="providers"
        item={item}
        onFilters={handleFilters}
        checked={filterData.providers.includes(item.id)}
      />
    ));
  };

  return (
    <div className="d-flex gap-3">
      <DropDown
        className=""
        name="genres"
        icon="bi-folder"
        renderItems={renderGenres}
        selected={genresSelectedString}
      />
      <DropDown
        className=""
        name="providers"
        icon="bi-cast"
        renderItems={renderProviders}
        selected={providersSelectedString}
      />
      <button
        className="btn btn-primary"
        onClick={() => handleFilter(filterData)}
      >
        <i className="bi bi-funnel-fill me-2"></i>
        Filter
      </button>

      {/* <div className="position-relative" style={{ marginLeft: "16em" }}>
        
      </div> */}
    </div>
  );
}
