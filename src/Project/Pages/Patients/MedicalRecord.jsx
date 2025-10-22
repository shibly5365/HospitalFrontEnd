import React, { useState, useMemo } from "react";
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
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

// Mock Data
const mockData = {
  patient: {
    name: "John Doe",
    age: 29,
    gender: "Male",
    bloodGroup: "O+",
    contact: "john@example.com",
    phone: "+91-9876543210",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    allergies: "None",
    chronic: "Hypertension",
    height: 175,
    weight: 72,
  },
  records: {
    prescriptions: [
      {
        date: "2025-09-10",
        doctor: "Dr. Sarah Thomas",
        department: "Cardiology",
        medicines: [
          { name: "Aspirin", dosage: "75mg", duration: "10 days" },
        ],
      },
    ],
    consultations: [
      {
        date: "2025-08-15",
        doctor: "Dr. Rajesh Kumar",
        department: "Orthopedics",
        reason: "Knee pain",
        notes: "Physiotherapy recommended",
      },
    ],
    labReports: [
      {
        date: "2025-09-12",
        test: "CBC",
        file: "CBC_Report_2025-09-12.pdf",
        url: "#",
        type: "pdf",
      },
    ],
  },
};

const TABS = [
  { name: "Prescriptions", icon: Syringe },
  { name: "Consultations", icon: Stethoscope },
  { name: "Lab Reports", icon: FileText },
  { name: "Vitals & Info", icon: HeartPulse },
];

function Card({ children, className }) {
  return (
    <div className={classNames(
      "bg-white rounded-2xl shadow-md p-5 mb-4",
      className
    )}>{children}</div>
  );
}

