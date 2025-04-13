import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserTable from "../components/UserTable";
import FilterDropdown from "../components/FilterDropdown";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    const params = {
      page,
      limit: 10, 
      ...(roleFilter && { role: roleFilter }),
      ...(search && { name: search }),
    };

    try {
      const response = await api.get("/admin/users", { params });
      setUsers(response.data.data);
      setTotalPages(response.data.meta.pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to soft delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Error deleting user. Please try again.");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setPage(1); 
      fetchUsers();
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <FilterDropdown
            label="Filter by Role"
            options={["admin", "player", "organizer"]}
            selectedValue={roleFilter}
            onChange={setRoleFilter}
          />
          <div>
            <label className="block text-sm font-semibold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="px-3 py-2 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-blue-500 font-semibold">
          Loading users...
        </div>
      )}

      {error && <div className="text-center text-red-500">{error}</div>}

      {!isLoading && !error && users.length === 0 && (
        <div className="text-center text-gray-500">No users found.</div>
      )}

      {!isLoading && !error && users.length > 0 && (
        <UserTable
          users={users}
          onDelete={handleDelete}
          isLoading={isLoading}
          error={error}
        />
      )}

      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
