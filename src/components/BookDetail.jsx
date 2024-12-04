import React from "react";
import { Link, useParams } from "react-router-dom";
import Ratings from "./Ratings";
import { useSelector } from "react-redux";

const BookInfo = ({ books }) => (
  <div className="bookCard flex flex-col sm:flex-row sm:w-[38rem] lg:w-[50rem] break-words border border-gray-200 shadow-lg rounded-lg py-6 px-4 sm:px-10 gap-10">
    <img
      src={books?.coverImage}
      className="w-[15rem] h-[20rem] object-cover rounded-md"
      alt={`${books?.title} cover`}
    />
    <div className="data">
      <h2 className="font-bold">
        <span className="font-bold">Title:</span> {books?.title}
      </h2>
      <h3 className="font-semibold py-2">
        <span className="font-bold">Author:</span> {books?.author}
      </h3>
      <p className="text-justify my-2">
        <span className="font-bold">Published Date:</span> {books?.publishedDate}
      </p>
      <p className="py-2">
        <span className="font-bold">Description:</span> {books?.description}
      </p>
      <p>
        <span className="font-bold">Pages:</span> {books?.pages}
      </p>
      <h3 className="font-semibold py-2">
        <span className="font-bold">Category:</span> {books?.genre}
      </h3>
      <h3 className="font-semibold">
        <span className="font-bold">Price:</span> ${books?.price}
      </h3>
      <Ratings rating={Math.ceil(books?.rating)} />
    </div>
  </div>
);

const BookDetail = () => {
  const booksData = useSelector((store) => store.book.items);
  const { id } = useParams();
  const currentBook = booksData.find((item) => item.id == id);

  return (
    <div className="px-4 sm:px-8 py-6">
      <Link
        to="/"
        className=" items-center  mb-6 px-4 py-2 border rounded-full shadow-md text-gray-500 hover:bg-gray-100"
      >
        Back 
      </Link>

      {currentBook ? (
        <>
          <h2 className="font-bold text-2xl my-6">
            Book <span className="text-gray-500">Details</span>
          </h2>
          { <BookInfo books={currentBook} />}
        </>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold text-gray-500">Invalid Book</h2>
          <p className="text-lg text-gray-700 mt-4">
            The book you're looking for does not exist or has been removed.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
