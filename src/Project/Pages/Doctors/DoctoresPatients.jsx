import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNav from "./DashboardNav";
import HeaderSection from "./DoctorPages/Patients/HeaderSection";
// import StatsCards from "./DoctorPages/Patients/StatsCards";
import SearchFilterBar from "./DoctorPages/Patients/SearchFilterBar";
import PatientsTable from "./DoctorPages/Patients/PatientsTable";
import PatientDrawer from "./DoctorPages/PatientDrawer";
import LoadingState from "./DoctorPages/Patients/LoadingState";
import ErrorState from "./DoctorPages/Patients/ErrorState";

const DoctoresPatients = () => {
  const [patients, setPatients] = useState([]); // basic list only
  const [activePatient, setActivePatient] = useState(null); // full detail from getById
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // FETCH ONLY BASIC PATIENT LIST
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4002/api/doctor/getallPatients",
          { withCredentials: true }
        );

        if (data.success) {
          setPatients(data.patients);
        } else {
          setError(data.message || "Failed to fetch patients");
        }
      } catch (err) {
        console.error("Fetch Patients Error:", err);
        setError("Server error or network issue");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  console.log("adaskd",activePatient);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-50">
        <DashboardNav />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeaderSection onAddPatient={() => navigate("/doctors/patients-add")} />

        {/* StatsCards should use FULL patient data */}
        {/* <StatsCards patient={activePatient} /> */}

        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PatientsTable
          patients={filteredPatients}
          totalPatients={patients.length}
          onViewPatient={async (patient) => {
            try {
              const { data } = await axios.get(
                `http://localhost:4002/api/doctor/allPatients/${patient.id}`,
                { withCredentials: true }
              );
              console.log(data);
              

              if (data.success) {
                setActivePatient(data);  // store full data
                setIsDrawerOpen(true);
              }
            } catch (err) {
              console.error("Fetch Patient By ID Error:", err);
            }
          }}
        />
      </div>

      <PatientDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        patient={activePatient} // send by-id data
      />
    </div>
  );
};

export default DoctoresPatients;
