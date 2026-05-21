import { TrendingUp, FileText, Calendar } from "lucide-react";

export default function SummaryStats({ doctors }) {
  return (
    <div
      className="
        mt-8
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-4
      "
    >
      {/* ================= TOTAL DOCTORS ================= */}

      <div
        className="
          theme-card
          rounded-2xl
          p-6
          shadow-lg
          border
          theme-border
        "
      >
        <div className="flex items-center justify-between">
          {/* Text */}
          <div>
            <p
              className="
                text-sm
                theme-text-muted
                font-medium
              "
            >
              Total Doctors
            </p>

            <p
              className="
                text-3xl
                font-bold
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              {doctors.length}
            </p>
          </div>

          {/* Icon */}
          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-blue-500
              to-purple-500
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* ================= TOTAL VISITS ================= */}

      <div
        className="
          theme-card
          rounded-2xl
          p-6
          shadow-lg
          border
          theme-border
        "
      >
        <div className="flex items-center justify-between">
          {/* Text */}
          <div>
            <p
              className="
                text-sm
                theme-text-muted
                font-medium
              "
            >
              Total Visits
            </p>

            <p
              className="
                text-3xl
                font-bold
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                bg-clip-text
                text-transparent
              "
            >
              {doctors.reduce((acc, doc) => acc + doc.medicalHistory.length, 0)}
            </p>
          </div>

          {/* Icon */}
          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-purple-500
              to-pink-500
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* ================= UPCOMING ================= */}

      <div
        className="
          theme-card
          rounded-2xl
          p-6
          shadow-lg
          border
          theme-border
        "
      >
        <div className="flex items-center justify-between">
          {/* Text */}
          <div>
            <p
              className="
                text-sm
                theme-text-muted
                font-medium
              "
            >
              Upcoming
            </p>

            <p
              className="
                text-3xl
                font-bold
                bg-gradient-to-r
                from-pink-600
                to-red-600
                bg-clip-text
                text-transparent
              "
            >
              {doctors.length}
            </p>
          </div>

          {/* Icon */}
          <div
            className="
              w-12
              h-12
              bg-gradient-to-br
              from-pink-500
              to-red-500
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
