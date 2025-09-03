/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axios";
import toast from "react-hot-toast";
import { FiCalendar, FiClock, FiAlertTriangle } from "react-icons/fi";
import { MdWavingHand } from "react-icons/md";

const DoctorDashboard = () => {
  const [allAppointments, setAllAppointments] = useState([]); // for stats
  const [appointments, setAppointments] = useState([]); // for table
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all appointments once for stats
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/appointments/doctor", {
          params: { page: 1, limit: 1000 }, // large limit to get all
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllAppointments(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllAppointments();
  }, []);

  // Fetch paginated appointments for table
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = { page: currentPage, limit: 3 };
      if (statusFilter !== "ALL") params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const response = await axiosInstance.get("/appointments/doctor", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, statusFilter, dateFilter]);

  // Update appointment status
  const updateStatus = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.patch(
        "/appointments/update-status",
        { status: newStatus, appointment_id: appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Appointment marked as ${newStatus}`);
      fetchAppointments(); // refresh table after status update
      // Refresh allAppointments for stats
      const allResponse = await axiosInstance.get("/appointments/doctor", {
        params: { page: 1, limit: 1000 },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllAppointments(allResponse.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    // First page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        1
      </button>
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
    if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);

    if (startPage > 2) pages.push(<span key="ellipsis1" className="px-2">...</span>);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) pages.push(<span key="ellipsis2" className="px-2">...</span>);

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &larr;
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &rarr;
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-2xl font-bold">Welcome</h1>
              <MdWavingHand className="transform scale-x-[-1] text-yellow-500 text-3xl" />
            </div>
            <p className="text-gray-600">
              Start the day with managing new appointments
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
            <button
              onClick={() => fetchAppointments()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
            <FiCalendar className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Scheduled appointments</p>
              <p className="text-2xl font-bold text-yellow-500">
                {allAppointments.filter(a => a.status === "PENDING").length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
            <FiClock className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Completed appointments</p>
              <p className="text-2xl font-bold text-blue-500">
                {allAppointments.filter(a => a.status === "COMPLETED").length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-gray-400 text-sm">Cancelled appointments</p>
              <p className="text-2xl font-bold text-red-400">
                {allAppointments.filter(a => a.status === "CANCELLED").length}
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Appointments</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No appointments found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-200 text-left text-gray-800">
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Appointment</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {appointments.map((appointment, idx) => (
                    <tr key={appointment.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{appointment.patient?.name || "Unknown"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{formatDateTime(appointment.date)}</td>
                      <td className="px-6 py-4 flex gap-2">
                        {appointment.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => updateStatus(appointment.id, "COMPLETED")}
                              className="px-3 py-1 bg-gray-200 rounded-lg"
                            >
                              <span className="text-green-600 font-bold">Schedule</span>
                            </button>
                            <button
                              onClick={() => updateStatus(appointment.id, "CANCELLED")}
                              className="px-3 py-1 bg-gray-200 rounded-lg"
                            >
                              <span className="text-red-600 font-bold">Cancel</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="my-4">{totalPages > 1 && renderPagination()}</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
