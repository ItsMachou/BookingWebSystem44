import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";

const About = () => {
  return (
    <>
      <div className="container pt-14">
        <div className="py-10">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            About us
          </h1>
          <p>
            At MASADYA, we believe that travel is more than just a
            destination—it's an experience that transforms you. From the quiet,
            tranquil beauty of Tokyo's hidden shrines to the awe-inspiring
            grandeur of the Taj Mahal, we take you to some of the world's most
            remarkable places. Our mission is to provide you with unforgettable
            journeys that immerse you in rich cultures, stunning landscapes, and
            unforgettable memories.
          </p>
          <br />
          <p>
            Whether you're a seasoned traveler or exploring new horizons, our
            carefully curated experiences are designed to make your trip
            extraordinary. Join us as we explore the globe, one breathtaking
            location at a time, and let us show you the beauty of the world like
            never before.
          </p>
        </div>
      </div>
      <Location />
      <BlogsComp />
    </>
  );
};

export default About;
