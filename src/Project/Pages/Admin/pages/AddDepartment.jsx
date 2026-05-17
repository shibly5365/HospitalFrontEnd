import { apiClient } from "../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Plus,
  Trash2,
  Save,
  X,
  Briefcase,
  User,
  FileText,
  Activity,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headOfDepartment: "",
    treatments: [{ title: "", description: "" }],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [treatments, setTreatments] = useState([
    { title: "", description: "" },
  ]);

  // Fetch doctors for head of department selection
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const response = await apiClient.get(
          "/admin/getAll-Doctor",
          {
            withCredentials: true,
          },
        );

        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle treatments change
  const handleTreatmentChange = (index, e) => {
    const newTreatments = [...treatments];
    newTreatments[index][e.target.name] = e.target.value;
    setTreatments(newTreatments);
  };

  // Add new treatment row
  const addTreatment = () => {
    setTreatments([...treatments, { title: "", description: "" }]);
  };

  // Remove treatment row
  const removeTreatment = (index) => {
    const newTreatments = treatments.filter((_, i) => i !== index);
    setTreatments(newTreatments);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      data.append("treatments", JSON.stringify(treatments));
      if (image) data.append("image", image);

      await apiClient.post("/admin/departments", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/admin-dashboard");
    } catch (error) {
      console.error("Error adding department:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <button
           onClick={() => navigate("/admin/admin-department")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Department
          </h1>
          <p className="text-gray-600">
            Add a medical department with its treatments and head of department
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Department Name Section */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Department Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Basic details about the department
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g., Cardiology, Neurology, Pediatrics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Head of Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="headOfDepartment"
                    value={formData.headOfDepartment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                    required
                  >
                    <option value="">Select Head of Department</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                  {loadingDoctors && (
                    <p className="text-sm text-gray-500 mt-1">
                      Loading doctors...
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Describe the department's role, services, and expertise..."
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="p-8 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <ImageIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Department Image
                  </h2>
                  <p className="text-sm text-gray-500">
                    Upload a representative image for the department
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-40 w-auto rounded-lg object-cover shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Treatments Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Treatments & Procedures
                    </h2>
                    <p className="text-sm text-gray-500">
                      List all treatments offered by this department
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addTreatment}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Treatment
                </button>
              </div>

              <div className="space-y-4">
                {treatments.map((treatment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-gray-900">
                          Treatment #{index + 1}
                        </h3>
                      </div>
                      {treatments.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTreatment(index)}
                          className="text-red-500 hover:text-red-700 transition p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Treatment Name
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={treatment.title}
                          onChange={(e) => handleTreatmentChange(index, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="e.g., Coronary Artery Bypass"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={treatment.description}
                          onChange={(e) => handleTreatmentChange(index, e)}
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Brief description of the treatment..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {treatments.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">
                    No treatments added yet. Click "Add Treatment" to get
                    started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/admin-dashboard")}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              {loading ? "Creating Department..." : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
