import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Label, Input } from "@/components/ui"; // adjust import paths

export default function SignupForm({ formData, formErrors, handleInputChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fields = [
    { id: "fullName", label: "Full Name", icon: User, type: "text", span: 2, placeholder: "Enter your full name" },
    { id: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "your@email.com" },
    { id: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "(555) 123-4567" },
    { id: "password", label: "Password", icon: Lock, type: showPassword ? "text" : "password", placeholder: "Create a strong password", toggle: () => setShowPassword(!showPassword), toggleIcon: showPassword ? EyeOff : Eye },
    { id: "confirmPassword", label: "Confirm Password", icon: Lock, type: showConfirm ? "text" : "password", placeholder: "Confirm your password", toggle: () => setShowConfirm(!showConfirm), toggleIcon: showConfirm ? EyeOff : Eye }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ id, label, icon: Icon, type, placeholder, span, toggle, toggleIcon: ToggleIcon }) => (
          <div key={id} className={span ? `md:col-span-${span}` : ""}>
            <Label htmlFor={id} className="text-gray-700 mb-2 flex items-center gap-2">
              <Icon className="w-4 h-4 text-teal-600" /> {label} *
            </Label>
            <div className="relative">
              <Input
                id={id}
                type={type}
                value={formData[id]}
                onChange={(e) => handleInputChange(id, e.target.value)}
                placeholder={placeholder}
                className={`rounded-xl border-2 pr-${toggle ? "12" : "4"} transition-colors ${
                  formErrors[id] ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-teal-500"
                }`}
              />
              {toggle && (
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <ToggleIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Password match check */}
            {id === "confirmPassword" && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Passwords match
              </p>
            )}

            {/* Error */}
            {formErrors[id] && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {formErrors[id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
