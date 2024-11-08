import React from "react";
import FooterLogo from "../../assets/logo.png";
import { FaFacebook, FaLocationArrow } from "react-icons/fa";
import NatureVid from "../../assets/video/footer.mp4";
import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Best Places",
    link: "/best-places",
  },
  {
    title: "Blogs",
    link: "/blogs",
  },
];

const Footer = () => {
  return (
    <div className="dark:bg-gray-950 py-10 relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]"
      >
        <source src={NatureVid} type="video/mp4" />
      </video>
      <div className="container flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-t-xl py-8 px-4 w-full  ">
          {/* Logo and Title */}
          <h1 className="flex items-center justify-center gap-3 text-xl sm:text-4xl font-bold mb-4">
            <img src={FooterLogo} alt="Logo" className="max-h-[60px]" />
            <span>MASADYA Travel & Tours</span>
          </h1>

          {/* Important Links */}
          <h1 className="text-2xl font-bold text-center mt-6 mb-4">
            Important Links
          </h1>
          <ul className="flex gap-6 justify-center">
            {FooterLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer hover:translate-y-[-2px] duration-300 hover:text-primary text-gray-700 dark:text-gray-200 text-1xl"
              >
                <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                  <span>&#11162;</span>
                  <span className="ml-1">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Contact Information */}
          <div className="flex items-center justify-center gap-3 mt-6 text-base">
            <a href="https://www.facebook.com/masadyatravelandtours">
              <FaFacebook className="text-2xl ml-3" />
            </a>
            <p>0915 346 4741</p>
          </div>
          {/* Address at the Bottom */}
          <div className="flex items-center justify-center gap-3 mt-8 text-base">
            <FaLocationArrow />
            <p>
              Don P. Campos Ave., Corner I, Mangubat St Brgy. Zone IV Dasmarinas
              Cavite, Dasmariñas, Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
