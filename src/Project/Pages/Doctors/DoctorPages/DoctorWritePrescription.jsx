import React, { useMemo, useState } from "react";
import {
  createMedicalRecordApi,
  createPrescriptionApi,
  createNextVisitAppointmentApi,
} from "../../Doctors/doctorPrescriptionApi";

import {
  Plus,
  Trash2,
  ClipboardList,
  Stethoscope,
  Pill,
  Activity,
  TestTube2,
  FileText,
  CalendarDays,
} from "lucide-react";
import { notify } from "../../../../Units/notification";

export default function DoctorWritePrescription({ appointment }) {
  // ---------------------------------------------------
  // Safe fallback appointment
  // ---------------------------------------------------
  const patientName =
    appointment?.patient?.fullName ||
    appointment?.patient?.name ||
    "Patient";

  const doctorName =
    appointment?.doctor?.userId?.fullName ||
    appointment?.doctor?.fullName ||
    appointment?.doctor?.name ||
    "Doctor";

  const appointmentDate = useMemo(() => {
    const raw = appointment?.appointmentDate || appointment?.date;
    if (!raw) return "N/A";
    return new Date(raw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [appointment]);

  // ---------------------------------------------------
  // Medical Record Form State
  // ---------------------------------------------------
  const [medicalRecord, setMedicalRecord] = useState({
    chiefComplaint: "",
    symptoms: "",
    diagnosisText: "",
    notes: "",
    followUpDate: "",
    followUpNote: "",
    vitals: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
      bloodGroup: "",
      spo2: "",
      bloodSugar: "",
    },
    labTests: [{ testName: "", reason: "" }],
  });

  // ---------------------------------------------------
  // Prescription State
  // ---------------------------------------------------
  const [prescription, setPrescription] = useState({
    medicines: [
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ],
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [canCreateNextVisit, setCanCreateNextVisit] = useState(false);
  const [creatingNextVisit, setCreatingNextVisit] = useState(false);

  const [nextVisit, setNextVisit] = useState({
    appointmentDate: "",
    timeSlot: {
      start: "",
      end: "",
    },
    consultationType: "Online",
    amount: "",
  });

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <p className="text-gray-600">Loading appointment...</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // Helpers
  // ---------------------------------------------------
  const updateVitals = (key, value) => {
    setMedicalRecord((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [key]: value },
    }));
  };

  const addLabTest = () => {
    setMedicalRecord((prev) => ({
      ...prev,
      labTests: [...prev.labTests, { testName: "", reason: "" }],
    }));
  };

  const removeLabTest = (index) => {
    setMedicalRecord((prev) => ({
      ...prev,
      labTests: prev.labTests.filter((_, i) => i !== index),
    }));
  };

  const updateLabTest = (index, key, value) => {
    setMedicalRecord((prev) => {
      const copy = [...prev.labTests];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, labTests: copy };
    });
  };

  const addMedicine = () => {
    setPrescription((prev) => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          medicineName: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    }));
  };

  const removeMedicine = (index) => {
    setPrescription((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index),
    }));
  };

  const updateMedicine = (index, key, value) => {
    setPrescription((prev) => {
      const copy = [...prev.medicines];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, medicines: copy };
    });
  };

  // ---------------------------------------------------
  // Submit (Connected to backend)
  // ---------------------------------------------------
  const handleSubmit = async () => {
    try {
      if (!appointment?._id || !appointment?.patient?._id) {
        notify.error("Appointment data missing");
        return;
      }

      setSubmitting(true);

      const diagnosisArray = medicalRecord.diagnosisText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      const recordPayload = {
        appointment: appointment?._id,
        patient: appointment?.patient?._id,
        payment:
          appointment?.payment?._id ||
          appointment?.payment ||
          appointment?.payments?._id ||
          appointment?.payments ||
          null,

        chiefComplaint: medicalRecord.chiefComplaint,
        symptoms: medicalRecord.symptoms,
        diagnosis: diagnosisArray,

        vitals: medicalRecord.vitals,

        labTests: medicalRecord.labTests
          .filter((t) => t.testName.trim())
          .map((t) => ({
            testName: t.testName,
            reason: t.reason,
          })),

        notes: medicalRecord.notes,
        followUpDate: medicalRecord.followUpDate || null,
      };

      const recordRes = await createMedicalRecordApi(recordPayload);
      const createdRecord = recordRes?.data?.record;

      if (!createdRecord?._id) {
        notify.error("Medical record not created");
        return;
      }

      const prescriptionPayload = {
        medicalRecord: createdRecord._id,
        patient: appointment?.patient?._id,

        medicines: prescription.medicines
          .filter((m) => m.medicineName.trim())
          .map((m) => ({
            medicineName: m.medicineName,
            dosage: m.dosage,
            frequency: m.frequency,
            duration: m.duration,
            instructions: m.instructions,
          })),

        notes: prescription.notes,
      };

      await createPrescriptionApi(prescriptionPayload);

      notify.success("Medical record + prescription saved successfully");
      setCanCreateNextVisit(true);
    } catch (err) {
      notify.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateNextVisit = async () => {
    try {
      if (!canCreateNextVisit) {
        notify.error("Save medical record + prescription first");
        return;
      }

      if (!appointment?.patient?._id) {
        notify.error("Patient data missing");
        return;
      }

      if (!nextVisit.appointmentDate) {
        notify.error("Please select appointment date");
        return;
      }

      if (!nextVisit.timeSlot.start || !nextVisit.timeSlot.end) {
        notify.error("Please enter time slot");
        return;
      }

      setCreatingNextVisit(true);

      const payload = {
        patientId: appointment?.patient?._id,
        appointmentDate: nextVisit.appointmentDate,
        timeSlot: {
          start: nextVisit.timeSlot.start,
          end: nextVisit.timeSlot.end,
        },
        consultationType: nextVisit.consultationType,
        amount: nextVisit.amount === "" ? 0 : Number(nextVisit.amount),
      };

      await createNextVisitAppointmentApi(payload);

      notify.success("Next visit appointment created");
      setNextVisit({
        appointmentDate: "",
        timeSlot: { start: "", end: "" },
        consultationType: "Online",
        amount: "",
      });
    } catch (err) {
      notify.error(err?.response?.data?.message || "Failed to create next visit");
    } finally {
      setCreatingNextVisit(false);
    }
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <ClipboardList className="text-blue-600" />
              Write Medical Record & Prescription
            </h1>
            <p className="text-gray-500 mt-1">
              Online consultation record + medicines
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p className="text-sm text-gray-500">Appointment Date</p>
            <p className="font-bold text-gray-900 flex items-center gap-2">
              <CalendarDays className="text-purple-600" size={18} />
              {appointmentDate}
            </p>
          </div>
        </div>

        {/* Patient + Doctor Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Patient" icon={<Stethoscope />} value={patientName} />
          <InfoCard title="Doctor" icon={<Stethoscope />} value={doctorName} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE: Medical Record */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clinical Info */}
            <Card
              title="Clinical Info"
              icon={<Stethoscope className="text-blue-600" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Chief Complaint"
                  placeholder="e.g., Fever, cough"
                  value={medicalRecord.chiefComplaint}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({
                      ...p,
                      chiefComplaint: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Symptoms"
                  placeholder="e.g., Headache, nausea"
                  value={medicalRecord.symptoms}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({
                      ...p,
                      symptoms: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Diagnosis (comma separated)"
                  placeholder="e.g., Viral fever, Migraine"
                  value={medicalRecord.diagnosisText}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({
                      ...p,
                      diagnosisText: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Doctor Notes"
                  placeholder="Write clinical notes..."
                  value={medicalRecord.notes}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({ ...p, notes: e.target.value }))
                  }
                />
              </div>
            </Card>

            {/* Vitals */}
            <Card title="Vitals" icon={<Activity className="text-purple-600" />}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Blood Pressure"
                  placeholder="120/80"
                  value={medicalRecord.vitals.bloodPressure}
                  onChange={(e) =>
                    updateVitals("bloodPressure", e.target.value)
                  }
                />
                <Input
                  label="Heart Rate"
                  placeholder="80 bpm"
                  value={medicalRecord.vitals.heartRate}
                  onChange={(e) => updateVitals("heartRate", e.target.value)}
                />
                <Input
                  label="Temperature"
                  placeholder="98.6°F"
                  value={medicalRecord.vitals.temperature}
                  onChange={(e) => updateVitals("temperature", e.target.value)}
                />
                <Input
                  label="Weight"
                  placeholder="70 kg"
                  value={medicalRecord.vitals.weight}
                  onChange={(e) => updateVitals("weight", e.target.value)}
                />
                <Input
                  label="Height"
                  placeholder="175 cm"
                  value={medicalRecord.vitals.height}
                  onChange={(e) => updateVitals("height", e.target.value)}
                />
                <Select
                  label="Blood Group"
                  value={medicalRecord.vitals.bloodGroup}
                  onChange={(e) => updateVitals("bloodGroup", e.target.value)}
                  options={["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                />
                <Input
                  label="SpO2"
                  placeholder="98%"
                  value={medicalRecord.vitals.spo2}
                  onChange={(e) => updateVitals("spo2", e.target.value)}
                />
                <Input
                  label="Blood Sugar"
                  placeholder="110 mg/dL"
                  value={medicalRecord.vitals.bloodSugar}
                  onChange={(e) => updateVitals("bloodSugar", e.target.value)}
                />
              </div>
            </Card>

            {/* Lab Tests */}
            <Card title="Lab / Tests" icon={<TestTube2 className="text-green-600" />}>
              <div className="space-y-4">
                {medicalRecord.labTests.map((t, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-gray-50 border rounded-xl p-4"
                  >
                    <div className="md:col-span-2">
                      <Input
                        label="Test Name"
                        placeholder="e.g., CBC"
                        value={t.testName}
                        onChange={(e) =>
                          updateLabTest(index, "testName", e.target.value)
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Input
                        label="Reason"
                        placeholder="e.g., Check infection"
                        value={t.reason}
                        onChange={(e) =>
                          updateLabTest(index, "reason", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-end justify-end">
                      {medicalRecord.labTests.length > 1 && (
                        <button
                          onClick={() => removeLabTest(index)}
                          className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={addLabTest}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                >
                  <Plus size={18} />
                  Add Lab Test
                </button>
              </div>
            </Card>

            {/* Follow-up */}
            <Card title="Follow Up" icon={<FileText className="text-orange-600" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Follow Up Date"
                  type="date"
                  value={medicalRecord.followUpDate}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({
                      ...p,
                      followUpDate: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Follow Up Note"
                  placeholder="e.g., Review after 7 days"
                  value={medicalRecord.followUpNote}
                  onChange={(e) =>
                    setMedicalRecord((p) => ({
                      ...p,
                      followUpNote: e.target.value,
                    }))
                  }
                />
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE: Prescription */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2">
                <Pill className="text-purple-600" />
                <h2 className="text-xl font-extrabold text-gray-900">
                  Prescription
                </h2>
              </div>

              <p className="text-gray-500 text-sm mt-1">
                Add medicines for the patient
              </p>

              <div className="mt-6 space-y-4">
                {prescription.medicines.map((m, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-4 bg-gray-50 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-gray-900">
                        Medicine #{index + 1}
                      </p>

                      {prescription.medicines.length > 1 && (
                        <button
                          onClick={() => removeMedicine(index)}
                          className="h-9 w-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <Input
                      label="Medicine Name"
                      placeholder="e.g., Paracetamol"
                      value={m.medicineName}
                      onChange={(e) =>
                        updateMedicine(index, "medicineName", e.target.value)
                      }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="Dosage"
                        placeholder="500mg"
                        value={m.dosage}
                        onChange={(e) =>
                          updateMedicine(index, "dosage", e.target.value)
                        }
                      />
                      <Input
                        label="Frequency"
                        placeholder="2 times a day"
                        value={m.frequency}
                        onChange={(e) =>
                          updateMedicine(index, "frequency", e.target.value)
                        }
                      />
                      <Input
                        label="Duration"
                        placeholder="5 days"
                        value={m.duration}
                        onChange={(e) =>
                          updateMedicine(index, "duration", e.target.value)
                        }
                      />
                      <Input
                        label="Instructions"
                        placeholder="After food"
                        value={m.instructions}
                        onChange={(e) =>
                          updateMedicine(index, "instructions", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addMedicine}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100"
                >
                  <Plus size={18} />
                  Add Medicine
                </button>

                <div className="mt-4">
                  <Textarea
                    label="Prescription Notes"
                    placeholder="Any special advice..."
                    value={prescription.notes}
                    onChange={(e) =>
                      setPrescription((p) => ({ ...p, notes: e.target.value }))
                    }
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold hover:opacity-95 disabled:opacity-60"
                >
                  {submitting
                    ? "Saving..."
                    : "Submit Medical Record + Prescription"}
                </button>

                <p className="text-xs text-gray-400 mt-2 text-center">
                  This will save record and prescription linked to appointment.
                </p>
              </div>
            </div>

            {/* Next Visit Appointment */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-blue-600" />
                <h2 className="text-xl font-extrabold text-gray-900">
                  Next Visit Appointment
                </h2>
              </div>

              <p className="text-gray-500 text-sm mt-1">
                Schedule a follow-up visit for this patient
              </p>

              <div className="mt-5 space-y-4">
                <Input
                  label="Appointment Date"
                  type="date"
                  value={nextVisit.appointmentDate}
                  onChange={(e) =>
                    setNextVisit((p) => ({
                      ...p,
                      appointmentDate: e.target.value,
                    }))
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Time Slot Start"
                    placeholder="e.g., 10:00 AM"
                    value={nextVisit.timeSlot.start}
                    onChange={(e) =>
                      setNextVisit((p) => ({
                        ...p,
                        timeSlot: { ...p.timeSlot, start: e.target.value },
                      }))
                    }
                  />
                  <Input
                    label="Time Slot End"
                    placeholder="e.g., 10:30 AM"
                    value={nextVisit.timeSlot.end}
                    onChange={(e) =>
                      setNextVisit((p) => ({
                        ...p,
                        timeSlot: { ...p.timeSlot, end: e.target.value },
                      }))
                    }
                  />
                </div>

                <Select
                  label="Consultation Type"
                  value={nextVisit.consultationType}
                  onChange={(e) =>
                    setNextVisit((p) => ({
                      ...p,
                      consultationType: e.target.value,
                    }))
                  }
                  options={["Online", "Offline"]}
                />

                <Input
                  label="Amount"
                  type="number"
                  placeholder="e.g., 500"
                  value={nextVisit.amount}
                  onChange={(e) =>
                    setNextVisit((p) => ({ ...p, amount: e.target.value }))
                  }
                />

                <button
                  onClick={handleCreateNextVisit}
                  disabled={creatingNextVisit || !canCreateNextVisit}
                  className={`w-full mt-2 px-4 py-3 rounded-xl font-extrabold text-white ${
                    creatingNextVisit || !canCreateNextVisit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {creatingNextVisit
                    ? "Creating..."
                    : "Create Next Visit Appointment"}
                </button>

                {!canCreateNextVisit && (
                  <p className="text-xs text-gray-400 text-center">
                    Save medical record + prescription to enable next visit.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   UI Components
========================================================= */

function Card({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoCard({ title, icon, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center gap-4">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt || "Select"}
          </option>
        ))}
      </select>
    </div>
  );
}
