import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axios";
import img from "../../../assets/images/img.jpg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MyAppointments from "../MyAppointments/MyAppointments";

const PatientDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axiosInstance.get("/specializations");
        // Fix: Access response.data.data instead of response.data
        setSpecializations(response.data.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };

    fetchSpecializations();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const params = {
          page: currentPage,
          limit: 8,
        };

        if (searchTerm) {
          params.search = searchTerm;
        }

        if (selectedSpecialization) {
          params.specialization = selectedSpecialization;
        }

        const response = await axiosInstance.get("/doctors", { params });
        setDoctors(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (activeTab === "doctors") {
      fetchDoctors();
    }
  }, [activeTab, currentPage, searchTerm, selectedSpecialization]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset first page on new search
  };

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

    // start and end  visible page range
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
            className={`w-full text-left py-3 px-6 flex items-center ${
              activeTab === "doctors"
                ? "bg-purple-900 border-l-4 border-white"
                : "hover:bg-purple-700"
            }`}
          >
            <i className="fas fa-user-md mr-3"></i>
            Doctor List
          </button>
          <button
            onClick={() => 
                  navigate("/patient/appointments")
            }
            className={`w-full text-left py-3 px-6 flex items-center ${
              activeTab === "appointments"
                ? "bg-purple-900 border-l-4 border-white"
                : "hover:bg-purple-700"
            }`}
          >
            <i className="fas fa-calendar-check mr-3"></i>
            My Appointments
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "doctors" ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Find Your Doctor !
            </h1>

            {/* search and filter section */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by doctor name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="w-full md:w-64">
                  <div className="relative">
                    <select
                      value={selectedSpecialization}
                      onChange={handleSpecializationChange}
                      className="block appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      <option value="">All Specializations</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* search and filter section end*/}

            {/* doctors card*/}
            {doctors.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#f9fafc]">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="bg-white rounded-lg shadow-md shadow-gray-400 overflow-hidden transition-transform duration-300 hover:shadow-lg "
                    >
                      <div className="h-40  flex items-center justify-center">
                        {doctor.photo_url ? (
                          <img
                            src={doctor.photo_url}
                            alt={doctor.name}
                            className="h-32 w-32 rounded-full object-cover border-2 border-[#d1d4db]"
                          />
                        ) : (
                          <img
                            src={img}
                            alt={doctor.name}
                            className="h-32 w-32 rounded-full object-cover border-2 border-[#e5e8ee]"
                          />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-xl text-center font-semibold text-gray-800 capitalize">
                          Dr. {doctor.name}
                        </h3>

                        <p className="w-[150px] mx-auto my-4 bg-[#f4f4f6] text-[#3075e3] text-center py-2 rounded-md capitalize">
                          {doctor.specialization}
                        </p>

                        <button
                          onClick={() =>
                            navigate(`/book-appointment/${doctor.id}`, {
                              state: doctor,
                            })
                          }
                          className="mt-4 w-full bg-[#326fd2] font-bold text-white py-2 rounded-lg transition-colors duration-300"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && renderPagination()}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <i className="fas fa-user-md text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  No doctors found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        ) : (
          
            <MyAppointments> </MyAppointments>
           
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
