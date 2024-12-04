import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  // Static book categories
  const categories = ["Fiction", "Sci-Fi", "Non-fiction", "Horror"];

  // Redux store selectors
  const booksData = useSelector((store) => store.book.items);
  const popularBooks = booksData.filter((item) => item.rating >= 4.7);

  // State to handle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle category selection and close dropdown
  const handleCategorySelect = (category) => {
    setIsDropdownOpen(false); // Close the dropdown when a category is selected
  };

  return (
    <>
      <h1 className="font-bold text-gray-900 m-3 mt-4 text-center text-2xl">Discover Your Next Favorite Read!</h1>
      <div className="px-3 flex gap-8 xs:px-8">
        {/* Book Categories Dropdown */}
        <section>
          <h2 className="py-4">Book Categories:</h2> 
          <div className="relative inline-block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-gray-600 transition-all"
            >
             Filter
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg z-10 w-[200px]">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/books/${category}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleCategorySelect(category)} // Close dropdown on category select
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Popular Books */}
        <section>
          <h2 className="font-bold text-xl  py-4">
            Popular <span className="text-gray-600">PICKS!!</span>
          </h2>
          <div className="popularBooks flex gap-6 flex-wrap py-2">
            {popularBooks.length > 0 ? (
              popularBooks.map((item) => (
                <div
                  key={item.id}
                  className="bookCard w-[14rem] sm:w-[16rem] h-[20rem] relative border-2 border-slate-100 shadow-xl rounded-lg p-4 flex flex-col justify-between group"
                >
                  {/* Book Image and Title */}
                  <div className="flex flex-col justify-between h-full">
                    <div className="overflow-hidden rounded-md shadow-md hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.coverImage}
                        className="w-full h-[12rem] object-cover group-hover:opacity-80 transition-all duration-300"
                        alt={`${item.title} cover`}
                      />
                    </div>
                    <h2 className="font-bold pt-2 text-center">{item.title}</h2>
                  </div>

                  {/* View Details Button */}
                  <div className="flex justify-center mt-2">
                    <Link
                      to={`/book/${item.id}`}
                      className="py-2 px-6 text-center text-white border-2 bg-slate-400 font-bold shadow-lg rounded-md group-hover:bg-white group-hover:text-gray-900 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No popular books available</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
