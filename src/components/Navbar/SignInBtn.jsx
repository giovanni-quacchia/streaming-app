export default function SignInBtn() {
  return (
    <div className="d-flex align-items-center ms-3">
      <button className="btn btn-dark rounded-5 ">
        <i className="bi bi-person-fill">
          <span className="d-md-inline-block d-none fst-normal ms-1">
            Sign in
          </span>
        </i>
      </button>
      {/* TODO: modal to sign */}
    </div>
  );
}
