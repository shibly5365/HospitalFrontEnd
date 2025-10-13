import React from "react";

const Statistics = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Appointments */}
          <div className="text-center border-0 shadow-lg rounded-3xl bg-white">
            <div className="p-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#2CC98B20" }}
              >
                {/* Calendar Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2CC98B"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M4 21h16a1 1 0 001-1V7H3v13a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10k+</div>
              <h3 className="font-semibold text-lg mb-2">Appointments</h3>
              <p className="text-gray-600">
                Successful consultations completed
              </p>
            </div>
          </div>

          {/* Happy Patients */}
          <div className="text-center border-0 shadow-lg rounded-3xl bg-white">
            <div className="p-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#2CC98B20" }}
              >
                {/* Users Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2CC98B"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m8 0H9"
                  />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">12k+</div>
              <h3 className="font-semibold text-lg mb-2">Happy Patients</h3>
              <p className="text-gray-600">
                Satisfied with our healthcare services
              </p>
            </div>
          </div>

          {/* Years Experience */}
          <div className="text-center border-0 shadow-lg rounded-3xl bg-white">
            <div className="p-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#2CC98B20" }}
              >
                {/* Award Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2CC98B"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8a4 4 0 100-8 4 4 0 000 8zm0 4c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <h3 className="font-semibold text-lg mb-2">Years Experience</h3>
              <p className="text-gray-600">Proven track record in healthcare</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
