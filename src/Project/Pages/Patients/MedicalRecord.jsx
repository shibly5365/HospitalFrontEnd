import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  FileText,
  Stethoscope,
  Calendar,
  Search,
  Download,
  Edit2,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  ShieldPlus,
  File,
  Syringe,
  Filter,
  Activity,
  Clock,
  TrendingUp,
  X,
} from "lucide-react";
import { usePatient } from "../../../context/PatientContext";

const TABS = [
  { name: "Prescriptions", icon: Syringe, color: "emerald" },
  { name: "Consultations", icon: Stethoscope, color: "blue" },
  { name: "Lab Reports", icon: FileText, color: "purple" },
  { name: "Vitals", icon: HeartPulse, color: "rose" },
];

function Card({ children, className = "", gradient = false }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6 ${gradient ? "bg-gradient-to-br from-white to-gray-50" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function PatientSummary({ patient, onEdit }) {
  const { name, age, gender, bloodGroup, contact, phone, photo } = patient;
  return (
    <Card className="relative overflow-hidden mb-8" gradient>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-0"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <img
            src={photo}
            alt="Patient"
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-2xl object-cover ring-4 ring-blue-100"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md">
                {gender}
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-md">
                {age} years
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full shadow-md">
                {bloodGroup}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
            <span className="flex items-center justify-center md:justify-start gap-2 group">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Mail size={16} className="text-blue-600" />
              </div>
              <span className="text-sm break-all">{contact}</span>
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2 group">
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Phone size={16} className="text-emerald-600" />
              </div>
              <span className="text-sm break-all">{phone}</span>
            </span>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 p-3 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Edit Personal Details"
        >
          <Edit2
            size={20}
            className="text-white group-hover:rotate-12 transition-transform"
          />
        </button>
      </div>
    </Card>
  );
}

function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  tabs,
  activeTab,
  onTabChange,
}) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white shadow-sm hover:shadow-md"
            placeholder="Search doctors, departments..."
          />
        </div>

        <div className="relative group sm:w-64">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors"
            size={20}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
          >
            <option value="">All Records</option>
            <option value="Prescriptions">Prescriptions</option>
            <option value="Consultations">Consultations</option>
            <option value="Lab Reports">Lab Reports</option>
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeTab === i;
          return (
            <button
              key={tab.name}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg ${
                isActive
                  ? `bg-gradient-to-r ${
                      tab.color === "emerald"
                        ? "from-emerald-500 to-emerald-600"
                        : tab.color === "blue"
                          ? "from-blue-500 to-blue-600"
                          : tab.color === "purple"
                            ? "from-purple-500 to-purple-600"
                            : "from-rose-500 to-rose-600"
                    } text-white scale-105`
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => onTabChange(i)}
            >
              <Icon size={20} className={isActive ? "" : "opacity-60"} />
              <span className="text-xs sm:text-sm">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Modal({ show, onClose, children, title }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-5 md:p-6 rounded-t-3xl flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <div className="p-4 sm:p-5 md:p-6">{children}</div>
      </div>
    </div>
  );
}

