import { apiClient } from "../../../services/queryClient";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { notify } from "../../../UnitsTemp/notification";
import { MdLocalHospital } from "react-icons/md";

import { signupSchema } from "./validations/signupSchema";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { ProfileUpload } from "./ProfileUpload";
import { LeftSection } from "./LeftSection";

const SignupPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("contact", data.contact);
      formData.append("age", data.age);
      formData.append("gender", data.gender);

      // 🔥 FIX THIS (MAIN FIX)
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await apiClient.post("/patient/signup", formData, {
        withCredentials: true,
      });

      setMessage(res.data.message);

      if (res.data.success) {
        notify.success(res.data.message || "Signup successful 🎉");
        setTimeout(() => {
          navigate("/verify-otp", {
            state: { email: data.email },
          });
        }, 1000);
      } else {
        notify.error(res.data.message || "Signup failed ❌");
      }
    } catch (error) {
      notify.error(error.response?.data?.message || "Signup failed ❌");
    }
  };

  const formFields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "John Doe",
      label: "Full Name",
      icon: "user",
    },
    {
      name: "email",
      type: "email",
      placeholder: "john@example.com",
      label: "Email Address",
      icon: "email",
    },
    {
      name: "contact",
      type: "tel",
      placeholder: "1234567890",
      label: "Phone Number",
      icon: "phone",
    },
    {
      name: "age",
      type: "number",
      placeholder: "25",
      label: "Age",
      icon: "birthday",
    },

    // ✅ ADD THIS (important for your backend)
    {
      name: "gender",
      type: "text",
      placeholder: "Male / Female / Other",
      label: "Gender",
      icon: "user",
    },

    {
      name: "password",
      type: "password",
      placeholder: "••••••••",
      label: "Password",
      icon: "lock",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm"
      >
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 shadow-md">
              <MdLocalHospital className="text-white" size={24} />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                MediCare Pro
              </h1>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Healthcare Management System
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Already have an account?{" "}
            <span className="font-semibold">Sign In</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Animated */}
          <LeftSection />

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-lg border border-white/20 p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="inline-block p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white mb-4"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Create Account
                </h2>
                <p className="text-gray-500">
                  Join our healthcare community today
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Profile Upload */}
                <ProfileUpload
                  preview={preview}
                  setPreview={setPreview}
                  register={register}
                />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map((field, index) => (
                    <div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={
                        field.name === "password" ? "md:col-span-2" : ""
                      }
                    >
                      <InputField
                        {...field}
                        register={register}
                        error={errors[field.name]}
                      />
                    </div>
                  ))}

                  {/* Gender Select */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                  >
                    <SelectField
                      name="gender"
                      label="Gender"
                      register={register}
                      error={errors.gender}
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full relative overflow-hidden group bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                    !isValid || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </motion.button>

                <AnimatePresence>
                  {message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-sm text-red-500"
                    >
                      {message}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Terms */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
