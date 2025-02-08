import PropTypes from "prop-types";

DropDown.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.string,
  onFilters: PropTypes.func,
  icon: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  renderItems: PropTypes.func,
};

export default function DropDown({
  name,
  className,
  icon,
  selected,
  renderItems,
}) {
  /* 
  Allow dropdown-menu to extend beyond container div:
  - parent: position-static
  - dropdown-menu: position-absolute
  */
  return (
    <div className={`dropdown ${className} position-static`}>
      <button
        className="btn btn-dark text-capitalize d-flex gap-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className={`bi ${icon}`}></i>
        {name}
        <span className="" style={{ color: "#00aac0" }}>
          {selected}
        </span>
      </button>
      <div
        className="dropdown-menu position-absolute"
        style={{ backgroundColor: "#212529", color: "lightgrey" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container text-start">
          <div className="row g-0">{renderItems()}</div>
        </div>
      </div>
    </div>
  );
}

DropItem.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onFilters: PropTypes.func.isRequired,
  checked: PropTypes.bool
};

export function DropItem({ name, item, onFilters, checked }) {
  
  const handleChange = (e) => {
    let target = e.target;

    if (target.checked) {
      onFilters(name, parseInt(target.value), "add");
    } else {
      onFilters(name, parseInt(target.value), "remove");
    }
  };

  const handleClickOutside = (e, value) => {
    // let handleChange do the work when cliking direclty on input or label
    if (e.target.tagName === "INPUT" || e.target.tagName === "LABEL") return;
    document.getElementById(`check-${name}-${value}`).click();
  };

  return (
    <div
      className="dropdown-element p-2 rounded-1 col-md-3 col-sm-4 col-6"
      key={`dropdown-${name}-${item.id}`}
      onClick={(e) => handleClickOutside(e, item.id)}
    >
      <div className="form-check">
        <input
          className="form-check-input border-0"
          style={{ backgroundColor: "#434B53" }}
          type="checkbox"
          value={item.id}
          checked={checked}
          onChange={handleChange}
          id={`check-${name}-${item.id}`}
        />
        <label
          className="form-check-label"
          style={{ fontSize: "0.8em" }}
          htmlFor={`check-${name}-${item.id}`}
        >
          {item.name}
        </label>
      </div>
    </div>
  );
}
