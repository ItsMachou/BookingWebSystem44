import React, { useState } from "react";
import Logo from "../../assets/logo22.png";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const NavbarLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Best Places",
    link: "/best-places",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location/path

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "text-green-400" : "text-white";
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-blue-600 backdrop-blur-sm text-white shadow-white">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-16" />
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li className="py-4">
                  <Link to="/" className={getLinkClass("/")}>
                    Home
                  </Link>
                </li>
                <li className="py-4">
                  <Link to="/blogs" className={getLinkClass("/blogs")}>
                    Blogs
                  </Link>
                </li>
                <li className="py-4">
                  <Link
                    to="/best-places"
                    className={getLinkClass("/best-places")}
                  >
                    Best Places
                  </Link>
                </li>
                <li className="py-4">
                  <Link to="/about" className={getLinkClass("/about")}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-blue px-3 py-1 rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
