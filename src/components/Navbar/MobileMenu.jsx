import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";

MobileMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};

export default function MobileMenu({ links }) {
  
    const navigate = useNavigate();
    const path = useLocation().pathname;
  
    return (
    <>
      <button
        className="btn me-2 d-md-none d-block"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileMenu"
        aria-controls="mobileMenu"
      >
        <i className="bi bi-list text-white fs-1"></i>
      </button>
      <div
        className="offcanvas offcanvas-start text-bg-dark"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body d-flex flex-column gap-5 align-items-center justify-content-center">
          {links.map((link, index) => (
            <Link
              key={`MobileMenu-${index}`}
              to={link?.href}
              className={`fs-4 mb-5 fw-bold text-decoration-none ${path === link?.href ? "active-link" : "text-white"}`}
              data-bs-dismiss="offcanvas"
              onClick={() => navigate(link?.href)}
            >
              {link?.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
