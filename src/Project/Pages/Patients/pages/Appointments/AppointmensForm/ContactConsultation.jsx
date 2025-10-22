import React from "react";

const ContactConsultation = ({ formData, setFormData }) => {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-1">Contact Number *</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter Contact Number"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold mb-1">Health Problem / Reason</label>
        <textarea
          name="problems"
          value={formData.problems}
          onChange={handleChange}
          placeholder="Describe the health issue..."
          rows="4"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
    </>
  );
};

export default ContactConsultation;
