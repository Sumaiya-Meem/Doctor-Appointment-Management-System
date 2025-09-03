import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to view appointments");
      return;
    }

    try {
      const params = {
        page: currentPage,
        limit: 3,
      };
      if (statusFilter) params.status = statusFilter;

      const response = await axiosInstance.get("/appointments/patient", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, currentPage]);

  const openCancelDialog = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelDialog(true);
  };

  const closeCancelDialog = () => {
    setShowCancelDialog(false);
    setAppointmentToCancel(null);
  };

  const handleCancel = async () => {
    if (!appointmentToCancel) return;

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.patch(
        "/appointments/update-status",
        { status: "CANCELLED", appointment_id: appointmentToCancel.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Appointment cancelled successfully");
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    } finally {
      closeCancelDialog();
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    // eslint-disable-next-line no-unused-vars
    const maxVisiblePages = 5;

    // show first page
    pages.push(
      <button
        type="button"
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

    // start and end visible page range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if near the start
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }

    // Adjust if near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    // ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      );
    }

    // middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
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

    // ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
    }

    // show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          type="button"
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
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &larr;
        </button>

        {pages}

        <button
          type="button"
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white">
        <div className="p-5">
          <h2 className="text-xl font-bold">Patient Dashboard</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => navigate("/patient/dashboard")}
            className="w-full text-left py-3 px-6 flex items-center hover:bg-purple-700"
          >
            <i className="fas fa-user-md mr-3"></i>
            Doctor List
          </button>
          <button className="w-full text-left py-3 px-6 flex items-center bg-purple-900 border-l-4 border-white">
            <i className="fas fa-calendar-check mr-3"></i>
            My Appointments
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Appointments List
        </h1>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center">
            <span className="text-gray-700 mr-3">Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="">All Appointments</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointment List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <i className="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-700">
              No appointments found
            </h3>
            <p className="text-gray-500 mt-2">
              {statusFilter
                ? `You don't have any ${statusFilter.toLowerCase()} appointments`
                : "You haven't booked any appointments yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((data) => (
              <div
                key={data.id}
                className="bg-white w-[500px] shadow rounded-lg p-6 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Dr. {data.doctor.name}
                  </h3>
                  <p className="text-gray-500 capitalize">
                    {data.doctor.specialization}
                  </p>
                  <p>
                    Date:{" "}
                    {new Date(data.date).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        data.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : data.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {data.status}
                    </span>
                  </div>
                </div>
                {data.status === "PENDING" && (
                  <button
                    onClick={() => openCancelDialog(data)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Cancel Appointment
              </h3>
              <button
                onClick={closeCancelDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to cancel your appointment with{" "}
                <span className="font-semibold">
                  Dr. {appointmentToCancel?.doctor.name}
                </span>
                ?
              </p>
              <p className="text-gray-600">
                Scheduled for:{" "}
                {appointmentToCancel &&
                  new Date(appointmentToCancel.date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeCancelDialog}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
