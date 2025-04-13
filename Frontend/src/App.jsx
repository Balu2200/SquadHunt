import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagementPage from "./pages/UserManagementPage";
import OpportunityManagementPage from "./pages/OpportunityManagementPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="users" element={<UserManagementPage />} />
        <Route path="opportunities" element={<OpportunityManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App;
