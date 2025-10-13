import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { notify } from "../../../../Units/notification";

const RescheduleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/patient/appointments/${id}`,
          { withCredentials: true }
        );
        if (res.data?.appointment) {
          setAppointment(res.data.appointment);
        } else {
          notify.error("Appointment not found");
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
        notify.error("Failed to fetch appointment");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  // Fetch available dates for the doctor
  const fetchAvailableDates = async (doctorId) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const dates = res.data.schedules.map((sch) => sch.date);
        setAvailableDates(dates);
      }
    } catch (err) {
      console.error("Error fetching available dates:", err);
      notify.error("Failed to fetch available dates");
    }
  };

  // Fetch slots for a selected date
  const fetchDoctorSlots = async (doctorId, date) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}?date=${date}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // attach schedule date to each slot
        const allSlots = res.data.schedules.flatMap((sch) =>
          (sch.slots || []).map((slot) => ({ ...slot, date: sch.date }))
        );
        setSlots(allSlots);
      }
    } catch (err) {
      console.log("Error fetching slots:", err);
    }
  };

  // Update available dates and slots whenever doctor or appointment date changes
  useEffect(() => {
    if (appointment?.doctor?._id) {
      fetchAvailableDates(appointment.doctor._id);
      if (appointment.appointmentDate) {
        fetchDoctorSlots(appointment.doctor._id, appointment.appointmentDate);
      }
    }
  }, [appointment?.doctor?._id, appointment?.appointmentDate]);

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (
      !appointment.timeSlot ||
      !appointment.timeSlot.start ||
      !appointment.timeSlot.end
    ) {
      notify.error("Please select a valid time slot!");
      return;
    }

    try {
      const appointmentDateStr = new Date(appointment.appointmentDate)
        .toISOString()
        .split("T")[0];

      const res = await axios.put(
        `http://localhost:4002/api/patient/rescheduleappointments/${id}`,
        {
          appointmentDate: appointmentDateStr,
          timeSlot: {
            start: appointment.timeSlot.start,
            end: appointment.timeSlot.end,
          },
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        notify.success("Appointment rescheduled successfully!");
        navigate("/patient/patient-appointments");
      } else {
        notify.error(res.data.message || "Failed to reschedule appointment");
      }
    } catch (err) {
      console.error("Error updating:", err);
      notify.error(
        err.response?.data?.message || "Something went wrong while rescheduling"
      );
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!appointment)
    return <p className="text-center">Appointment not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Reschedule Appointment
      </h2>

      <form onSubmit={handleReschedule} className="space-y-4">
        {/* Patient Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            value={appointment.patient.fullName || ""}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={appointment.patient?.email || ""}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="text"
            value={appointment.patient?.age || ""}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Doctor Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <input
            type="text"
            value={appointment.doctor?.userId?.fullName || ""}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            value={appointment.doctor?.department?.name || ""}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <DatePicker
            selected={
              appointment.appointmentDate
                ? parseISO(appointment.appointmentDate)
                : null
            }
            onChange={(date) => {
              const formatted = date.toISOString().split("T")[0];
              fetchDoctorSlots(appointment.doctor._id, formatted);
              setAppointment((prev) => ({
                ...prev,
                appointmentDate: formatted,
              }));
            }}
            includeDates={availableDates.map((d) => parseISO(d))}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Time Slot Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Time Slots
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {slots.length === 0 && (
              <p className="text-sm text-red-500">
                No free slots available for this date
              </p>
            )}

            {slots.map((slot) => (
              <button
                key={slot.start + slot.end}
                type="button"
                className={`px-3 py-1 rounded-lg text-white ${
                  slot.isBooked
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-green-500 hover:opacity-90"
                } ${
                  appointment.timeSlot?._id === slot._id
                    ? "ring-2 ring-blue-400"
                    : ""
                }`}
                disabled={slot.isBooked}
                onClick={() =>
                  setAppointment((prev) => ({ ...prev, timeSlot: slot }))
                }
              >
                {slot.start} - {slot.end}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg shadow hover:opacity-90"
        >
          Reschedule
        </button>
      </form>
    </div>
  );
};

export default RescheduleAppointment;
