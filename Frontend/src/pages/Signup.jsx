import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

 
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);


    let role = "player"; 
    if (formData.adminCode === "SquadHuntAdmin") {
      role = "admin";
    } else if (formData.adminCode === "ORG2024") {
      role = "organizer";
    }

    try {
      const response = await axios.post("/auth/signup", {
        ...formData,
        role,
      });
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      const resError = err.response?.data;
      if (Array.isArray(resError?.errors)) {
        setError(resError.errors.join(", "));
      } else {
        setError(resError?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-gray-800 shadow-md rounded-lg mt-12">
      <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Admin Code (Optional)
          </label>
          <input
            type="text"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            disabled={loading}
            placeholder="ADMIN2024 / ORG2024"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            disabled={loading}
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
