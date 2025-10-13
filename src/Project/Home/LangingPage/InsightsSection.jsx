import React from "react";

const InsightsSection = () => {
  return (
    <section
      id="insights"
      className="py-20"
      style={{ backgroundColor: "#2CC98B05" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Insight for Healthy Journey
          </h2>
          <p className="text-xl text-gray-600">
            Discover how WellNest transforms healthcare through innovation and
            expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
                alt="Advanced Telemedicine"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                  Advanced Tech
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Advanced Telemedicine Services
              </h3>
              <p className="text-gray-600 text-sm">
                Cutting-edge medical technology bringing expert care directly to
                your home
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop"
                alt="Medical Experts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                  24/7 Access
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Trusted Medical Experts, Anytime, Anywhere
              </h3>
              <p className="text-gray-600 text-sm">
                Board-certified doctors available around the clock for your
                healthcare needs
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl overflow-hidden bg-white">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
                alt="Health Monitoring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                  Smart Monitoring
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Smart Health Monitoring for Better Wellness
              </h3>
              <p className="text-gray-600 text-sm">
                Wearable integration and AI analytics for comprehensive health
                tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
