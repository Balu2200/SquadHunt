import React, { useState, useEffect } from "react";
import api from "../services/api";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/admin/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.meta.pages);
      setLoading(false);
    } catch (err) {
      setError("Error loading users");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      setError("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div>
      <h2>User Management</h2>
      <UserTable
        users={users}
        onDelete={handleDelete}
        isLoading={loading}
        error={error}
      />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default UserManagementPage;
