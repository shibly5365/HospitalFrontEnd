import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { notify } from "../../../Units/notification";

// ✅ Yup validation schema
const signupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
    .required("Contact is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .max(120, "Please enter a valid age")
    .required("Age is required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"], "Select a valid gender").required("Gender is required"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange", // ✅ live validation
  });

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await axios.post("http://localhost:4002/api/patient/signup", data);
      setMessage(res.data.message);
      if (res.data.success) {
        notify.success(res.data.message || "Signup successful 🎉");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        notify.error(res.data.message || "Signup failed ❌");
      }
    } catch (error) {
      notify.error(error.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold">♥</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-700">MediCare Pro</h1>
            <p className="text-xs text-gray-500">Patient Registration</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center px-6 lg:px-20">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0">
          {/* Left Section */}
          <div className="flex flex-col justify-center items-center text-center px-10">
            <img
              src="https://i.pinimg.com/originals/32/7b/c7/327bc78b01717d92cb62c09e2f8fbb7f.jpg"
              alt="Nurse"
              className="rounded-xl shadow-md mb-6 w-80"
            />
            <h2 className="text-xl font-bold text-green-700">
              Join Our Healthcare Community
            </h2>
            <p className="text-gray-600 mt-2">
              Get access to personalized healthcare services, book appointments
              with top doctors, and manage your health journey all in one place.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center px-8">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6">
              <h2 className="font-semibold">Create Your Account</h2>
              <p className="text-sm">Start your healthcare journey with us</p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 bg-white p-6 rounded-xl shadow-md"
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    className="w-full outline-none"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="w-full outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaPhone className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("contact")}
                    className="w-full outline-none"
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                )}
              </div>

              {/* Age */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaBirthdayCake className="text-gray-400 mr-2" />
                  <input
                    type="number"
                    placeholder="Enter your age"
                    {...register("age")}
                    className="w-full outline-none"
                  />
                </div>
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaVenusMars className="text-gray-400 mr-2" />
                  <select
                    {...register("gender")}
                    className="w-full outline-none bg-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    {...register("password")}
                    className="w-full outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md ${
                  !isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              {message && (
                <p className="text-center mt-2 text-sm text-red-500">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
