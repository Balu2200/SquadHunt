import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 text-center text-blue-600 font-semibold">
        Admin Dashboard
      </h1>
      <Outlet />
    </div>
  );
};

export default Dashboard;
