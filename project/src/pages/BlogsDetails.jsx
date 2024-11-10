import React from "react";
import { useLocation } from "react-router-dom";
import BlogsComp from "../components/Blogs/BlogsComp";

const BlogsDetails = () => {
  const location = useLocation();
  const { image, date, title, description, author, placeholderImage } =
    location.state;

  return (
    <div className="pt-20">
      <div className="h-[300px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="mx-auto h-[300px] w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>
      <div className="container">
        <p className="text-slate-600 text-sm py-3">
          written by {author} on {date}
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p>{description}</p>

        {/* Image placeholder below the description */}
        <div className="mt-4">
          <img
            src={placeholderImage} 
            alt="Placeholder"
            className="w-full h-auto mt-4 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* All Blogs Section */}
      <BlogsComp />
    </div>
  );
};

export default BlogsDetails;
