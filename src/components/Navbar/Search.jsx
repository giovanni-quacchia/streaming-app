export default function Search() {

  return (
    <div className="d-flex flex-row align-items-center">
      <button
        className="btn btn-dark search-btn rounded-circle"
        data-bs-toggle="modal"
        data-bs-target="#searchContext"
      >
        <i className="fs-5 bi bi-search"></i>
      </button>
    </div>
  );
}
