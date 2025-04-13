import React from "react";

const OpportunityTable = ({
  opportunities,
  onStatusChange,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div>Loading opportunities...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (opportunities.length === 0) {
    return <div>No opportunities found.</div>;
  }

  const handleStatusChange = (id, event) => {
    const status = event.target.value;
    onStatusChange(id, status);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr key={opportunity._id}>
              <td className="px-4 py-2 border">{opportunity.title}</td>
              <td className="px-4 py-2 border">{opportunity.description}</td>
              <td className="px-4 py-2 border">
                <select
                  value={opportunity.status}
                  onChange={(event) =>
                    handleStatusChange(opportunity._id, event)
                  }
                  className="border p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleStatusChange(opportunity._id, event)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunityTable;
