import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileCard({ isVisible }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/patient/dashboard-summary",
          { withCredentials: true }
        );

        const data = res.data;
        // console.log(data);
        
        // Adjust this depending on your actual backend response
        const user = data.patientInfo ?? data.user ?? data.profile ?? null;
        setProfile(user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg text-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg text-center">
        No profile data found.
      </div>
    );
  }
// console.log(profile);

  // 🧠 Format name: capitalize first letter
  const formattedName =
    profile.fullName?.charAt(0).toUpperCase() + profile.fullName?.slice(1) ||
    "Unknown";

  // 🧩 Use Cloudinary URL if available, else fallback image
  const profileImageURL =
    profile.profileImage ||
    "https://randomuser.me/api/portraits/men/32.jpg";

  return (
    <div
      className={`bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg transform transition-all duration-700 delay-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={profileImageURL}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3 object-cover"
        />
        <h3 className="text-xl font-bold">{formattedName}</h3>
        <p className="text-blue-100 text-sm">
          Email: #{profile.email ?? "N/A"}
        </p>
        <p className="text-sm text-blue-100 mt-1">
          Age: {profile.age ?? "N/A"} • Blood Type: {profile.bloodGroup ?? "N/A"}
        </p>
        <button className="mt-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-blue-50 transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
