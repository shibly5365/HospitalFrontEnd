import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Key,
  Shield,
  Activity,
  Stethoscope,
  Hospital,
  Calendar,
  Clock,
  Save,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  LogOut,
  Camera,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Heart,
  TrendingUp,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  BellOff,
  Globe,
  CreditCard,
  FileText,
  Download,
  Upload,
  Trash2,
  Settings,
  Smartphone,
  MessageCircle,
  Video,
  Users,
  Star,
  ThumbsUp,
  Share2,
  MoreVertical,
} from "lucide-react";

const DoctorProfileSettings = () => {
  // Mock doctor data with enhanced fields
  const [doctor, setDoctor] = useState({
    id: "DOC001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    subSpecializations: [
      "Cardiac Catheterization",
      "Echocardiography",
      "Preventive Cardiology",
    ],
    experience: 12,
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    address: "123 Medical Center Dr, Suite 456, New York, NY 10001",
    bio: "Board-certified cardiologist with over 12 years of experience in interventional cardiology. Committed to providing compassionate, evidence-based care to patients with complex cardiovascular conditions.",
    education: [
      {
        degree: "MD, Cardiology",
        institution: "Harvard Medical School",
        year: "2012",
      },
      {
        degree: "Fellowship in Interventional Cardiology",
        institution: "Johns Hopkins Hospital",
        year: "2015",
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Massachusetts General Hospital",
        year: "2009",
      },
    ],
    certifications: [
      "American Board of Internal Medicine",
      "Board Certified in Cardiovascular Disease",
      "ACLS Certified",
    ],
    languages: ["English", "Spanish", "French"],
    consultationFee: 150,
    rating: 4.8,
    totalPatients: 2847,
    totalReviews: 342,
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM", available: true },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM", available: true },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM", available: true },
      { day: "Thursday", hours: "9:00 AM - 1:00 PM", available: true },
      { day: "Friday", hours: "9:00 AM - 3:00 PM", available: true },
      { day: "Saturday", hours: "Closed", available: false },
      { day: "Sunday", hours: "Closed", available: false },
    ],
    profileImage: null,
    coverImage: null,
    socialLinks: {
      twitter: "https://twitter.com/drsarah",
      linkedin: "https://linkedin.com/in/drsarah",
      researchGate: "https://researchgate.net/drsarah",
    },
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    theme: "light",
    twoFactorEnabled: false,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    mobile: doctor.mobile,
    address: doctor.address,
    bio: doctor.bio,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showScheduleEditor, setShowScheduleEditor] = useState(false);
  const [tempSchedule, setTempSchedule] = useState([...doctor.schedule]);

  // Handle profile update
  const handleProfileUpdate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDoctor((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.mobile,
      address: formData.address,
      bio: formData.bio,
    }));
    setIsEditing(false);
    setIsLoading(false);
    setMessage({ type: "success", text: "Profile updated successfully!" });
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters!",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Password changed successfully!" });
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle forgot password
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setMessage({ type: "error", text: "Please enter your email address!" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setMessage({
      type: "success",
      text: `Password reset link sent to ${resetEmail}`,
    });
    setIsResetModalOpen(false);
    setResetEmail("");
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle two-factor authentication
  const handleTwoFactorSetup = async () => {
    if (!twoFactorCode) {
      setMessage({
        type: "error",
        text: "Please enter the verification code!",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDoctor((prev) => ({ ...prev, twoFactorEnabled: true }));
    setShowTwoFactorModal(false);
    setTwoFactorCode("");
    setIsLoading(false);
    setMessage({ type: "success", text: "Two-factor authentication enabled!" });
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle schedule update
  const handleScheduleUpdate = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDoctor((prev) => ({ ...prev, schedule: tempSchedule }));
    setShowScheduleEditor(false);
    setIsLoading(false);
    setMessage({ type: "success", text: "Schedule updated successfully!" });
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle notification settings
  const toggleNotification = (type) => {
    setDoctor((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
    setMessage({
      type: "success",
      text: `${type.toUpperCase()} notifications ${!doctor.notifications[type] ? "enabled" : "disabled"}`,
    });
    setTimeout(() => setMessage(null), 2000);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = doctor.theme === "light" ? "dark" : "light";
    setDoctor((prev) => ({ ...prev, theme: newTheme }));
    document.documentElement.classList.toggle("dark");
  };

  // Stats cards data
  const stats = [
    {
      label: "Total Patients",
      value: doctor.totalPatients,
      icon: Users,
      color: "blue",
      change: "+12%",
    },
    {
      label: "Rating",
      value: `${doctor.rating} ⭐`,
      icon: Star,
      color: "yellow",
      change: "+0.3",
    },
    {
      label: "Reviews",
      value: doctor.totalReviews,
      icon: ThumbsUp,
      color: "green",
      change: "+28",
    },
    {
      label: "Consults/Month",
      value: "156",
      icon: Video,
      color: "purple",
      change: "+15%",
    },
  ];

  return (
    <div
      className={`min-h-screen ${doctor.theme === "dark" ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Header with gradient animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Doctor Profile Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Manage your professional profile and account settings
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                {doctor.theme === "light" ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-2xl blur-xl transition-all duration-500 ${hoveredCard === idx ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
              ></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl`}
                  >
                    <stat.icon
                      className={`text-${stat.color}-600 dark:text-${stat.color}-400`}
                      size={24}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 px-2 py-1 rounded-full`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Tabs with animation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:shadow-3xl">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap overflow-x-auto">
              {[
                { id: "profile", label: "Profile Information", icon: User },
                { id: "security", label: "Security", icon: Lock },
                {
                  id: "professional",
                  label: "Professional Details",
                  icon: Stethoscope,
                },
                { id: "schedule", label: "Schedule", icon: Clock },
                { id: "notifications", label: "Notifications", icon: Bell },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group px-6 py-4 text-sm md:text-base font-medium transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon
                      size={18}
                      className="transition-transform group-hover:scale-110"
                    />
                    {tab.label}
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-slideIn"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Message Alert with Animation */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-slideDown ${
                  message.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Processing...
                  </p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Cover & Profile Image */}
                <div className="relative mb-12">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl relative overflow-hidden group">
                    {doctor.coverImage ? (
                      <img
                        src={doctor.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></div>
                    )}
                    <button className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Camera size={20} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="absolute -bottom-12 left-8">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                        {doctor.profileImage ? (
                          <img
                            src={doctor.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={48} className="text-white" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Edit2 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            ...formData,
                            name: doctor.name,
                            email: doctor.email,
                            phone: doctor.phone,
                            mobile: doctor.mobile,
                            address: doctor.address,
                            bio: doctor.bio,
                          });
                        }}
                        className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProfileUpdate}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Full Name
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-lg">
                        {doctor.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        Email Address
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {doctor.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        Phone Number
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {doctor.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} />
                        Mobile Number
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {doctor.mobile}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        Address
                      </div>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows="2"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {doctor.address}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Professional Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        rows="4"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {doctor.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Change Password Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Key
                        size={24}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    Change Password
                  </h2>
                  <form onSubmit={handlePasswordChange} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              current: !prev.current,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                          {showPasswords.current ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              new: !prev.new,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                          {showPasswords.new ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTwoFactorModal(true)}
                      disabled={doctor.twoFactorEnabled}
                      className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                        doctor.twoFactorEnabled
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 cursor-default"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105"
                      }`}
                    >
                      {doctor.twoFactorEnabled ? "Enabled ✓" : "Enable 2FA"}
                    </button>
                  </div>
                </div>

                {/* Account Recovery */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <Shield size={24} className="text-yellow-500" />
                    Account Recovery
                  </h3>
                  <button
                    onClick={() => setIsResetModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut size={16} />
                    Forgot Password / Reset Password
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    Click to receive a password reset link via email
                  </p>
                </div>

                {/* Reset Password Modal */}
                {isResetModalOpen && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 transform transition-all">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Reset Password
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Enter your email address and we'll send you a link to
                        reset your password.
                      </p>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl mb-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsResetModalOpen(false)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleResetPassword}
                          disabled={isLoading}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Two-Factor Modal */}
                {showTwoFactorModal && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Enable 2FA
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Enter the verification code from your authenticator app.
                      </p>
                      <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl mb-5 text-center text-2xl tracking-wider focus:ring-2 focus:ring-blue-500"
                        maxLength="6"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowTwoFactorModal(false)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleTwoFactorSetup}
                          disabled={isLoading}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          Verify & Enable
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Professional Details Tab */}
            {activeTab === "professional" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl transform transition-all hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <Hospital
                        className="text-blue-600 dark:text-blue-400"
                        size={28}
                      />
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                        Department
                      </h3>
                    </div>
                    <p className="text-gray-900 dark:text-white text-xl font-bold">
                      {doctor.department}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl transform transition-all hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <Stethoscope
                        className="text-purple-600 dark:text-purple-400"
                        size={28}
                      />
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                        Primary Specialization
                      </h3>
                    </div>
                    <p className="text-gray-900 dark:text-white text-xl font-bold">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl transform transition-all hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <Award
                        className="text-green-600 dark:text-green-400"
                        size={28}
                      />
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                        Experience
                      </h3>
                    </div>
                    <p className="text-gray-900 dark:text-white text-xl font-bold">
                      {doctor.experience} years
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-2xl transform transition-all hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard
                        className="text-orange-600 dark:text-orange-400"
                        size={28}
                      />
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                        Consultation Fee
                      </h3>
                    </div>
                    <p className="text-gray-900 dark:text-white text-xl font-bold">
                      ${doctor.consultationFee}
                    </p>
                  </div>
                </div>

                {/* Sub-Specializations */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3 flex items-center gap-2">
                    <Heart size={20} className="text-red-500" />
                    Sub-Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.subSpecializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-purple-500" />
                    Education & Training
                  </h3>
                  <div className="space-y-4">
                    {doctor.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {edu.degree}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-500 mt-1 md:mt-0">
                          {edu.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3 flex items-center gap-2">
                    <Award size={20} className="text-yellow-500" />
                    Certifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {doctor.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3 flex items-center gap-2">
                    <Globe size={20} className="text-blue-500" />
                    Languages Spoken
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Weekly Schedule
                  </h2>
                  {!showScheduleEditor ? (
                    <button
                      onClick={() => setShowScheduleEditor(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Edit2 size={16} />
                      Edit Schedule
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowScheduleEditor(false);
                          setTempSchedule([...doctor.schedule]);
                        }}
                        className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleScheduleUpdate}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        <Save size={16} />
                        Save Schedule
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {(showScheduleEditor ? tempSchedule : doctor.schedule).map(
                    (slot, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${slot.available ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                          ></div>
                          <span className="font-semibold text-gray-800 dark:text-white text-lg min-w-[100px]">
                            {slot.day}
                          </span>
                        </div>
                        {showScheduleEditor ? (
                          <div className="flex-1 flex items-center gap-3">
                            {slot.available ? (
                              <>
                                <input
                                  type="time"
                                  value={slot.hours.split(" - ")[0]}
                                  onChange={(e) => {
                                    const newHours = `${e.target.value} - ${slot.hours.split(" - ")[1]}`;
                                    const newSchedule = [...tempSchedule];
                                    newSchedule[index].hours = newHours;
                                    setTempSchedule(newSchedule);
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                                />
                                <span>to</span>
                                <input
                                  type="time"
                                  value={slot.hours.split(" - ")[1]}
                                  onChange={(e) => {
                                    const newHours = `${slot.hours.split(" - ")[0]} - ${e.target.value}`;
                                    const newSchedule = [...tempSchedule];
                                    newSchedule[index].hours = newHours;
                                    setTempSchedule(newSchedule);
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                                />
                                <button
                                  onClick={() => {
                                    const newSchedule = [...tempSchedule];
                                    newSchedule[index].available = false;
                                    setTempSchedule(newSchedule);
                                  }}
                                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                  Mark Closed
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  const newSchedule = [...tempSchedule];
                                  newSchedule[index].available = true;
                                  newSchedule[index].hours =
                                    "9:00 AM - 5:00 PM";
                                  setTempSchedule(newSchedule);
                                }}
                                className="px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              >
                                Add Hours
                              </button>
                            )}
                          </div>
                        ) : (
                          <span
                            className={`text-gray-700 dark:text-gray-300 ${!slot.available && "text-gray-400 line-through"}`}
                          >
                            {slot.hours}
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        id: "email",
                        label: "Email Notifications",
                        icon: Mail,
                        description:
                          "Receive updates about appointments and messages via email",
                      },
                      {
                        id: "sms",
                        label: "SMS Notifications",
                        icon: Smartphone,
                        description:
                          "Get text message alerts for urgent matters",
                      },
                      {
                        id: "push",
                        label: "Push Notifications",
                        icon: Bell,
                        description: "Real-time notifications on your device",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                            <setting.icon
                              className="text-blue-600 dark:text-blue-400"
                              size={20}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {setting.label}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleNotification(setting.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                            doctor.notifications[setting.id]
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                              doctor.notifications[setting.id]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Communication Preferences
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Allow patients to send messages
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Receive weekly performance reports
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Marketing and promotional emails
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DoctorProfileSettings;
