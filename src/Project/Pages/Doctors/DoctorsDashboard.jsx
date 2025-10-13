import React from "react";
import DashboardNav from "./DashboardNav";
import {
  Clock,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  Phone,
  MessageSquare,
  Eye,
  PlusCircle,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function DoctorsDashboard() {
  const [summary, setSummary] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, scheduleRes] = await Promise.all([
          axios.get("http://localhost:4002/api/doctor/dashboard/summary", {
            withCredentials: true,
          }),
          axios.get(
            "http://localhost:4002/api/doctor/dashboard/today-schedule",
            {
              withCredentials: true,
            }
          ),
        ]);

        setSummary(summaryRes.data);
        setSchedule(scheduleRes.data);

        // // Log the actual API response (not old state)
        // console.log("Summary Response:", summaryRes.data);
        // console.log("scheduleRes Response:", scheduleRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // console.log( "summery",summary);
  // console.log("schedule",schedule);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const recentActivities = [
    summary.completed?.count
      ? { type: "completed", patient: summary.patientsToday, timeAgo: "Today" }
      : null,
    summary.confirmed?.count
      ? { type: "confirmed", patient: summary.patientsToday, timeAgo: "Today" }
      : null,
    summary.pending?.count
      ? { type: "pending", patient: summary.patientsToday, timeAgo: "Today" }
      : null,
    summary.cancelled?.count
      ? { type: "cancelled", patient: summary.patientsToday, timeAgo: "Today" }
      : null,
  ].filter(Boolean);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardNav />

      <div className="p-6">
        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl p-6 flex items-center justify-between shadow-md min-h-48">
          <div>
            <h2 className="text-2xl font-bold">
              Good morning, {summary?.doctorName || "Doctor"} 👋
            </h2>
            <p className="mt-1 text-sm">
              You have{" "}
              <span className="font-semibold">
                {" "}
                {summary?.totalAppointments ?? 0} appointments
              </span>{" "}
              scheduled for today.{" "}
              <span className="font-semibold">
                {" "}
                {summary?.pending.count ?? 0} patients
              </span>{" "}
              are waiting for confirmation.
            </p>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  Next appointment in{" "}
                  {summary?.nextAppointment?.timeSlot || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{summary?.patientsToday ?? 0} patients today</span>
              </div>
            </div>
          </div>
          <div className="bg-white/20 rounded-full p-4 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* 4 Stat Boxes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Box 1 */}
          <div className="group bg-blue-50 p-5 rounded-xl shadow-sm flex justify-between items-center h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Today’s Appointments
              </h4>
              <p className="text-2xl font-bold text-gray-900 transform transition-transform duration-300 group-hover:scale-110">
                {summary?.todayAppointments.length ?? 0}
              </p>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Box 2 */}
          <div className="group bg-orange-50 p-5 rounded-xl shadow-sm flex justify-between items-center h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Pending Confirmations
              </h4>
              <p className="text-2xl font-bold text-gray-900 transform transition-transform duration-300 group-hover:scale-110">
                {summary?.pending.count ?? 0}
              </p>
              {summary?.pending.count > 0 && (
                <p className="text-red-600 text-sm mt-1">⚠ Needs attention</p>
              )}
            </div>
            <div className="bg-orange-500 text-white p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Box 3 */}
          <div className="group bg-green-50 p-5 rounded-xl shadow-sm flex justify-between items-center h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Completed Consultations
              </h4>
              <p className="text-2xl font-bold text-gray-900 transform transition-transform duration-300 group-hover:scale-110">
                {summary?.completed.count ?? 0}
              </p>
            </div>
            <div className="bg-green-500 text-white p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Box 4 */}
          <div className="group bg-red-50 p-5 rounded-xl shadow-sm flex justify-between items-center h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Cancelled Appointments
              </h4>
              <p className="text-2xl font-bold text-gray-900 transform transition-transform duration-300 group-hover:scale-110">
                {summary?.cancelled.count ?? 0}
              </p>
            </div>
            <div className="bg-red-500 text-white p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Schedule + Quick Actions + Progress */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today’s Schedule */}
          <div className="bg-white rounded-2xl shadow-sm p-5 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Today’s Schedule
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>

            {schedule.length > 0 ? (
              schedule.map((item, index) => {
                const initials = item.patientName
                  ? item.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "NA";
                console.log("initial", item);

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 mb-3 border border-gray-100 rounded-xl hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.patient.fullName || "Unknown"}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.reason || "Consultation"}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Duration:{" "}
                          {item.duration || "30 min"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {item.timeSlot
                          ? `${item.timeSlot.start} - ${item.timeSlot.end}`
                          : "N/A"}
                      </p>

                      {item.status === "confirmed" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                          Confirmed
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                          Pending
                        </span>
                      )}
                      {item.status === "urgent" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
                          Urgent
                        </span>
                      )}
                      {item.status === "cancelled" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
                          Cancelled
                        </span>
                      )}

                      <div className="flex gap-2 mt-2 justify-end">
                        <div className="w-6 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 shadow-sm rounded-md hover:bg-gray-200 hover:shadow-md transition cursor-pointer">
                          <Video className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="w-6 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 shadow-sm rounded-md hover:bg-gray-200 hover:shadow-md transition cursor-pointer">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="w-6 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 shadow-sm rounded-md hover:bg-gray-200 hover:shadow-md transition cursor-pointer">
                          <MessageSquare className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="w-6 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 shadow-sm rounded-md hover:bg-gray-200 hover:shadow-md transition cursor-pointer">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No appointments scheduled for today.
              </p>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Video className="w-4 h-4" /> Start Video Call
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
                  <PlusCircle className="w-4 h-4" /> Add New Patient
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
                  <Calendar className="w-4 h-4" /> Schedule Appointment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
                  <BarChart3 className="w-4 h-4" /> View Analytics
                </button>
              </div>
            </div>

            {/* Today’s Progress */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-4">Today’s Progress</h3>
              <div className="space-y-4">
                {/* Appointments Completed */}
                <div>
                  <p className="flex justify-between text-sm">
                    <span>Appointments Completed</span>
                    <span className="font-medium">
                      {summary?.completedConsultations ?? 0}/
                      {summary?.appointmentsToday ?? 0}
                    </span>
                  </p>
                  <div className="w-full bg-green-100 h-2 rounded-full">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          ((summary?.completedConsultations ?? 0) /
                            (summary?.appointmentsToday ?? 1)) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div>
                  <p className="flex justify-between text-sm">
                    <span>Consultation Hours</span>
                    <span className="font-medium">
                      {summary?.consultationHours ?? 0}/
                      {summary?.workHours ?? 8}
                    </span>
                  </p>
                  <div className="w-full bg-blue-100 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((summary?.consultationHours ?? 0) /
                            (summary?.workHours ?? 8)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Patient Satisfaction */}
                <div>
                  <p className="flex justify-between text-sm">
                    <span>Patient Satisfaction</span>
                    <span className="font-medium text-purple-600">
                      {summary?.patientSatisfaction ?? 0}/5.0
                    </span>
                  </p>
                  <div className="w-full bg-purple-100 h-2 rounded-full">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((summary?.patientSatisfaction ?? 0) / 5) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center border-b pb-3 ${
                    index === recentActivities.length - 1 ? "border-none" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                    <div>
                      <p className="text-sm text-gray-700">
                        {activity.type === "completed"
                          ? "Completed appointments"
                          : activity.type === "confirmed"
                          ? "Confirmed appointments"
                          : activity.type === "pending"
                          ? "Pending appointments"
                          : "Cancelled appointments"}{" "}
                        for{" "}
                        <span className="font-semibold">
                          {summary.doctorName}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded border text-gray-600">
                    {activity.type}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsDashboard;
