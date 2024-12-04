import React from "react";

const Ratings = ({ rating }) => {
  const thumbs = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      thumbs.push("👍"); // Filled thumbs-up
    } else {
      thumbs.push("👎"); // Outlined thumbs-up
    }
  }

  return (
    <div>
      {thumbs.map((item, index) => (
        <span className="text-gray-600 text-2xl font-bold" key={index}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default Ratings;
