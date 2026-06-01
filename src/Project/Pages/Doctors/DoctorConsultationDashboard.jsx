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

  // =======================
  // 🔥 FETCH CONSULTATIONS
  // =======================
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get("/doctor/getall", {
          withCredentials: true,
        });
        // console.log(res.data.data);

        setConsultations(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching consultations:", err);
        setError("Failed to load consultations");
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);
  // console.log(consultations);

  const uniqueConsultations = [];
  const seen = new Set();

  consultations.forEach((c) => {
    if (!seen.has(c.patientId)) {
      seen.add(c.patientId);
      uniqueConsultations.push(c);
    }
  });
  // console.log("uni",uniqueConsultations);

  const filteredConsultations = uniqueConsultations.filter((consultation) => {
    const matchesSearch =
      consultation.patient?.patientName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      consultation.patient?.patientId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || consultation.type === filterType;

    const matchesStatus =
      filterStatus === "all" || consultation.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });
  // console.log("fsdi",filteredConsultations);
  // console.log(selectedConsultation);

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
          onSelectConsultation={setSelectedConsultation}
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
