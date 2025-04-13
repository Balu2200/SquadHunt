import React from "react";

const UserTable = ({ users, onDelete, isLoading, error }) => {
  if (isLoading) {
    return <div className="text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to soft delete this user?")) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                {!user.isDeleted ? (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Soft Delete
                  </button>
                ) : (
                  <span className="text-gray-500">User Deleted</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
