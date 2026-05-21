import { apiClient } from "../../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import ScheduleCreationPanel from "./Schedules/ScheduleCreationPanel";
import SchedulesSidebar from "./Schedules/SchedulesSidebar";
import { generateTimeOptions } from "./Schedules/utils";
import  {notify}  from "../../../../../units/notification";

const timeOptions = generateTimeOptions();

const DoctorSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch schedules
  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/doctor/getSchedule", {
        withCredentials: true,
      });
      console.log("scuue",res.data);
      
      setSchedules(res.data.schedules || []);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setSchedules([]);
      notify.error("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Calendar className="text-blue-600" size={32} />
            Doctor Schedule Management
          </h1>
          <p className="text-gray-600">Manage your availability and appointment slots</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <ScheduleCreationPanel 
            onScheduleCreated={fetchSchedules}
            timeOptions={timeOptions}
          />
          <SchedulesSidebar 
            schedules={schedules}
            loading={loading}
            onScheduleDelete={fetchSchedules}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedules;