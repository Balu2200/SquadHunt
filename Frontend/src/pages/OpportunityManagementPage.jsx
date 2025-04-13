import React, { useState, useEffect } from "react";
import api from "../services/api";
import OpportunityTable from "../components/OpportunityTable";
import Pagination from "../components/Pagination";
import FilterDropdown from "../components/FilterDropdown";

const OpportunityManagementPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); 

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
     
      const response = await api.get(
        `/admin/opportunities?page=${page}&status=${statusFilter || ""}`
      );
      setOpportunities(response.data.data);
      setTotalPages(response.data.meta.pages);
    } catch (err) {
      setError("Error loading opportunities");
    } finally {
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
  }, [page, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">
        Opportunity Management
      </h1>


      <div className="max-w-sm mb-4">
        <FilterDropdown
          label="Filter by Status"
          options={["pending", "approved", "closed"]} 
          selectedValue={statusFilter}
          onChange={(value) => {
            setPage(1); 
            setStatusFilter(value);
          }}
        />
      </div>

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
