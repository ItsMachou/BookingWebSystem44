import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  image,
  date,
  title,
  description,
  author,
  placeholderImage,
}) => {
  return (
    <>
      <Link
        to={`/blogs/${title}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        state={{ image, date, title, description, author, placeholderImage }}
      >
        <div className="p-4 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-lg bg-white dark:bg-slate-950 dark:text-white relative">
          <div className="overflow-hidden rounded-lg relative">
            <img
              src={image}
              alt={title}
              className="h-[250px] w-full object-cover transition-transform duration-700 hover:scale-110 rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-lg"></div>
          </div>

          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow-md">
            {date}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold line-clamp-1">{title}</h2>
            <p className="text-slate-500 text-xs line-clamp-1 mt-1">
              By {author}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-2 line-clamp-2">
              {description}
            </p>
            <div className="mt-3">
              <span className="text-blue-600 hover:underline text-sm">
                Read More
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
