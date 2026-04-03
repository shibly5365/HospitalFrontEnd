import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorWritePrescription from "./DoctorWritePrescription";
import { getAppointmentByIdApi } from "../doctorPrescriptionApi";

export default function DoctorPrescriptionPage() {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getAppointmentByIdApi(appointmentId);
        if (!mounted) return;
        setAppointment(res?.data?.appointment || null);
      } catch (err) {
        if (!mounted) return;
        setError(
          err?.response?.data?.message || "Failed to load appointment"
        );
        setAppointment(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    } else {
      setLoading(false);
      setError("Missing appointment id");
    }

    return () => {
      mounted = false;
    };
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <p className="text-gray-600">Loading appointment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-red-100 p-6">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return <DoctorWritePrescription appointment={appointment} />;
}
