import React, { useState, useEffect } from "react";
import api from "../services/api";
import OpportunityTable from "../components/OpportunityTable";
import Pagination from "../components/Pagination";

const OpportunityManagementPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get(`/admin/opportunities?page=${page}`);
      setOpportunities(response.data.data);
      setTotalPages(response.data.meta.pages);
      setLoading(false);
    } catch (err) {
      setError("Error loading opportunities");
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/admin/opportunity/${id}/status`, { status });
      fetchOpportunities();
    } catch (err) {
      setError("Error updating opportunity status");
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [page]);

  return (
    <div>
      <h2>Opportunity Management</h2>
      <OpportunityTable
        opportunities={opportunities}
        onStatusChange={handleStatusChange}
        isLoading={loading}
        error={error}
      />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default OpportunityManagementPage;
