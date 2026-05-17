import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from 'react';

import Header from './DoctorPages/Prescription/Header';
import SearchFilters from './DoctorPages/Prescription/SearchFilters';
import StatsCards from './DoctorPages/Prescription/StatsCards';
import PrescriptionsGrid from './DoctorPages/Prescription/PrescriptionsGrid';
import Pagination from './DoctorPages/Prescription/Pagination';
import PrescriptionModal from './DoctorPages/Prescription/PrescriptionModal';

const DoctorPrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🔥 Fetch prescriptions from backend
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await apiClient.get("/doctor/getPres", {
          withCredentials: true,
        });

        console.log("Fetched data:", res.data);

        // ✔️ Map Backend → Frontend Structure
        const mappedData = res.data.uniquePatients.map((p) => ({
          id: p._id,
          patientName: p.patient?.fullName || "Unknown",
          patientId: p.patient?.patientId || "N/A",
          contact: p.patient?.contact || "N/A",
          age: p.patient?.age || "-",
          gender: p.patient?.gender || "-",

          date: p.medicalRecord?.createdAt?.slice(0, 10) || "N/A",
          diagnosis: p.medicalRecord?.diagnosis || "",
          symptoms: p.medicalRecord?.symptoms || "",
          medicines: p.medicalRecord?.medicines || [],
          instructions: p.notes || "No instructions",
          status: p.medicalRecord?.status || "Active",
          followUp: p.medicalRecord?.followUp || null,
        }));

        setPrescriptions(mappedData);

      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      }
    };
    
    fetchPrescriptions();
  }, []);
  
  console.log("sfdsadnf",filterStatus);
  // 🔍 Filtering logic
  const filteredPrescriptions = prescriptions.filter((p) => {
    const matchesSearch =
      p.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact?.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });
  

  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(startIndex, endIndex);

  // console.log("sle", selectedPrescription);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <StatsCards prescriptions={prescriptions} />

        <PrescriptionsGrid
          prescriptions={currentPrescriptions}
          onViewPrescription={async (prescription) => {
            console.log();

            try {
              const res = await apiClient.get(
                `/doctor/getPres/${prescription.id}`,
                { withCredentials: true }
              );
              console.log("id", res.data.prescription);


              setSelectedPrescription(res.data.prescription); 
            } catch (error) {
              console.error("Failed to fetch full prescription:", error);
            }
          }}
        />


        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          filteredPrescriptions={filteredPrescriptions}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <PrescriptionModal
        prescription={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />
    </div>
  );
};

export default DoctorPrescriptionHistory;
