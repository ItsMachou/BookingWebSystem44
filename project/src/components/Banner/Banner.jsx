import React from "react";
import TravelImg from "../../assets/travel.png";
import { MdFlight, MdOutlineLocalHotel } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";

const Banner = () => {
  return (
    <>
      <div className="min-h-[550px] bg-gray-100">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div data-aos="flip-up">
                <img
                  src={TravelImg}
                  alt="biryani img"
                  className="max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,255,0.5)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  Explore all corners of The world with us
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-base text-gray-600 tracking-wide leading-8"
                >
                  Join us on an unforgettable journey to the most breathtaking
                  corners of the world! From the serene temples of Tokyo to the
                  majestic beauty of the Taj Mahal, we promise an experience
                  that will leave you in awe. Discover rich cultures, explore
                  iconic landmarks, and create memories that will last a
                  lifetime.
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
