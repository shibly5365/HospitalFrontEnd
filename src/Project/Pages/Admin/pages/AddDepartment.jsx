import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headOfDepartment: "",
    treatments: [{ title: "", description: "" }],
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle treatments change
  const handleTreatmentChange = (index, e) => {
    const newTreatments = [...formData.treatments];
    newTreatments[index][e.target.name] = e.target.value;
    setFormData({ ...formData, treatments: newTreatments });
  };

  // Add new treatment row
  const addTreatment = () => {
    setFormData({
      ...formData,
      treatments: [...formData.treatments, { title: "", description: "" }],
    });
  };

  // Remove treatment row
  const removeTreatment = (index) => {
    const newTreatments = formData.treatments.filter((_, i) => i !== index);
    setFormData({ ...formData, treatments: newTreatments });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("headOfDepartment", formData.headOfDepartment);
      data.append("treatments", JSON.stringify(formData.treatments));

      if (image) data.append("image", image); // correct field name

      await axios.post(
        "http://localhost:4002/api/admin/departments", // fixed route typo
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Department added successfully!");
      navigate("/admin/admin-dashboard");
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Department</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Department Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        {/* Head of Department */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Head of Department (User ID)
          </label>
          <input
            type="text"
            name="headOfDepartment"
            value={formData.headOfDepartment}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Treatments */}
        <div>
          <label className="block text-sm font-medium mb-2">Treatments</label>
          {formData.treatments.map((treatment, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                name="title"
                placeholder="Treatment Title"
                value={treatment.title}
                onChange={(e) => handleTreatmentChange(index, e)}
                className="w-1/3 border p-2 rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Treatment Description"
                value={treatment.description}
                onChange={(e) => handleTreatmentChange(index, e)}
                className="w-2/3 border p-2 rounded"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTreatment(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTreatment}
            className="mt-2 bg-gray-200 px-4 py-1 rounded"
          >
            + Add Treatment
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Department Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Add Department"}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
