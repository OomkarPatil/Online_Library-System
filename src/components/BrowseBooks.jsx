
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";


const BookCard = ({ book }) => (
  <div className="bookCard flex items-center w-[100%] sm:w-[18rem] border border-gray-200 shadow-md rounded-lg p-4 gap-4">
    {/* Book Image */}
    <img
      src={book.coverImage}
      className="w-[5rem] h-[7rem] object-cover rounded-md"
      alt={`${book.title} cover`}
    />

    {/* Book Info */}
    <div className="flex flex-col w-full gap-2 mr-8">
      <h2 className="font-bold text-sm text-gray-800">
        {book.title.length > 24 ? `${book.title.slice(0, 24)}...` : book.title}
      </h2>
      <h3 className="font-semibold text-xs text-gray-700">{book.author}</h3>
      <p className="text-xs text-gray-600">
        {book.description.length > 50
          ? `${book.description.slice(0, 50)}...`
          : book.description}
      </p>
      <h3 className="font-semibold py-2 text-sm">Price: ${book.price}</h3>
      <Link
         to={`/book/${book.id}`}
         className="py-1 text-center mt-auto text-gray-600 font-bold border-2  hover:bg-gray-600 hover:text-white transition-all rounded-md text-xs"
      >
        See Details
      </Link>
    </div>
  </div>
);

const BrowseBooks = () => {
  const booksData = useSelector((store) => store.book.items);
  const [filterBasedOn, setFilterBasedOn] = useState("title");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const filteredBooks = useMemo(() => {
    return booksData
      .filter((book) =>
        book[filterBasedOn].toLowerCase().includes(search.toLowerCase())
      )
      .filter((book) =>
        selectedCategory ? book.category === selectedCategory : true
      )
      .filter((book) => {
        if (!selectedPriceRange) return true;
        const [minPrice, maxPrice] = selectedPriceRange.split("-");
        return book.price >= minPrice && book.price <= maxPrice;
      });
  }, [booksData, filterBasedOn, search, selectedCategory, selectedPriceRange]);

  return (
    <div className="py-6 px-4 sm:px-8 flex gap-8 pt-[80px]"> {/* Added pt-[80px] to prevent overlap with navbar */}
      {/* Left Side - Filters */}
      <div className="w-[20rem] fixed top-[80px] left-0 flex flex-col gap-6 bg-white border-r p-6 h-full">
        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none"
          placeholder="Search by title..."
        />

        {/* Category Dropdown */}
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">Select Category</option>
          {/* Replace with actual categories */}
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
        </select>

        {/* Price Range Dropdown */}
        <select
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          value={selectedPriceRange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">Select Price Range</option>
          <option value="0-10">0 - $10</option>
          <option value="10-20">$10 - $20</option>
          <option value="20-30">$20 - $30</option>
          <option value="30-50">$30 - $50</option>
          <option value="50-100">$50 - $100</option>
        </select>
      </div>

      {/* Right Side - Books (Scrollable) */}
      <div className="w-full ml-[20rem] flex flex-col gap-6 overflow-x-auto">
        {/* Title */}
        <h2 className="font-bold text-2xl mb-6">
          Browse your Taste
        </h2>

        {/* Books List */}
        <div className="flex gap-6 flex-wrap">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <h2 className="font-bold text-xl text-gray-700 underline">
              No Books to Display
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
