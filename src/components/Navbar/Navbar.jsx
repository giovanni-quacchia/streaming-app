import Wrapper from "../Wrapper";
import Logo from "./Logo";
import Search from "./Search";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SignInBtn from "./SignInBtn";
import UserDropDown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import PropTypes from "prop-types";
import ModalSearch from "./ModalSearch";

Navbar.propTypes = {
  className: PropTypes.string,
};

export default function Navbar({ className }) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV-Series", href: "/tv-series" },
  ];

  const path = useLocation().pathname;

  // TODO: use auth as a context to manage login-signup,...
  const auth = useState({ isLogged: false });

  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    window.addEventListener("scroll", () => {
      if(window.scrollY === 0){
        navbar.style.backgroundColor = "transparent"
      } else {
        navbar.style.backgroundColor = "black"
      }
    })
  }, []);

  return (
    <>
      <ModalSearch />
      {/* navbar fixed on top and keep space: position-sticky top-0 */}
      {/* navbar fixed on top without keeping space: position-fixed top-0 */}
      <header
        id="main-navbar"
        className={`${className} z-3`}
        onScroll={() => console.log("ciao")}
      >
        <Wrapper className="d-flex flex-row ">
          <MobileMenu links={links} />
          <Logo />

          {/* Links */}
          <nav className="menu d-flex align-items-center justify-content-evenly w-100 mt-1 d-md-flex d-none">
            {links.map((link, index) => (
              <NavLink
                key={`Navbar-${index}`}
                to={link?.href}
                style={{ color: path === link?.href ? "#00ACC1" : "" }}
              >
                {link?.name}
              </NavLink>
            ))}
          </nav>

          <div className="d-flex w-100 justify-content-end">
            <Search />
            {!auth?.isLogged ? <SignInBtn /> : <UserDropDown />}
          </div>
        </Wrapper>
      </header>
    </>
  );
}
