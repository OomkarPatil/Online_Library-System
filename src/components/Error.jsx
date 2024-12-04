import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  const status = err?.status || "404";
  const message = err?.data || err?.message || "Something went wrong";

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 sm:px-8">
      {/* Error Status */}
      <h1 className="text-6xl font-bold text-gray-500">{status}</h1>

      {/* Error Message */}
      <p className="text-xl text-gray-700 mt-4">{message}</p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-lg text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all"
      >
      start Again
      </Link>
    </div>
  );
};

export default Error;
