import React, { useEffect, useState } from "react";
import {
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Video,
  PlayCircle,
  FileText,
  NotebookPen,
} from "lucide-react";
import { apiClient } from "../../../../../services/queryClient"; // adjust path

const NextAppointmentCard = () => {
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        const res = await apiClient.get(
          "/doctor/nextAppointment",
          {
            withCredentials: true,
          }
        );

        console.log("Next Appointment:", res.data);

        const appointment = res.data?.data;

        setNextAppointment({
          patientName:
            appointment?.patient?.fullName || "Unknown",
          patientAvatar:
            appointment?.patient?.profileImage ||
            "https://ui-avatars.com/api/?name=Patient",
          appointmentType:
            appointment?.consultationType || "Consultation",
          age: appointment?.patient?.age || "-",
          gender: appointment?.patient?.gender || "-",
          bloodGroup:
            appointment?.patient?.bloodGroup || "-",
          contact:
            appointment?.patient?.contact || "N/A",
          email:
            appointment?.patient?.email || "N/A",
          symptoms:
            appointment?.reason || "No symptoms recorded",
          lastVisit: appointment?.lastVisit || "N/A",
          medicalHistory:
            appointment?.medicalHistory ||
            "No medical history available",
          medications:
            appointment?.medications || [],
          allergies:
            appointment?.allergies || "None",
          upcomingTests:
            appointment?.upcomingTests || "None",
          appointmentDate:
            appointment?.appointmentDate,
          status:
            appointment?.status || "Scheduled",
        });
      } catch (error) {
        console.error(
          "Failed to fetch next appointment:",
          error
        );
      }
    };

    fetchNextAppointment();
  }, []);

  if (!nextAppointment) {
    return (
      <div className="bg-[var(--surface)] rounded-3xl p-6">
        Loading appointment...
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-lg overflow-hidden border border-[var(--line)]">
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-5 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Next Appointment
            </h2>

            <p className="text-blue-100 text-sm mt-1">
              {nextAppointment.appointmentType}
            </p>
          </div>

          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            {nextAppointment.status}
          </span>
        </div>
      </div>

      <div className="p-7">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={nextAppointment.patientAvatar}
            className="w-28 h-28 rounded-2xl object-cover shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/30"
            alt=""
          />

          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-2xl font-bold">
                  {nextAppointment.patientName}
                </h3>

                <p className="text-[var(--muted)] text-sm">
                  {nextAppointment.age} yrs •{" "}
                  {nextAppointment.gender} • Blood:{" "}
                  {nextAppointment.bloodGroup}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                  <MessageCircle size={18} />
                </button>

                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                  <Phone size={18} />
                </button>

                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                  <Video size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock
                  size={16}
                  className="text-[var(--muted)]"
                />
                {nextAppointment.appointmentDate
                  ? new Date(
                    nextAppointment.appointmentDate
                  ).toLocaleString()
                  : "N/A"}
              </div>

              <div className="flex items-center gap-2">
                <Phone
                  size={16}
                  className="text-[var(--muted)]"
                />
                {nextAppointment.contact}
              </div>

              <div className="flex items-center gap-2">
                <Mail
                  size={16}
                  className="text-[var(--muted)]"
                />
                {nextAppointment.email}
              </div>

              <div className="flex items-center gap-2">
                <Calendar
                  size={16}
                  className="text-[var(--muted)]"
                />
                Last: {nextAppointment.lastVisit}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">
              🏥 Medical History
            </p>
            <p className="text-sm text-[var(--muted)]">
              {nextAppointment.medicalHistory}
            </p>
            <p className="text-xs text-[var(--muted)] mt-2">
              Allergies: {nextAppointment.allergies}
            </p>
          </div>

          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">
              💊 Current Medications
            </p>

            <div className="flex flex-wrap gap-2">
              {nextAppointment.medications.map(
                (med, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[var(--surface)] px-2 py-1 rounded-lg"
                  >
                    {typeof med === "string"
                      ? med
                      : med.name}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">
              ⚠️ Symptoms
            </p>

            <p className="text-sm text-[var(--muted)]">
              {nextAppointment.symptoms}
            </p>
          </div>

          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">
              📋 Upcoming Tests
            </p>

            <p className="text-sm text-[var(--muted)]">
              {nextAppointment.upcomingTests}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <PlayCircle size={18} />
            Start Consultation
          </button>

          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <FileText size={18} />
            View Full Record
          </button>

          <button className="flex-1 border border-[var(--line)] hover:bg-[var(--surface-soft)] py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <NotebookPen size={18} />
            Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextAppointmentCard;