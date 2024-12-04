import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const books = useSelector((store) => store.book.items);
  const location = useLocation(); // Get the current route

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browseBooks", label: `Dive In (${books.length})` },
    { path: "/addBook", label: "Add Book" },
  ];

  return (
    <nav className="relative bg-slate-400 m-2 rounded-xl py-4 shadow-lg px-3 xs:px-8 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 w-[20rem] cursor-pointer">
        <h1 className="font-bold text-xl ml-4">Libri-Space</h1>
      </Link>

      {/* Navigation Links */}
      <ul
        className={`top-[70px] left-0 sm:left-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-0 bg-white sm:bg-transparent border-4 border-black border-l-0 sm:border-none w-full sm:w-auto transition-all`}
      >
        {navItems.map(({ path, label }) => (
          <li
            key={path}
            className={`px-4 py-2 rounded-md ${
              location.pathname === path
                ? "bg-gray-700 text-white"
                : "hover:text-white hover:bg-gray-700"
            }`}
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
