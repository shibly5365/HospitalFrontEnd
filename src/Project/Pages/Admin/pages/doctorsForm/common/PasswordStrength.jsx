import React from "react";

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const strength = getStrength();
  const strengthText = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return password ? (
    <div className="mt-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index < strength ? strengthColors[strength - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-1">
        Password Strength: {strengthText[strength - 1] || "Very Weak"}
      </p>
    </div>
  ) : null;
};

export default PasswordStrength;