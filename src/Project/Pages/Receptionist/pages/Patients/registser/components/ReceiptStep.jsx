import React from "react";
import { Receipt, CheckCircle } from "lucide-react";

const ReceiptStep = ({
  selectedPatient,
  selectedDoctor,
  doctors,
  selectedDepartment,
  departments,
  selectedDate,
  selectedSlot,
  paymentMethod,
  amount,
  paymentData
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Receipt</h2>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4 print:border-none">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">Appointment Confirmed</h3>
          <p className="text-gray-600">Receipt #{paymentData?._id?.slice(-8) || "N/A"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Patient Name</p>
            <p className="font-semibold">{selectedPatient?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Patient ID</p>
            <p className="font-semibold">{selectedPatient?.patientId || selectedPatient?._id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Doctor</p>
            <p className="font-semibold">
              Dr. {doctors.find((d) => d._id === selectedDoctor)?.userId?.fullName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-semibold">
              {departments.find((d) => d._id === selectedDepartment)?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Appointment Date</p>
            <p className="font-semibold">
              {new Date(selectedDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Slot</p>
            <p className="font-semibold">
              {selectedSlot?.start} - {selectedSlot?.end}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Method</p>
            <p className="font-semibold">{paymentMethod}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Amount Paid</p>
            <p className="font-semibold text-green-600">₹{amount}</p>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-green-600">₹{amount}</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle size={20} />
            <span className="font-semibold">Payment Status: {paymentData?.status || "Paid"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptStep;