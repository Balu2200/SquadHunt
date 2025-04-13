import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserManagementPage from "./pages/UserManagementPage";
import OpportunityManagementPage from "./pages/OpportunityManagementPage";
import Header from "./components/Header"; 

function App() {
  return (
    <>
      
      <Header />
      <div className="p-6">
        {" "}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<UserManagementPage />} />
          </Route>
            <Route
              path="/opportunities"
              element={<OpportunityManagementPage />}
            />
        </Routes>
      </div>
    </>
  );
}

export default App;
