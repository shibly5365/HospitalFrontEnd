import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Eye,
  Calendar,
  Clock,
  MapPin,
  X,
  AlertCircle,
} from "lucide-react";

const dummyPrescriptions = [
  {
    id: "1",
    prescriptionId: "RX-20250514-4782",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialization: "Cardiologist",
    doctorImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    hospitalName: "Medicare Superspeciality Hospital",
    hospitalAddress: "MG Road, Kochi, Kerala",
    consultationDate: "2025-05-10",
    prescriptionDate: "2025-05-10",
    diagnosis: "Hypertension (Stage 1)",
    symptoms: "Headache, dizziness, high BP",
    status: "Active",
    medicineCount: 3,
    followUpDate: "2025-06-10",
    doctorNotes: "Monitor BP daily. Reduce salt intake.",
    medicines: [
      {
        name: "Amlodipine 5mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        timing: "After food",
        notes: "At bedtime",
      },
      {
        name: "Losartan 50mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        timing: "Morning",
        notes: "",
      },
      {
        name: "Aspirin 75mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        timing: "After food",
        notes: "",
      },
    ],
  },
  {
    id: "2",
    prescriptionId: "RX-20250508-3921",
    doctorName: "Dr. Arjun Menon",
    doctorSpecialization: "Orthopedic Surgeon",
    doctorImage:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    hospitalName: "Lakeshore Hospital",
    hospitalAddress: "NH Bypass, Kochi",
    consultationDate: "2025-05-08",
    prescriptionDate: "2025-05-08",
    diagnosis: "Knee Osteoarthritis",
    symptoms: "Right knee pain, swelling",
    status: "Completed",
    medicineCount: 4,
    followUpDate: "2025-05-20",
    doctorNotes: "Physiotherapy recommended 3 times a week.",
    medicines: [
      {
        name: "Aceclofenac 100mg",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "10 days",
        timing: "After food",
        notes: "For pain",
      },
    ],
  },
  {
    id: "3",
    prescriptionId: "RX-20250428-6519",
    doctorName: "Dr. Ananya Nair",
    doctorSpecialization: "Pediatrician",
    doctorImage:
      "https://images.unsplash.com/photo-1594824476967-4e9f7c0f0c0e?w=150&h=150&fit=crop",
    hospitalName: "Kerala Medical Center",
    hospitalAddress: "Vyttila, Kochi",
    consultationDate: "2025-04-28",
    prescriptionDate: "2025-04-28",
    diagnosis: "Viral Fever",
    symptoms: "Fever, cough, cold",
    status: "Expired",
    medicineCount: 2,
    followUpDate: "2025-05-05",
    doctorNotes: "Child recovered well.",
    medicines: [],
  },
];

const statusConfig = {
  Active: {
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    label: "Active",
  },
  Completed: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    label: "Completed",
  },
  Expired: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "Expired",
  },
};

