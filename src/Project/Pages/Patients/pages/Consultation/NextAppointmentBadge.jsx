import { Calendar } from "lucide-react";

export default function NextAppointmentBadge({
  nextAppointment,
}) {
  // ================= EMPTY STATE =================

  if (!nextAppointment) {
    return (
      <div
        className="
          absolute
          -bottom-10
          left-6
          right-6
        "
      >
        <div
          className="
            theme-card
            rounded-2xl
            shadow-xl
            p-4
            border
            theme-border
          "
        >
          <div className="flex items-center gap-2">
            {/* Icon */}
            <div
              className="
                w-10
                h-10
                bg-gradient-to-br
                from-gray-400
                to-gray-500
                rounded-xl
                flex
                items-center
                justify-center
              "
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>

            {/* Text */}
            <div>
              <p
                className="
                  text-xs
                  theme-text-muted
                  font-medium
                "
              >
                Next Appointment
              </p>

              <p
                className="
                  text-sm
                  font-bold
                  theme-text
                "
              >
                No upcoming appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= HAS APPOINTMENT =================

  return (
    <div
      className="
        absolute
        -bottom-10
        left-6
        right-6
      "
    >
      <div
        className="
          theme-card
          rounded-2xl
          shadow-xl
          p-4
          border
          theme-border
        "
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className="
              w-10
              h-10
              bg-gradient-to-br
              from-blue-500
              to-purple-500
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <Calendar className="w-5 h-5 text-white" />
          </div>

          {/* Text */}
          <div>
            <p
              className="
                text-xs
                theme-text-muted
                font-medium
              "
            >
              Next Appointment
            </p>

            <p
              className="
                text-sm
                font-bold
                theme-text
              "
            >
              {nextAppointment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}