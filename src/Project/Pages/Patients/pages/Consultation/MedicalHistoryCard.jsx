import {
  FileText,
  Clock,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MedicalHistoryCard({
  doctor,
  historyIndex,
  nextHistory,
  prevHistory,
}) {
  const record = doctor.medicalHistory[historyIndex];

  return (
    <div
      className="
        px-6
        pb-6
        space-y-4
        animate-fadeIn
      "
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">
        <h3
          className="
            text-lg
            font-bold
            theme-text
            flex
            items-center
            gap-2
          "
        >
          <FileText className="w-5 h-5 text-purple-600" />
          Medical Records
        </h3>

        <span
          className="
            text-xs
            theme-text-muted
            font-medium
          "
        >
          {historyIndex + 1} of {doctor.medicalHistory.length}
        </span>
      </div>

      {/* ================= CARD ================= */}

      <div
        className="
          theme-soft
          rounded-2xl
          p-5
          border
          theme-border
          shadow-sm
        "
      >
        {/* Date + Payment */}
        <div className="flex justify-between items-start mb-4">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Clock
              className="
                w-4
                h-4
                theme-text-muted
              "
            />

            <span
              className="
                text-sm
                font-semibold
                theme-text
              "
            >
              {record.date}
            </span>
          </div>

          {/* Payment */}
          <div
            className="
              flex
              items-center
              gap-2
              bg-green-500/10
              px-3
              py-1
              rounded-full
            "
          >
            <CreditCard className="w-4 h-4 text-green-600" />

            <span
              className="
                text-xs
                font-bold
                text-green-600
              "
            >
              {record.payment.status} • {record.payment.amount}
            </span>
          </div>
        </div>

        {/* Diagnosis */}
        <div
          className="
            bg-blue-500/10
            rounded-xl
            p-3
            mb-3
          "
        >
          <p
            className="
              text-xs
              text-blue-600
              font-semibold
              mb-1
            "
          >
            DIAGNOSIS
          </p>

          <p
            className="
              text-sm
              font-bold
              theme-text
            "
          >
            {record.diagnosis}
          </p>
        </div>

        {/* Prescription */}
        <div className="mb-3">
          <p
            className="
              text-xs
              theme-text-muted
              font-semibold
              mb-1
            "
          >
            PRESCRIPTION
          </p>

          <p
            className="
              text-sm
              theme-text
              font-medium
              flex
              items-start
              gap-2
            "
          >
            <span className="text-lg">💊</span>

            {record.prescription}
          </p>
        </div>

        {/* Notes */}
        <div>
          <p
            className="
              text-xs
              theme-text-muted
              font-semibold
              mb-1
            "
          >
            DOCTOR'S NOTES
          </p>

          <p
            className="
              text-sm
              theme-text-muted
            "
          >
            {record.notes}
          </p>
        </div>
      </div>

      {/* ================= BUTTONS ================= */}

      {doctor.medicalHistory.length > 1 && (
        <div className="flex gap-3">
          {/* Previous */}
          <button
            onClick={prevHistory}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              text-white
              rounded-xl
              hover:shadow-lg
              transition-all
              duration-200
              font-semibold
            "
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Next */}
          <button
            onClick={nextHistory}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              text-white
              rounded-xl
              hover:shadow-lg
              transition-all
              duration-200
              font-semibold
            "
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
