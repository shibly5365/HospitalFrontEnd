import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../../../services/queryClient";
import { notify } from "../../../UnitsTemp/notification";
import { FaShieldAlt } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp) {
      return notify.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const res = await apiClient.post("/patient/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        notify.success("Email verified successfully 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      notify.error(
        err?.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-50 via-white to-blue-100">
      
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f"
            alt="Medical"
            className="w-full max-w-md rounded-3xl shadow-2xl"
          />

          <h1 className="text-4xl font-bold text-slate-800 mt-8">
            Medicrea Pro
          </h1>

          <p className="text-slate-600 mt-3 max-w-md">
            Secure healthcare management platform for patients,
            doctors, appointments and medical records.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center px-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white">

          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-cyan-100 flex items-center justify-center">
              <FaShieldAlt className="text-cyan-600 text-3xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-5 text-slate-800">
            Verify OTP
          </h2>

          <p className="text-center text-slate-500 mt-2">
            Enter the verification code sent to
          </p>

          <p className="text-center font-semibold text-cyan-600">
            {email}
          </p>

          <div className="mt-8">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter 6 digit OTP"
              className="w-full h-14 rounded-xl border border-slate-300 px-4 text-center text-xl tracking-[8px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full mt-6 h-14 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold shadow-lg disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MdHealthAndSafety />
              <span>Protected by Medicrea Pro Security</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;