import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";

import SearchFilters from "./DoctorPages/consuletion/SearchFilters";
import ConsultationsGrid from "./DoctorPages/consuletion/ConsultationsGrid";
import ConsultationModal from "./DoctorPages/consuletion/ConsultationModal";
import Header from "./DoctorPages/dashboard/Header";

const DoctorConsultationDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FETCH ALL CONSULTATIONS
  // =========================
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get("/doctor/getAllConsultations", {
          withCredentials: true,
        });

        setConsultations(res.data.data || []);
      } catch (err) {
        console.log("Error fetching consultations:", err);

        setError("Failed to load consultations");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // =========================
  // FETCH SINGLE CONSULTATION
  // =========================
  const handleSelectConsultation = async (id) => {
    try {
      setLoading(true);

      const res = await apiClient.get(`/doctor/getConsultations/${id}`, {
        withCredentials: true,
      });

      // window.console.log(res.data.data);

      setSelectedConsultation(res.data.consultation || res.data.data);
    } catch (err) {
      console.log("Error fetching consultation:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REMOVE DUPLICATES
  const patientMap = new Map();

  consultations.forEach((consultation) => {
    const patientId = consultation.patient?._id;

    // if patient not added
    if (!patientMap.has(patientId)) {
      patientMap.set(patientId, consultation);
    } else {
      // compare dates and keep latest
      const existing = patientMap.get(patientId);

      const existingDate = new Date(existing.createdAt);
      const newDate = new Date(consultation.createdAt);

      if (newDate > existingDate) {
        patientMap.set(patientId, consultation);
      }
    }
  });

  const uniqueConsultations = Array.from(patientMap.values());

  // =========================
  // FILTER CONSULTATIONS
  // =========================
  const filteredConsultations = uniqueConsultations.filter((consultation) => {
    const matchesSearch =
      consultation.patient?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      consultation.patient?.patientId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || consultation.consultationType === filterType;

    const matchesStatus =
      filterStatus === "all" || consultation.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <p className="text-[var(--brand)] font-semibold">
            Loading consultations...
          </p>
        )}

        {error && <p className="text-red-600">{error}</p>}

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <ConsultationsGrid
          consultations={filteredConsultations}
          onSelectConsultation={handleSelectConsultation}
        />
      </div>

      {selectedConsultation && (
        <ConsultationModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}
    </div>
  );
};

export default DoctorConsultationDashboard;
