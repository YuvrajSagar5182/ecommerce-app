import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 shadow-lg">
        <h2 className="text-red-500 text-lg font-semibold mb-4">Error</h2>
        <p className="text-gray-700 text-sm">{message}</p>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white rounded-md px-4 py-2 text-sm hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
