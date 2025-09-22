import { CircleAlert } from "lucide-react"; // icon from react-icons

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="flex flex-col items-center p-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <CircleAlert className="text-red-500 text-8xl mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 text-center mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => window.location.href = "/"} // go back home
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
