import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4002/api/patient/verify-otp",
        { email, otp },
      );

      if (res.data.success) {
        alert("Verified 🎉");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2>Enter OTP</h2>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 mt-3"
        />

        <button onClick={handleVerify} className="btn mt-3">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
