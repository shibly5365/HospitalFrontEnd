import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DashboardHeader from './DoctorPages/consuletion/DashboardHeader';
import SearchFilters from './DoctorPages/consuletion/SearchFilters';
import ConsultationsGrid from './DoctorPages/consuletion/ConsultationsGrid';
import ConsultationModal from './DoctorPages/consuletion/ConsultationModal';

const DoctorConsultationDashboard = () => {

  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // =======================
  // 🔥 FETCH CONSULTATIONS
  // =======================
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4002/api/doctor/getall",
          {
            withCredentials: true,
          }
        );
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

  consultations.forEach(c => {
    if (!seen.has(c.patientId)) {
      seen.add(c.patientId);
      uniqueConsultations.push(c);
    }
  });
  // console.log("uni",uniqueConsultations);
  

  const filteredConsultations = uniqueConsultations.filter(consultation => {
    const matchesSearch =
      consultation.patient?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.patient?.patientId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || consultation.type === filterType;

    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;

    
    return matchesSearch && matchesType && matchesStatus;
  });
  // console.log("fsdi",filteredConsultations);
  // console.log(selectedConsultation);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {loading && <p className="text-blue-600 font-semibold">Loading consultations...</p>}
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
