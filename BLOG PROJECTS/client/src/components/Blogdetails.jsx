import React from "react";

const Blogdetails = ({ title, author, content, tags, publishedDate }) => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border border-gray-200 rounded-lg shadow-md p-6">
        {/* Title */}
        <h3 className="text-2xl font-semibold font-sans text-gray-800 mb-4">{title}</h3>
        <hr className="mb-4" />

        {/* Author */}
        <div className="flex items-center mb-4">
          <b className="font-sans text-gray-700 w-1/4">Author:</b>
          <p className="text-gray-600">{author}</p>
        </div>

        {/* Content */}
        <div className="flex mb-4">
          <b className="font-sans text-gray-700 w-1/4">Content:</b>
          <p className="text-gray-600 w-3/4 text-justify">{content}</p>
        </div>

        {/* Tags */}
        <div className="flex items-center mb-4">
          <b className="font-sans text-gray-700 w-1/4">Tags:</b>
          <p className="text-gray-600">{tags}</p>
        </div>

        {/* Published Date */}
        <div className="flex items-center">
          <b className="font-sans text-gray-700 w-1/4">Published Date:</b>
          <p className="text-gray-600">{publishedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
