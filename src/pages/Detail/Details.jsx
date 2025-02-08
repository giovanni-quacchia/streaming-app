import PropTypes from "prop-types";

Details.propTypes = {
  data: PropTypes.object,
};

export default function Details({ data }) {
  const { name, cast } = data;
  const { actors, director, creator } = cast;

  return (
    <div className="text-white">
      <div className="row">
        <h3 className="mb-4">{name}</h3>
        {/* Actors */}
        <div className="col-6 me-1">
          <p style={{ color: "#B3B3B3" }}>Cast</p>
          <div className="d-flex">
            <div className="w-100">
              {actors &&
                actors.slice(0, Math.ceil(actors.length / 2)).map((item) => (
                  <p key={`details-cast-${item.id}`} className="mb-1">
                    {item.name}
                  </p>
                ))}
            </div>
            <div className="w-100">
              {actors &&
                actors.slice(Math.ceil(actors.length / 2)).map((item) => (
                  <p key={`details-cast-${item.id}`} className="mb-1">
                    {item.name}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Director */}
        <div className="col-5 text-end">
          {director && (
            <>
              <p style={{ color: "#B3B3B3" }}>Director</p>
              <div className="w-100">{director && <p>{director.name}</p>}</div>
            </>
          )}
          {creator && (
            <>
              <p style={{ color: "#B3B3B3" }}>Created by</p>
              <div className="w-100">{creator && <p>{creator.name}</p>}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
