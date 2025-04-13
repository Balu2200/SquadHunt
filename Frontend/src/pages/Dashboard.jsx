import React from "react";
import { Route, Routes } from "react-router-dom";
import UserManagementPage from "./UserManagementPage";
import OpportunityManagementPage from "./OpportunityManagementPage";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">Admin Dashboard</h1>
      <Routes>
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/opportunities" element={<OpportunityManagementPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
