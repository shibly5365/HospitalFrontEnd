import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="mt-10 bg-[#06231d] px-4 py-14 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-2xl font-bold">MediCare Pro</h3>
          <p className="text-sm text-slate-300">
            One platform for appointments, consultations, and patient follow-up.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Services</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Online Consultation</li>
            <li>Health Reports</li>
            <li>Appointment Scheduling</li>
            <li>Medication Tracking</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Company</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>About</li>
            <li>Careers</li>
            <li>Partnerships</li>
            <li>Press</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>support@medicarepro.com</li>
            <li>+1 (555) 010-2026</li>
            <li>Mon-Fri, 8:00 AM - 8:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-6 text-sm text-slate-400">
        <p>Copyright {new Date().getFullYear()} MediCare Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
