import React from "react";
import { FaGlobe, FaAward } from "react-icons/fa";
import MultiSelectChips from "./common/MultiSelectChips";
import InputField from "./common/InputField";

const AdditionalInfo = ({
  formData,
  handleChange,
  handleLanguageToggle,
  handleTagToggle,
  languagesList,
  tagsList,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaGlobe className="text-blue-500" /> Additional Information
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows="4"
          placeholder="Enter doctor's professional background, achievements, and expertise..."
        />
      </div>

      <MultiSelectChips
        label="Languages Known"
        options={languagesList}
        selected={formData.languages}
        onChange={handleLanguageToggle}
      />

      <InputField
        icon={FaAward}
        label="Certifications & Awards"
        name="certifications"
        value={formData.certifications}
        onChange={handleChange}
        placeholder="Separate multiple entries with commas"
      />

      <MultiSelectChips
        label="Profile Tags"
        options={tagsList}
        selected={formData.tags}
        onChange={handleTagToggle}
      />
    </div>
  );
};

export default AdditionalInfo;