function Section({ title, icon: Icon, children, collapsed, setCollapsed }) {
  return (
    <Card className="relative">
      <button
        className="flex items-center gap-2 mb-4 text-blue-700 font-semibold focus:outline-none hover:text-teal-600"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon size={22} /> {title}
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function PatientSummary({ patient, onEdit }) {
  const { name, age, gender, bloodGroup, contact, phone, photo } = patient;
  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 relative">
      <img
        src={photo}
        alt="Patient"
        className="w-24 h-24 rounded-full border-4 border-blue-100 shadow object-cover"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <User size={20} /> {name}
          </span>
          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-800 rounded-md">{gender}</span>
          <span className="px-2 py-1 text-xs bg-green-50 text-green-800 rounded-md">{age} yrs</span>
          <span className="px-2 py-1 text-xs bg-red-50 text-red-800 rounded-md">Blood: {bloodGroup}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-5 text-gray-600">
          <span className="flex items-center gap-1"><Mail size={16} /> {contact}</span>
          <span className="flex items-center gap-1"><Phone size={16} /> {phone}</span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="shrink-0 absolute right-5 top-5 md:static md:ml-8 bg-blue-50 hover:bg-blue-100 rounded-full p-2 shadow transition-all"
        aria-label="Edit Personal Details"
      >
        <Edit2 size={20} className="text-blue-800" />
      </button>
    </Card>
  );
}

function FilterBar({ search, setSearch, filter, setFilter, tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-2">
      <div className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={19} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-blue-50 border-blue-100 focus:ring-2 focus:ring-blue-200 transition"
            placeholder="Search doctor or department..."
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border bg-green-50 border-green-100 text-gray-700 focus:ring-2 focus:ring-green-200 transition"
          >
            <option value="">All Types</option>
            <option value="Prescriptions">Prescriptions</option>
            <option value="Consultations">Consultations</option>
            <option value="Lab Reports">Lab Reports</option>
          </select>
        </div>
      </div>
      <div className="flex gap-1 justify-between md:justify-end mt-2 md:mt-0">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            className={classNames(
              "flex items-center gap-1 px-3 py-2 rounded-full font-medium focus:outline-none transition text-sm",
              activeTab === i
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            )}
            onClick={() => onTabChange(i)}
          >
            <tab.icon size={18} /> {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Modal({ show, onClose, children, title }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-[95vw] max-w-md p-6 relative"
            initial={{ scale: 0.96, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 30, opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded bg-gray-100 hover:bg-gray-200"
              aria-label="Close"
            >
              <ChevronDown size={20} className="rotate-180" />
            </button>
            {title && <h3 className="text-blue-700 font-semibold mb-3 flex items-center gap-2">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PrescriptionsSection({ prescriptions }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openModal(prescription) {
    setSelected(prescription);
    setModalOpen(true);
  }
  return (
    <div>
      {prescriptions.length === 0 && (
        <p className="text-gray-500">No prescriptions found.</p>
      )}
      {prescriptions.map((p, idx) => (
        <Card key={idx} className="mb-3 bg-blue-50 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <span className="flex items-center gap-2 text-blue-700">
              <Syringe size={20} /> {p.doctor} <span className="mx-2 text-gray-400">|</span> {p.department}
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Calendar size={17} /> {p.date}
            </span>
            <button
              className="ml-auto flex items-center gap-1 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              onClick={() => openModal(p)}
            >
              <FileText size={16} /> View Details
            </button>
          </div>
        </Card>
      ))}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} title="Prescription Details">
        {selected && (
          <div>
            <div className="mb-2 text-blue-800">Doctor: {selected.doctor}</div>
            <div className="mb-2">Department: {selected.department}</div>
            <div className="mb-2">Date: {selected.date}</div>
            <div className="font-semibold text-gray-700 mt-2">Medicines:</div>
            <ul className="list-disc list-inside pl-2 mb-2">
              {selected.medicines.map((m, i) => (
                <li key={i} className="mb-1">
                  {m.name} – {m.dosage}, {m.duration}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ConsultationsSection({ consultations }) {
  return (
    <div>
      {consultations.length === 0 && (
        <p className="text-gray-500">No consultations found.</p>
      )}
      {consultations.map((c, idx) => (
        <Card key={idx} className="mb-3 bg-green-50 border border-green-100">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <span className="flex items-center gap-2 text-green-700">
              <Stethoscope size={18} /> {c.doctor} <span className="mx-2 text-gray-400">|</span> {c.department}
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} /> {c.date}
            </span>
            <div className="flex-1" />
            <span className="text-sm text-gray-700">
              <span className="font-medium">Reason:</span> {c.reason}
              <span className="ml-2 text-xs text-gray-500">{c.notes}</span>
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function LabReportsSection({ labReports }) {
  return (
    <div>
      {labReports.length === 0 && (
        <p className="text-gray-500">No lab reports found.</p>
      )}
      {labReports.map((l, idx) => (
        <Card key={idx} className="mb-3 bg-purple-50 border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <span className="flex items-center gap-2 text-purple-700">
              <File size={18} /> {l.test}
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} /> {l.date}
            </span>
            <span className="ml-auto flex items-center gap-3">
              <a
                href={l.url}
                className="flex gap-2 items-center px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
                download
              >
                <Download size={16} /> Download
              </a>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 items-center text-purple-700 underline text-sm"
              >
                <FileText size={16} /> Preview
              </a>
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function VitalsSection({ patient }) {
  // BMI calculation
  const { height, weight, bloodGroup, allergies, chronic } = patient;
  const bmi = useMemo(() => (height && weight ? (weight / (height / 100) ** 2).toFixed(1) : "--"), [height, weight]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card className="bg-teal-50 border border-teal-100 flex flex-col gap-2">
        <span className="flex items-center gap-2 text-teal-700"><BloodIcon /> Blood Group: {bloodGroup}</span>
        <span className="flex items-center gap-2 text-amber-800"><ShieldPlus size={18} /> Allergies: {allergies || "None"}</span>
        <span className="flex items-center gap-2 text-violet-900"><Stethoscope size={17} /> Chronic: {chronic || "None"}</span>
      </Card>
      <Card className="bg-teal-50 border border-teal-100 flex flex-col gap-2">
        <span className="text-teal-800">Height: {height || "--"} cm</span>
        <span className="text-teal-800">Weight: {weight || "--"} kg</span>
        <span className="text-teal-800 font-medium">BMI: {bmi}</span>
      </Card>
    </div>
  );
}

// Blood drop icon (not in lucide-react yet)
function BloodIcon() {
  return <svg width={20} height={20} fill="none" viewBox="0 0 20 20"><path stroke="#0ea5e9" strokeWidth={1.6} d="M10.887 3.496a1 1 0 0 0-1.774 0C6.047 8.189 4.608 10.474 4.608 12.308c0 3.164 2.55 5.308 5.392 5.308s5.392-2.144 5.392-5.308c0-1.834-1.44-4.12-4.505-8.812Z"/></svg>
}

export default function MedicalRecordDashboard() {
  const [tab, setTab] = useState(0);
  const [collapsed, setCollapsed] = useState([false, false, false, false]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  // Modal for editing patient details (not implemented)
  const [editModal, setEditModal] = useState(false);

  const patient = mockData.patient;
  const records = mockData.records;

  // Filter logic
  function filterRecords(list, type) {
    return list.filter(item => {
      let show = true;
      // Filter by search
      if (search)
        show = (item.doctor && item.doctor.toLowerCase().includes(search.toLowerCase())) ||
               (item.department && item.department.toLowerCase().includes(search.toLowerCase()));
      // Filter by type
      if (filter && filter !== type) show = false;
      return show;
    });
  }

  function handleCollapse(idx) {
    setCollapsed(prev => prev.map((c, i) => i === idx ? !c : c));
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
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

      <Section
        title="Prescriptions"
        icon={Syringe}
        collapsed={collapsed[0]}
        setCollapsed={() => handleCollapse(0)}
      >
        {tab === 0 && (
          <PrescriptionsSection prescriptions={filterRecords(records.prescriptions, "Prescriptions")} />
        )}
      </Section>

      <Section
        title="Consultations"
        icon={Stethoscope}
        collapsed={collapsed[1]}
        setCollapsed={() => handleCollapse(1)}
      >
        {tab === 1 && (
          <ConsultationsSection consultations={filterRecords(records.consultations, "Consultations")} />
        )}
      </Section>

      <Section
        title="Lab Reports"
        icon={FileText}
        collapsed={collapsed[2]}
        setCollapsed={() => handleCollapse(2)}
      >
        {tab === 2 && (
          <LabReportsSection labReports={filterRecords(records.labReports || [], "Lab Reports")} />
        )}
      </Section>

      <Section
        title="Vitals & Common Info"
        icon={HeartPulse}
        collapsed={collapsed[3]}
        setCollapsed={() => handleCollapse(3)}
      >
        {tab === 3 && <VitalsSection patient={patient} />}
      </Section>

      {/* Modal for editing personal info (placeholder) */}
      <Modal show={editModal} onClose={() => setEditModal(false)} title="Edit Personal Details">
        {/* TODO: Replace with actual form fields */}
        <div className="text-gray-700">Edit form coming soon.</div>
      </Modal>
    </div>
  );
}
