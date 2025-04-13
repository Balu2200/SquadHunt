import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.role !== "admin") {
        setError("Only admins can access this.");
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard/users");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Access denied. Admins only.");
      } else {
        setError("Invalid credentials or server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="max-w-md mx-auto p-6 border shadow">
      <h2 className="text-center text-xl mb-4">Login</h2>
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-center">
        <p>Don't have an account?</p>
        <button onClick={handleSignupRedirect} className="text-blue-500 mt-2">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
