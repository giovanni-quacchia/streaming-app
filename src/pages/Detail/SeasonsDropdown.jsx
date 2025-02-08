export default function SeasonsDropdown({data, selected_season, setSelected_season}) {
  return (
    <>
      {data && data.length != 0 && (
        <div className="dropdown dropdown-seasons">
          <button
            className="seasons-btn btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Season {selected_season}
          </button>
          <ul className="dropdown-menu dropdown-menu-dark w-auto">
            {data &&
              data.map(({ name, season_number, episode_count }, i) => (
                <li className="" key={`season-${i}`}>
                  <a
                    className="dropdown-item w-100"
                    href="#"
                    onClick={() => setSelected_season(season_number)}
                  >
                    {season_number === 0 ? name : `Season ${season_number}`}
                    <span> {`(${episode_count} episodes)`}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
