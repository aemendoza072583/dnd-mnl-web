import React from "react";
import { useNavigate } from "react-router";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Unauthorized Access</h2>
      <p className="text-gray-600 mt-2">
        You don’t have permission to access this page.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default UnauthorizedPage;