const PrescriptionHistory = () => {

  const [prescriptions] = useState(dummyPrescriptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((rx) => {
      const matchesSearch =
        rx.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rx.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || rx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [prescriptions, searchTerm, statusFilter]);

  const totalPrescriptions = prescriptions.length;
  const activeCount = prescriptions.filter((p) => p.status === "Active").length;
  const lastConsultation = prescriptions[0]?.consultationDate;

  return (
    <div className="min-h-screen theme-soft">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold theme-text">
              Prescription History
            </h1>
            <p className="theme-text-muted mt-1">
              View and manage all your medical prescriptions
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 theme-card border theme-border rounded-2xl hover:bg-white/5 mt-4 md:mt-0">
            <Download size={20} />
            Download All
          </button>
        </div>

        {/* Patient Summary Card */}
        <div className="theme-card rounded-3xl shadow-sm border theme-border p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
              alt="Patient"
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold theme-text">
                Nuh Ahmed
              </h2>
              <p className="theme-text-muted">
                Patient ID: PT-984721
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-sm theme-text-muted">
                  Total Prescriptions
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {totalPrescriptions}
                </p>
              </div>
              <div>
                <p className="text-sm theme-text-muted">
                  Active Medicines
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {activeCount}
                </p>
              </div>
              <div>
                <p className="text-sm theme-text-muted">
                  Last Consultation
                </p>
                <p className="text-lg font-medium theme-text">
                  {lastConsultation}
                </p>
              </div>
              <div>
                <p className="text-sm theme-text-muted">
                  Primary Doctor
                </p>
                <p className="text-lg font-medium theme-text">
                  Dr. Priya Sharma
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-3.5 theme-text-muted"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by doctor, diagnosis or RX ID..."
              className="w-full pl-12 pr-4 py-3 theme-card border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-indigo-500 theme-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-5 py-3 theme-card border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none theme-text"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Prescriptions</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Expired">Expired</option>
          </select>

          <button className="px-5 py-3 theme-card border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center gap-2 hover:bg-white/5">
            <Calendar size={20} />
            Date Range
          </button>
        </div>

        {/* Prescriptions Table */}
        <div className="theme-card rounded-3xl shadow-sm border theme-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="theme-soft border-b theme-border sticky top-0">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Prescription ID
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Doctor
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Date
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Diagnosis
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Medicines
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-medium theme-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-5 text-right text-sm font-medium theme-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y theme-border">
                {filteredPrescriptions.map((rx) => (
                  <tr
                    key={rx.id}
                    className="hover:bg-white/5 /50 transition-colors"
                  >
                    <td className="px-6 py-5 font-medium theme-text">
                      {rx.prescriptionId}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={rx.doctorImage}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium theme-text">
                            {rx.doctorName}
                          </p>
                          <p className="text-sm theme-text-muted">
                            {rx.doctorSpecialization}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm theme-text">
                      {rx.prescriptionDate}
                    </td>
                    <td className="px-6 py-5 text-sm theme-text-muted max-w-xs truncate">
                      {rx.diagnosis}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm font-medium">
                        {rx.medicineCount} Medicines
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-2xl text-sm font-medium border ${statusConfig[rx.status].color}`}
                      >
                        {rx.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPrescription(rx)}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                        >
                          <Eye
                            size={20}
                            className="theme-text-muted"
                          />
                        </button>
                        <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors">
                          <Download
                            size={20}
                            className="theme-text-muted"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-20 theme-text-muted dark:theme-text-muted">
            No prescriptions found
          </div>
        )}
      </div>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="theme-card rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold theme-text">
                  Prescription Details
                </h3>
                <p className="theme-text-muted">
                  {selectedPrescription.prescriptionId}
                </p>
              </div>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl"
              >
                <X size={26} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {/* Doctor & Hospital Info */}
              <div className="flex gap-6 mb-8">
                <img
                  src={selectedPrescription.doctorImage}
                  alt={selectedPrescription.doctorName}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold">
                    {selectedPrescription.doctorName}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-500">
                    {selectedPrescription.doctorSpecialization}
                  </p>
                  <div className="flex items-center gap-2 mt-2 theme-text-muted">
                    <MapPin size={18} />
                    <span>{selectedPrescription.hospitalName}</span>
                  </div>
                </div>
              </div>

              {/* Diagnosis & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="theme-soft p-5 rounded-2xl">
                  <h5 className="font-medium mb-2">Diagnosis</h5>
                  <p className="theme-text">
                    {selectedPrescription.diagnosis}
                  </p>
                </div>
                <div className="theme-soft p-5 rounded-2xl">
                  <h5 className="font-medium mb-2">Follow-up Date</h5>
                  <p className="theme-text">
                    {selectedPrescription.followUpDate}
                  </p>
                </div>
              </div>

              {/* Medicines Table */}
              <div className="mb-8">
                <h5 className="font-semibold mb-4 text-lg">
                  Prescribed Medicines
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="theme-soft">
                        <th className="px-4 py-3 text-left">Medicine</th>
                        <th className="px-4 py-3 text-left">Dosage</th>
                        <th className="px-4 py-3 text-left">Frequency</th>
                        <th className="px-4 py-3 text-left">Duration</th>
                        <th className="px-4 py-3 text-left">Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                      {selectedPrescription.medicines.map((med, index) => (
                        <tr
                          key={index}
                          className="hover:bg-white/5"
                        >
                          <td className="px-4 py-4 font-medium">{med.name}</td>
                          <td className="px-4 py-4">{med.dosage}</td>
                          <td className="px-4 py-4">{med.frequency}</td>
                          <td className="px-4 py-4">{med.duration}</td>
                          <td className="px-4 py-4 text-sm">{med.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Doctor Notes */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-2xl">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-600" />
                  Doctor's Notes
                </h5>
                <p className="theme-text-muted">
                  {selectedPrescription.doctorNotes}
                </p>
              </div>
            </div>

            <div className="p-6 border-t dark:border-gray-700 flex gap-3">
              <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium transition">
                Download PDF
              </button>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="flex-1 py-4 border theme-border rounded-2xl font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;