function PrescriptionsSection({ prescriptions }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // expand doctor group
  const [openDoctor, setOpenDoctor] = useState(null);

  const ITEMS_PER_PAGE = 3;

  function openModal(prescription) {
    setSelected(prescription);
    setModalOpen(true);
  }

  // ================================
  // Group by doctor
  // ================================
  const groupedPrescriptions = useMemo(() => {
    const grouped = {};

    prescriptions.forEach((p) => {
      if (!grouped[p.doctor]) {
        grouped[p.doctor] = [];
      }

      grouped[p.doctor].push(p);
    });

    return Object.entries(grouped);
  }, [prescriptions]);

  // ================================
  // Pagination
  // ================================
  const totalPages = Math.ceil(
    groupedPrescriptions.length / ITEMS_PER_PAGE
  );

  const paginatedDoctors = groupedPrescriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-5">
      {paginatedDoctors.map(([doctor, doctorPrescriptions], idx) => (
        <Card
          key={idx}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
        >
          {/* Doctor Header */}
          <button
            onClick={() =>
              setOpenDoctor(openDoctor === doctor ? null : doctor)
            }
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <Syringe className="text-white" size={20} />
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {doctor}
                </h3>

                <p className="text-sm text-emerald-700">
                  {doctorPrescriptions.length} Prescriptions
                </p>
              </div>
            </div>

            {openDoctor === doctor ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </button>

          {/* Expand Section */}
          {openDoctor === doctor && (
            <div className="mt-5 space-y-4">
              {doctorPrescriptions.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {p.department}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={15} />
                        {p.date}
                      </div>
                    </div>

                    <button
                      onClick={() => openModal(p)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Prescription Details"
      >
        {selected && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl space-y-2">
              <div className="flex justify-between">
                <span>Doctor</span>
                <span className="font-semibold">
                  {selected.doctor}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-semibold">
                  {selected.date}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {selected.medicines.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gray-50"
                >
                  <p className="font-semibold">{m.name}</p>

                  <p className="text-sm text-gray-500">
                    {m.dosage} • {m.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
function ConsultationsSection({ consultations }) {
  const [openDoctor, setOpenDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // =========================================
  // Group consultations by doctor
  // =========================================
  const groupedConsultations = useMemo(() => {
    const grouped = {};

    consultations.forEach((c) => {
      if (!grouped[c.doctor]) {
        grouped[c.doctor] = [];
      }

      grouped[c.doctor].push(c);
    });

    // Sort latest first
    Object.keys(grouped).forEach((doctor) => {
      grouped[doctor].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    });

    return Object.entries(grouped);
  }, [consultations]);

  // =========================================
  // Pagination
  // =========================================
  const totalPages = Math.ceil(
    groupedConsultations.length / ITEMS_PER_PAGE
  );

  const paginatedConsultations = groupedConsultations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-5">
      {consultations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="text-gray-400" size={32} />
          </div>

          <p className="text-gray-500 font-medium">
            No consultations found
          </p>
        </div>
      )}

      {paginatedConsultations.map(
        ([doctor, doctorConsultations], idx) => (
          <Card
            key={idx}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
          >
            {/* ===================== */}
            {/* Doctor Header */}
            {/* ===================== */}
            <button
              onClick={() =>
                setOpenDoctor(
                  openDoctor === doctor ? null : doctor
                )
              }
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Stethoscope
                    size={20}
                    className="text-white"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {doctor}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-blue-700">
                      {
                        doctorConsultations[0]
                          ?.department
                      }
                    </p>

                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {doctorConsultations.length} Visits
                    </span>
                  </div>
                </div>
              </div>

              {openDoctor === doctor ? (
                <ChevronUp
                  className="text-gray-600"
                  size={22}
                />
              ) : (
                <ChevronDown
                  className="text-gray-600"
                  size={22}
                />
              )}
            </button>

            {/* ===================== */}
            {/* Expanded Content */}
            {/* ===================== */}
            {openDoctor === doctor && (
              <div className="mt-5 space-y-4">
                {doctorConsultations.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-blue-100 p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-start lg:justify-between">
                      {/* Left */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={15} />
                          <span>{c.date}</span>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <div className="text-xs uppercase font-semibold text-blue-700 mb-1">
                            Reason
                          </div>

                          <div className="text-sm text-gray-800 font-medium">
                            {c.reason}
                          </div>
                        </div>

                        {c.notes && (
                          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                            <div className="text-xs uppercase font-semibold text-indigo-700 mb-1">
                              Notes
                            </div>

                            <div className="text-sm text-gray-700">
                              {c.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )
      )}

      {/* ===================== */}
      {/* Pagination */}
      {/* ===================== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 rounded-xl bg-blue-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function LabReportsSection({ labReports }) {
  return (
    <div className="space-y-4">
      {labReports.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500 font-medium">No lab reports found</p>
        </div>
      )}
      {labReports.map((l, idx) => (
        <Card
          key={idx}
          className="hover:md:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-100"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-purple-500 rounded-xl shadow-lg">
                <File size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 break-words">
                  {l.test}
                </h4>
                <div className="flex items-center gap-2 text-sm text-purple-700 mt-1">
                  <Calendar size={16} />
                  <span>{l.date}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <a
                href={l.url}
                className="px-3 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
                download
              >
                <Download size={18} />
                <span>Download</span>
              </a>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-5 py-2.5 sm:py-3 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 border-2 border-purple-200 font-semibold flex items-center gap-2"
              >
                <FileText size={18} />
                <span>Preview</span>
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function VitalsSection({ patient, vitals }) {
  const { height, weight, bloodGroup, allergies, chronic } = patient;
  const bmi = useMemo(() => {
    if (height && weight) {
      return (weight / (height / 100) ** 2).toFixed(1);
    }
    return "--";
  }, [height, weight]);

  const getBMIStatus = (bmi) => {
    if (bmi === "--") return { text: "N/A", color: "gray" };
    const val = parseFloat(bmi);
    if (val < 18.5) return { text: "Underweight", color: "yellow" };
    if (val < 25) return { text: "Normal", color: "green" };
    if (val < 30) return { text: "Overweight", color: "orange" };
    return { text: "Obese", color: "red" };
  };

  const bmiStatus = getBMIStatus(bmi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="text-rose-600" size={24} />
          Medical Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              Blood Group
            </span>
            <span className="font-bold text-gray-800">{bloodGroup}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-600 flex items-center gap-2">
              <ShieldPlus size={16} className="text-amber-500" />
              Allergies
            </span>
            <span className="font-semibold text-gray-800">
              {allergies || "None"}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-600 flex items-center gap-2">
              <Stethoscope size={16} className="text-violet-500" />
              Chronic Conditions
            </span>
            <span className="font-semibold text-gray-800">
              {chronic || "None"}
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-cyan-600" size={24} />
          Physical Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-600">Height</span>
            <span className="font-bold text-gray-800">{height || "--"} cm</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-600">Weight</span>
            <span className="font-bold text-gray-800">{weight || "--"} kg</span>
          </div>
          <div className="p-4 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl border-2 border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-semibold">BMI</span>
              <span className="text-2xl font-bold text-gray-800">{bmi}</span>
            </div>
            <div
              className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                bmiStatus.color === "green"
                  ? "bg-green-200 text-green-800"
                  : bmiStatus.color === "yellow"
                    ? "bg-yellow-200 text-yellow-800"
                    : bmiStatus.color === "orange"
                      ? "bg-orange-200 text-orange-800"
                      : bmiStatus.color === "red"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
              }`}
            >
              {bmiStatus.text}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function MedicalRecordDashboard() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editModal, setEditModal] = useState(false);

  // Use Redux/Context instead of local state
  const { medicalRecords } = usePatient();
  const {
    patient,
    prescriptions,
    consultations,
    labReports,
    vitals,
    loading,
    loadMedicalRecords,
  } = medicalRecords;

  // Fetch medical records on component mount
  useEffect(() => {
    loadMedicalRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format records for component use
  const records = useMemo(
    () => ({
      prescriptions,
      consultations,
      labReports,
      vitals,
    }),
    [prescriptions, consultations, labReports, vitals],
  );

  function filterRecords(list, type) {
    return list.filter((item) => {
      let show = true;
      if (search) {
        const searchLower = search.toLowerCase();
        show =
          (item.doctor && item.doctor.toLowerCase().includes(searchLower)) ||
          (item.department &&
            item.department.toLowerCase().includes(searchLower)) ||
          (item.test && item.test.toLowerCase().includes(searchLower)) ||
          (item.reason && item.reason.toLowerCase().includes(searchLower));
      }
      if (filter && filter !== type) show = false;
      return show;
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading medical records...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (tab) {
      case 0:
        return (
          <PrescriptionsSection
            prescriptions={filterRecords(
              records.prescriptions,
              "Prescriptions",
            )}
          />
        );
      case 1:
        return (
          <ConsultationsSection
            consultations={filterRecords(
              records.consultations,
              "Consultations",
            )}
          />
        );
      case 2:
        return (
          <LabReportsSection
            labReports={filterRecords(records.labReports || [], "Lab Reports")}
          />
        );
      case 3:
        return <VitalsSection patient={patient} vitals={records.vitals} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-4 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 break-words">
            Medical Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Comprehensive health records and vital information
          </p>
        </div>

        <PatientSummary patient={patient} onEdit={() => setEditModal(true)} />

        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          tabs={TABS}
          activeTab={tab}
          onTabChange={setTab}
        />

        <div className="min-h-[400px]">{renderContent()}</div>

        <Modal
          show={editModal}
          onClose={() => setEditModal(false)}
          title="Edit Personal Details"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Edit functionality coming soon. This will allow you to update
              patient information.
            </p>
            <button
              onClick={() => setEditModal(false)}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
