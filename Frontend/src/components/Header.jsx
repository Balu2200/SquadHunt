import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const handleEvents = () => {
    navigate("/opportunities"); 
  };
  const handleDashboard = () => {
    navigate("/dashboard/users"); 
  };

  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-2xl font-semibold">SquadHunt</h1>
      <div>
        {!token ? (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-700 rounded"
          >
            Login
          </button>
        ) : (
          <>
            <button
              onClick={handleDashboard}
              className="px-4 py-2 bg-green-500 rounded mr-4"
            >
              Dashboard
            </button>
            <button
              onClick={handleEvents}
              className="px-4 py-2 bg-green-500 rounded mr-4"
            >
              Events
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
