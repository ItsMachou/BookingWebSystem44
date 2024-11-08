import React from "react";
import NatureVid from "../assets/video/main.mp4";
import BlogsComp from "../components/Blogs/BlogsComp";
import Places from "../components/Places/Places";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/banner1.jpg";
import Banner2 from "../assets/banner1.jpg";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import BackgroundImage from "../assets/background.png";
import Cloud1 from "../assets/background2.png";
import Airplane from "../assets/background5.png";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  // Inline styles for the main background and cloud/airplane positions
  const mainStyle = {
    backgroundColor: "#0058b4",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "400vh",
    position: "relative",
    overflow: "hidden",
  };

  const cloud1Style = {
    position: "absolute",
    top: "42.1%",
    left: "5%",
    width: "455px",
    height: "auto",
    opacity: 0.8,
  };

  const cloud2Style = {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    width: "300px",
    height: "auto",
    opacity: 0.8,
  };

  const airplaneStyle = {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    width: "500px",
    top: "42%",
    height: "auto",

    animation: "fly 10s linear infinite",
  };

  // Define a smooth horizontal animation for the airplane without zooming
  React.useEffect(() => {
    const flyAnimation = `
      @keyframes fly {
        0% { transform: translateX(0); }
        50% { transform: translateX(50px); }
        100% { transform: translateX(0); }
      }
    `;
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(flyAnimation, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={mainStyle}>
      <img src={Airplane} alt="Airplane" style={airplaneStyle} />

      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="h-[700px] w-full object-cover z-[-1]"
        >
          <source src={NatureVid} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <div className="h-[700px] relative"></div>
        <Places handleOrderPopup={handleOrderPopup} />
        <BannerPic img={BannerImg} />
        <BlogsComp />
        <Banner />
        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </div>
  );
};

export default Home;
