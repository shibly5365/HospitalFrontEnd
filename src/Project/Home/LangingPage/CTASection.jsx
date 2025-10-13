import React from "react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          Start taking care of your health now
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join thousands of patients who trust WellNest for their healthcare
          journey
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="px-8 py-6 text-lg bg-white text-green-600 hover:bg-gray-100 rounded-lg font-medium">
            Join Our Community
          </button>
        </div>

        <div className="flex justify-center items-center gap-6">
          {/* App Store */}
          <div className="flex items-center gap-2">
            <div className="bg-black rounded-lg p-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v16h16V4H4z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Download on the</p>
              <p className="text-white font-semibold">App Store</p>
            </div>
          </div>

          {/* Google Play */}
          <div className="flex items-center gap-2">
            <div className="bg-black rounded-lg p-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v16h16V4H4z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Get it on</p>
              <p className="text-white font-semibold">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
