import { FileText, Clock, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

export default function MedicalHistoryCard({ doctor, historyIndex, nextHistory, prevHistory }) {
  const record = doctor.medicalHistory[historyIndex];

  return (
    <div className="px-6 pb-6 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Medical Records
        </h3>
        <span className="text-xs text-gray-500 font-medium">
          {historyIndex + 1} of {doctor.medicalHistory.length}
        </span>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">{record.date}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <CreditCard className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-green-600">
              {record.payment.status} • {record.payment.amount}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 mb-3">
          <p className="text-xs text-blue-600 font-semibold mb-1">DIAGNOSIS</p>
          <p className="text-sm font-bold text-blue-900">{record.diagnosis}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-500 font-semibold mb-1">PRESCRIPTION</p>
          <p className="text-sm text-gray-800 font-medium flex items-start gap-2">
            <span className="text-lg">💊</span>
            {record.prescription}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1">DOCTOR'S NOTES</p>
          <p className="text-sm text-gray-600">{record.notes}</p>
        </div>
      </div>

      {doctor.medicalHistory.length > 1 && (
        <div className="flex gap-3">
          <button
            onClick={prevHistory}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={nextHistory}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
