
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import toast from "react-hot-toast";
import { addItem } from '../Utils/BooksSlice';
import { Link } from "react-router-dom";
import { useState } from 'react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    pages: "",
    rating: "",
    price: "",
    publishedDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field === "")) {
      toast.error("All fields are required");
      return;
    }

    const bookData = { ...formData, id: Date.now() };
    dispatch(addItem(bookData)); // Dispatch action to add the book
    toast.success("Book added successfully!");

    navigate("/browseBooks"); // Redirect to BrowseBooks after submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formFields = [
    { name: "title", type: "text", placeholder: "e.g., Anna Karenina" },
    { name: "author", type: "text", placeholder: "e.g., Leo Tolstoy" },
    { name: "category", type: "text", placeholder: "e.g., Fiction" },
    { name: "description", type: "textarea", placeholder: "e.g., A tale of a doomed affair" },
    { name: "pages", type: "number", placeholder: "Pages" },
    { name: "price", type: "number", placeholder: "Price ($)" },
    { name: "rating", type: "number", placeholder: "Rating (max 5)", max: 5 },
    { name: "publishedDate", type: "date", placeholder: "Published Date" },
  ];

  return (
    <>
    <div className="px-4 sm:px-8  py-6">
      <Link
        to="/"
        className="mb-4 px-4 py-2 border rounded-full   shadow-md text-gray-600 hover:bg-gray-600 hover:text-white"
      >
        Back
      </Link>

      <form
        onSubmit={handleFormSubmit}
        className="border shadow-lg w-[300px] sm:w-2/3 mx-auto p-6 rounded-lg flex flex-col gap-4"
      >
        <h3 className="font-bold text-lg mb-4">Book Details</h3>

        {formFields.map(({ name, type, placeholder, max }) => (
          <div key={name} className="flex flex-col">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={4}
                className="border px-4 py-2 rounded shadow-sm focus:outline-none"
                placeholder={placeholder}
              />
            ) : (
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                max={max || undefined}
                className="border px-4 py-2 rounded shadow-sm focus:outline-none"
                placeholder={placeholder}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 py-2 font-bold text-gray-600 hover:bg-gray-600 hover:text-white rounded-xl transition"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddBook;
