import { apiClient } from "../../../services/queryClient";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLocalHospital } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { notify } from "../../../Units/notification";
import { useAuth } from "../../Components/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { notify } from "../../../UnitsTemp/notification";

// ✅ Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  window.console.log("GOOGLE ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

  // ✅ react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true); // optional: show loading
    try {
      const res = await apiClient.post(
        "/auth/login",
        data,
        { withCredentials: true },
      );

      if (res.data.success) {
        const { user, jwtToken } = res.data;

        login(user, jwtToken); // ✅ fixed
        console.log("LOGIN USER", user);
        console.log("LOGIN TOKEN", jwtToken);

        // Redirect to dashboard based on role
        switch (user.role) {
          case "superadmin":
            navigate("/super-admin/super-admin-dashboard", { replace: true });
            break;
          case "admin":
            navigate("/admin/admin-dashboard", { replace: true });
            break;
          case "doctor":
            navigate("/doctors/doctors-dashboard", { replace: true });
            break;
          case "receptionist":
            navigate("/receptionist/receptionist-appointments", {
              replace: true,
            });
            break;
          case "patient":
            navigate("/patient/patient-dashboard", { replace: true });
            break;
          default:
            navigate("/", { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white flex-col justify-center items-center px-12">
        <MdLocalHospital size={60} className="mb-6" />

        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to MediCare Pro
        </h1>

        <p className="text-center text-lg max-w-md opacity-90 leading-relaxed">
          Streamline your hospital operations with our comprehensive
          healthcare management system.
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-10 relative">
        <div className="absolute top-6 left-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back to Home
          </a>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome back 👋</h1>
            <p className="text-gray-500 text-sm">Login to your account</p>
          </div>

          {/* show server error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`mt-1 w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className={`mt-1 w-full rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Or continue with
          </p>

          <div
            onClick={() => notify.info("Google login is working...")}
          >
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await apiClient.post("/auth/google-login", {
                    credential: credentialResponse.credential,
                  });

                  if (res.data.success) {
                    const { user, jwtToken } = res.data;

                    notify.success("Login successful!");

                    login(user, jwtToken);

                    navigate("/patient/patient-dashboard", {
                      replace: true,
                    });
                  }
                } catch (error) {
                  notify.error("Google login failed");
                  console.error(error);
                }
              }}
              onError={() => {
                notify.error("Login Failed");
              }}
            />
          </div>

          <p className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signUp"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => {
                import("./SignupPage"); // adjust path
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
