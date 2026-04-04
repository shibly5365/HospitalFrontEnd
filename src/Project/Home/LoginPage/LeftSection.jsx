import React from "react";
import  {motion}  from "framer-motion";


export const LeftSection = () => {
  const features = [
    { icon: "🏥", title: "Book Appointments", desc: "Easy scheduling with top doctors" },
    { icon: "📊", title: "Health Records", desc: "Access your medical history anytime" },
    { icon: "💊", title: "Medicine Reminders", desc: "Never miss your medications" },
    { icon: "👨‍⚕️", title: "Expert Consultation", desc: "24/7 access to healthcare" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:block"
    >
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Main content */}
        <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <img
              src="https://i.pinimg.com/originals/32/7b/c7/327bc78b01717d92cb62c09e2f8fbb7f.jpg"
              alt="Healthcare Professional"
              className="rounded-2xl shadow-2xl mx-auto w-64 h-64 object-cover border-4 border-white"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Start Your Health Journey
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Join thousands of patients who trust MediCare Pro for their healthcare needs
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/30"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">50K+</div>
              <div className="text-xs text-gray-500">Active Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">200+</div>
              <div className="text-xs text-gray-500">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">98%</div>
              <div className="text-xs text-gray-500">Satisfaction Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};