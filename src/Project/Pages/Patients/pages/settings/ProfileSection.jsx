import React, { useState } from "react";
import { User, Camera, Mail, Phone, Calendar, Globe, Download } from "lucide-react";

export default function ProfileSection() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    dob: "1995-08-15",
    gender: "Male",
    address: "123 Health Street, Bangalore",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60">
      {saved && (
        <div className="mb-6 text-green-700 bg-green-100 p-3 rounded-xl font-semibold text-center">
          ✅ Profile updated successfully!
        </div>
      )}
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-8">
        <User className="text-indigo-600" /> Personal Information
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-indigo-200 flex items-center justify-center text-3xl font-bold text-white">
            {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : form.name[0]}
          </div>
          <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
            <Camera className="text-white w-5 h-5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xl font-semibold">{form.name}</p>
          <p className="text-gray-500">{form.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", icon: User, name: "name" },
          { label: "Email", icon: Mail, name: "email" },
          { label: "Phone", icon: Phone, name: "phone" },
          { label: "Date of Birth", icon: Calendar, name: "dob", type: "date" },
          { label: "Gender", icon: User, name: "gender" },
          { label: "Address", icon: Globe, name: "address" },
        ].map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.name} className="space-y-1">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Icon className="w-4 h-4" /> {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 outline-none"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 gap-3">
        <button className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200">Cancel</button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center gap-2"
        >
          <Download className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
}
