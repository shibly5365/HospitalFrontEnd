import React from "react";
import axios from "axios";
import { notify } from "../../../../../../Units/notification";

const DepartmentDoctor = ({
  formData,
  setFormData,
  departments,
  doctors,
  setDoctors,
  setAvailableDates,
  setSlots,
}) => {
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setFormData({ ...formData, department: value, doctor: "", appointmentDate: "", timeSlot: "" });
      setDoctors([]);
      setAvailableDates([]);
      setSlots([]);
      await fetchDoctors(value);
    }

    if (name === "doctor") {
      setFormData({ ...formData, doctor: value, appointmentDate: "", timeSlot: "" });
      setAvailableDates([]);
      setSlots([]);
      await fetchAvailableDatesWithSlots(value);
    }
  };

  const fetchDoctors = async (departmentId) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/getalldoctorDepartments/${departmentId}`,
        { withCredentials: true }
      );
      if (res.data.success) setDoctors(res.data.doctors || []);
    } catch (err) {
      console.log(err);
      notify.error("Failed to fetch doctors");
    }
  };

  const fetchAvailableDatesWithSlots = async (doctorId) => {
    try {
      const res = await axios.get(
        `http://localhost:4002/api/patient/schedules/available-dates/${doctorId}`,
        { withCredentials: true }
      );
      console.log("avialdoctorSlot", res.data);

      if (res.data.success) {
        const { dates, schedules } = res.data;

        // attach date to each slot
        const allSlots = schedules.flatMap((sch) =>
          (sch.slots || []).map((slot) => ({ ...slot, date: sch.date }))
        );

        setAvailableDates({ dates }); // for dropdown
        setSlots(allSlots); // all slots
      }
    } catch (err) {
      console.log(err);
      notify.error("Failed to fetch available dates and slots");
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-1">Department *</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {doctors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-1">Doctor *</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default DepartmentDoctor;
