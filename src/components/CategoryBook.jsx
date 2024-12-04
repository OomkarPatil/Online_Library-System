import { Link, Links, useParams } from "react-router-dom";
import bookData from "../Utils/BookDATA";

const BookCar = ({ books }) => (
  <div
    key={books.id}
    className="w-[16rem] border border-gray-200 shadow-md rounded-lg p-4 flex flex-col"
  >
    <img
      src={books.coverImage}
      alt={`${books.title} Cover`}
      className="w-full h-[20rem] object-cover rounded-md"
    />
    <h2 className="font-bold text-lg mt-2">
      {books.title.length > 24 ? `${books.title.slice(0, 24)}...` : books.title}
    </h2>
    <h3 className="font-medium text-gray-600 mt-1">{books.author}</h3>
    <p className="text-sm text-gray-700 mt-2">
      {books.description.length > 85
        ? `${books.description.slice(0, 85)}...`
        : books.description}
    </p>
    <Link
      to={`/book/${books.id}`}
      className="mt-4 py-2 border text-center text-gray-600 font-bold  hover:bg-gray-600 hover:text-white rounded-lg transition"
    >
      Visit Book
    </Link>
  </div>
);



const CategoryBook = () => {
  const { categories } = useParams(); // Get the category from the URL
  const filteredBooks = bookData.filter((item) => item.catagory == categories);

  return (
    <div className="py-6 px-4 sm:px-8 flex gap-8 pt-[80px]"> {/* Adjust padding to match the Navbar */}
      {/* Left Side - Navigation */}
      <div className="w-[20rem] fixed top-[80px] left-0 flex flex-col gap-6 bg-white border-r p-6 h-full">
        <Link
          to="/"
          className="py-2 px-3 text-center border rounded-xl text-gray-600 font-bold  hover:bg-gray-600 hover:text-white transition"
        >
          Back to Home
        </Link>
        <h2 className="font-bold text-lg text-gray-700">
          Current Category:
        </h2>
        <h3 className="text-xl font-semibold text-gray-600">{categories}</h3>
      </div>

      {/* Right Side - Book Display */}
      <div className="w-full ml-[20rem] flex flex-col gap-6">
        <h2 className="font-bold text-2xl mb-6">
          Category: <span className="text-gray-600">{categories}</span>
        </h2>

        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCar key={book.id} books={book} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <h3 className="text-4xl font-bold text-gray-600">404</h3>
            <h2 className="text-xl text-gray-700 mt-2">No books found for this category explore other genre</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBook;
