import React, { useState } from "react";
import axios from "axios";
import { Home, User, Mail, Lock, Phone, Cake, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateReceptionistForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    age: "",
    gender: "",
    employeeId: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Valid email is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.contact.match(/^\d{10}$/)) newErrors.contact = "Contact must be 10 digits";
    if (!formData.age || formData.age < 18) newErrors.age = "Age must be 18 or above";
    if (!formData.gender) newErrors.gender = "Please select gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Generate employee ID
      const generatedEmployeeId = `REC${Date.now().toString().slice(-6)}`;

      const payload = {
        ...formData,
        employeeId: generatedEmployeeId,
        age: Number(formData.age)
      };

      delete payload.confirmPassword; // Remove from payload

      await axios.post(
        "http://localhost:4002/api/admin/create-Receptionist",
        payload,
        { withCredentials: true }
      );

      toast.success(`Receptionist created successfully!\nID: ${generatedEmployeeId}`, {
        position: "top-right",
        duration: 5000,
        className: "bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 border-emerald-600"
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        age: "",
        gender: "",
        employeeId: ""
      });
      
      // Navigate back after 2 seconds
      setTimeout(() => navigate("/admin/receptionists"), 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right",
        duration: 5000,
        className: "bg-rose-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 border-rose-600"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl shadow-xl mb-6">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 bg-clip-text text-transparent mb-4">
            Add Receptionist
          </h1>
          <p className="text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
            Create a new reception staff member with secure credentials
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50 rounded-4xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Back Button */}
            <div className="flex">
              <button
                type="button"
                onClick={() => navigate("/admin/receptionists")}
                className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-semibold transition-all group"
              >
                <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Receptionists
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.fullName ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Employee ID (Auto-generated preview) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Employee ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={`REC${Date.now().toString().slice(-6)}`}
                    readOnly
                    className="w-full px-4 py-4 pr-12 rounded-2xl border-2 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 text-slate-700 font-mono tracking-wide text-lg cursor-not-allowed"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 font-semibold text-sm">
                    AUTO
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Automatically generated unique ID</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@hospital.com"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.email ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.contact ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.contact && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.contact}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Cake className="w-5 h-5 text-orange-500" />
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="18"
                  max="65"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.age ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-pink-500" />
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.gender ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-500" />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.password ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-500" />
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50 backdrop-blur-sm ${
                    errors.confirmPassword ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-rose-600 flex items-center gap-1">
                    <span className="w-5 h-5">!</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Receptionist...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6" />
                  Create Receptionist
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl text-center">
          <p className="text-sm text-slate-700">
            🔒 Passwords are securely hashed and never stored in plain text. 
            Each receptionist gets a unique employee ID automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateReceptionistForm;