import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Welcome Admin</h1>
      <p className="text-gray-600 font-medium">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default Header;