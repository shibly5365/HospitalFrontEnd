import React, { useState, useRef } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const ImageUpload = ({ onUpload, preview, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profile Image
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
        } ${error ? "border-red-500" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-32 h-32 rounded-full mx-auto object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUpload(null);
              }}
              className="absolute top-0 right-1/3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <>
            <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </p>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;