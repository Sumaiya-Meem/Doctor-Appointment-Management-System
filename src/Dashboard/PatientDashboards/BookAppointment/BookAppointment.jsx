import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state;

  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate) {
      return toast.error("Please select a date");
    }

    const token = localStorage.getItem("token"); 
    if (!token) {
      return toast.error("You must be logged in to book an appointment");
    }

    try {
      setIsSubmitting(true);

      await axiosInstance.post("/appointments",{doctorId,
          date: selectedDate.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success("Your appointment has been booked successfully!");
      setSuccess(true);
    } 
    catch (error) {
      console.error("Error booking appointment:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } 
      else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Book Appointment
        </h2>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Dr. {doctor?.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">
            {doctor?.specialization}
          </p>
        </div>

        {/* Date Picker */}
        {!success ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Select Appointment Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-50"
              >
                {isSubmitting ? "Booking..." : "Confirm"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold text-lg mb-4">
              Appointment booked successfully!
            </p>
            <button
              onClick={() => navigate("/myAppointment")}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600"
            >
              Show All Your Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
