import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  User,
  Camera,
  Mail,
  Phone,
  Calendar,
  Globe,
  Download,
} from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function ProfileSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/auth/me", {
          withCredentials: true,
        });
        console.log(res.data);
        
        const user = res.data.user;

        setForm({
          fullName: user.fullName || "",
          email: user.email || "",
          contact: user.contact || "",
          gender: user.gender || "",
          address: user.address || "",
        });

        setProfileImage(user.profileImage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Image upload
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // ✅ Save profile (API)
 const handleSave = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("contact", form.contact);
    formData.append("dateOfBirth", form.dateOfBirth);
    formData.append("gender", form.gender);
    formData.append("address", form.address);

    if (file) {
      formData.append("profileImage", file);
    }

    const res = await apiClient.put(
      "/auth/update-profile",
      formData,
      { withCredentials: true }
    );

    // ✅ SUCCESS TOAST
    notify.success(res.data.message || "Profile updated successfully!");

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

  } catch (error) {
    console.error(error);

    // ❌ ERROR TOAST
    notify.error(error.response?.data?.message || "Update failed");
  } finally {
    setLoading(false);
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

      {/* Profile Image */}
      <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-indigo-200 flex items-center justify-center text-3xl font-bold text-white">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              form.fullName?.[0]
            )}
          </div>

          <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
            <Camera className="text-white w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-xl font-semibold">{form.fullName}</p>
          <p className="text-gray-500">{form.email}</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", icon: User, name: "fullName" },
          { label: "Email", icon: Mail, name: "email" },
          { label: "Phone", icon: Phone, name: "contact" },
          {
            label: "Date of Birth",
            icon: Calendar,
            name: "dateOfBirth",
            type: "date",
          },
          { label: "Gender", icon: User, name: "gender" },
          { label: "Address", icon: Globe, name: "address" },
        ].map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.name}>
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

      {/* Buttons */}
      <div className="flex justify-end mt-8 gap-3">
        <button className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200">
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center gap-2"
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Download className="w-5 h-5" /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
