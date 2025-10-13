import React from "react";

function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20"
      style={{ backgroundColor: "#2CC98B05" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get the Tools You Need to Thrive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced healthcare technology designed to make your wellness
            journey simple and effective
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Online Consultation */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
                alt="Video consultation"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-blue-500 opacity-20"></div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 text-white">
                  {/* Video Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                  <span className="text-sm">Live consultation</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Online Consultation
              </h3>
              <p className="text-gray-600 text-sm">
                Connect with healthcare professionals through secure video calls
                from anywhere
              </p>
            </div>
          </div>

          {/* AI Wellness Track */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-purple-600 p-6 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">Health Dashboard</h4>
                  {/* Brain Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-green-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="h-2 bg-blue-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-1/2"></div>
                  </div>
                  <div className="h-2 bg-orange-200 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                AI Wellness Track & Reports
              </h3>
              <p className="text-gray-600 text-sm">
                Intelligent health monitoring with personalized insights and
                recommendations
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-600 p-6 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">Schedule</h4>
                  {/* Calendar Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M4 21h16a1 1 0 001-1V7H3v13a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 21 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded flex items-center justify-center text-xs ${
                        i === 10 ? "bg-green-500 text-white" : "bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Schedule Made Completely Simple
              </h3>
              <p className="text-gray-600 text-sm">
                Easy appointment booking with smart scheduling and automated
                reminders
              </p>
            </div>
          </div>

          {/* Medications */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48 bg-gradient-to-br from-orange-500 to-red-500 p-6 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">Medications</h4>
                  {/* Pill Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-8.486 8.486a4 4 0 105.656 5.656l8.486-8.486a4 4 0 00-5.656-5.656z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs">Morning dose</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Evening dose</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Smart Medication Management
              </h3>
              <p className="text-gray-600 text-sm">
                Never miss a dose with intelligent reminders and medication
                tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
