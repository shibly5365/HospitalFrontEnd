import React from "react";

const HeroSection = () => {
  return (
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50"></div>
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
    style={{
      backgroundImage:
        'url("https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1920&h=1080&fit=crop&crop=faces")',
    }}
  ></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Your Wellness, <span style={{ color: '#2CC98B' }}>One Tap Away</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Transforming Healthcare With Innovative Telemedicine, Connecting You
          To Trusted Doctors For Personalized Virtual Care And Wellness.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className="px-8 py-6 text-lg border border-gray-300 rounded-lg">
            Learn More
          </button>
          <button
            className="px-8 py-6 text-lg text-white rounded-lg"
            style={{ backgroundColor: '#2CC98B' }}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Main doctor image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&crop=faces"
            alt="Smiling doctor with tablet"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        {/* Floating video call preview */}
        <div className="absolute -top-6 -left-6 w-64 shadow-xl bg-white rounded-lg">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1594824286073-d773b52ee5d5?w=60&h=60&fit=crop&crop=face"
                alt="Dr. Sarah"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-medium">Dr. Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
              <div className="ml-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📹</span>
              <span>Video consultation active</span>
            </div>
          </div>
        </div>

        {/* Floating statistics widget */}
        <div className="absolute -bottom-6 -right-6 w-48 shadow-xl bg-white rounded-lg">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Patients</span>
              <span className="font-bold text-green-600">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Consultations</span>
              <span className="font-bold text-blue-600">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Satisfaction</span>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-bold">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
