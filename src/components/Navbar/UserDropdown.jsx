import { Link } from "react-router-dom";

export default function UserDropDown() {
  const links = [
    { name: "Profile", href: "/profile", style: "rounded-top" },
    { name: "Favorites", href: "/favorites" },
    { name: "Logout", href: "/logout", style: "rounded-bottom"},
  ];

  return (
    <div className="col-2 d-flex align-items-center ms-3">
      <button
        type="button"
        className="btn btn-dark rounded-5 dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-fill">
        </i>
      </button>
      {/* Dropdown menu */}
      <ul className="user-dropdown dropdown-menu dropdown-menu-dark py-0">
        {links.map((link, index) => (
          <div key={`UserDropDown-${index}`}>
            <Link
              className={`dropdown-item py-2 rounded-0 ${link?.style}`}
              to={link?.href}
            >
              {link?.name}
            </Link>
            <hr className={`dropdown-divider my-0`} />
          </div>
        ))}
      </ul>
    </div>
  );
}
