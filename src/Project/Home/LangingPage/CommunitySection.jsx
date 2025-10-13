import React from "react";

const CommunitySection = () => {
  return (
    <section  id="community" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Community Healthy People
          </h2>
          <p className="text-xl text-gray-600">
            Hear from patients who trust WellNest for their healthcare needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Testimonial Card */}
          <div className="lg:col-span-2">
            <div className="border-0 shadow-lg rounded-3xl p-8 bg-white">
              <div className="flex items-center gap-1 mb-4">
                <span className="w-5 h-5 bg-yellow-400 rounded"></span>
                <span className="w-5 h-5 bg-yellow-400 rounded"></span>
                <span className="w-5 h-5 bg-yellow-400 rounded"></span>
                <span className="w-5 h-5 bg-yellow-400 rounded"></span>
                <span className="w-5 h-5 bg-yellow-400 rounded"></span>
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">
                "WellNest has completely transformed the way I approach my
                healthcare needs."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Jane Doe"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Jane Doe</h4>
                    <p className="text-gray-500 text-sm">Patient</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border px-3 py-1 rounded">←</button>
                  <button className="border px-3 py-1 rounded">→</button>
                </div>
              </div>
            </div>
          </div>

          {/* Community Highlight */}
          <div
            className="border-0 shadow-lg rounded-3xl p-8 text-center"
            style={{ backgroundColor: "#2CC98B10" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#2CC98B" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              A Movement Now
            </h3>
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: "#2CC98B" }}
            >
              2,300+
            </div>
            <p className="text-gray-700 mb-4">Trusted & Satisfied Patients</p>
            <div className="flex justify-center -space-x-2 mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Patient"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Patient"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/23.jpg"
                alt="Patient"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/72.jpg"
                alt="Patient"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Patient"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <button
              style={{ backgroundColor: "#2CC98B" }}
              className="px-4 py-2 rounded text-white hover:bg-green-600"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
