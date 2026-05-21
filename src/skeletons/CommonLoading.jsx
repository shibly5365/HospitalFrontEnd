// CommonLoading.jsx
import React from "react";

const CommonLoading = ({
  className = "",
  rounded = "rounded-2xl",
}) => {
  return (
    <div
      className={`
        animate-pulse
        bg-gray-200 dark:bg-gray-800
        ${rounded}
        ${className}
      `}
    />
  );
};

export default CommonLoading;