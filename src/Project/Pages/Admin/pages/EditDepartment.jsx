import { apiClient } from "../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Building2,
  User,
  FileText,
  Stethoscope,
  ArrowLeft,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    headOfDepartment: "",
    treatments: [{ title: "", description: "" }],
  });

  const [doctors, setDoctors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Doctors API
        const docRes = await apiClient.get(
          `/admin/getalldoctorDepartments/${id}`,
          { withCredentials: true },
        );
        console.log("gaaa", docRes.data);

        const doctorsList = docRes.data.doctors || [];
        const hod = docRes.data.headOfDepartment || "";

        // ✅ Department API
        const deptRes = await apiClient.get(
          `/admin/getdepartmenst/${id}`,
          { withCredentials: true },
        );
        console.log("dfasdfdsa", deptRes.data);

        const dept = deptRes.data.department || deptRes.data || {};
        console.log("faaa", dept);

        setDoctors(doctorsList);
        setData({
          name: dept?.name || "",
          description: dept?.description || "",

          // ✅ store ID (NOT name)
          headOfDepartment:
            typeof dept?.headOfDepartment === "object"
              ? dept.headOfDepartment._id
              : dept?.headOfDepartment || "",

          treatments:
            Array.isArray(dept?.treatments) && dept.treatments.length > 0
              ? dept.treatments
              : [{ title: "", description: "" }],
        });

        if (dept.departmentImage) {
          setPreview(dept.departmentImage);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load department data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTreatmentChange = (index, field, value) => {
    const updated = [...data.treatments];
    updated[index][field] = value;
    setData({ ...data, treatments: updated });
  };

  const addTreatment = () => {
    setData({
      ...data,
      treatments: [...data.treatments, { title: "", description: "" }],
    });
  };

  const removeTreatment = (index) => {
    const updated = data.treatments.filter((_, i) => i !== index);
    setData({ ...data, treatments: updated });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or WebP)");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  // Remove image
  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);
      if (data.headOfDepartment) {
        form.append("headOfDepartment", data.headOfDepartment);
      }
      form.append("treatments", JSON.stringify(data.treatments));
      
      // Append image if a new one was selected
      if (imageFile) {
        form.append("departmentImage", imageFile);
      }

      await apiClient.put(
        `/admin/updateddepartments/${id}`,
        form,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      navigate("/admin/admin-dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update department");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading department details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/admin-dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Department
              </h1>
              <p className="text-gray-500 mt-1">
                Update department information and services
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Basic Information
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name *
                  </label>
                  <input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="e.g., Cardiology, Neurology"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Head of Department *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="headOfDepartment"
                      value={data.headOfDepartment}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                    >
                      <option value="">Select Department Head</option>
                      {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name} {d.isHead ? "⭐ (HOD)" : ""} -{" "}
                          {d.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Describe the department's mission, services, and expertise..."
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Department Image Card - Updated with upload functionality */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Department Image
              </h2>
            </div>
            <div className="p-6">
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Department"
                    className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-xl transition-all flex items-center justify-center gap-3">
                    <label className="cursor-pointer bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-3 group-hover:text-purple-500 transition-colors" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, or WebP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              {preview && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Hover over image to change or remove
                </p>
              )}
            </div>
          </div>

          {/* Treatments Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-green-600" />
                Treatments & Services
              </h2>
              <button
                type="button"
                onClick={addTreatment}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Treatment
              </button>
            </div>

            <div className="p-6">
              {data.treatments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No treatments added yet</p>
                  <button
                    type="button"
                    onClick={addTreatment}
                    className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add your first treatment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.treatments.map((t, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-700">
                          Treatment #{index + 1}
                        </h3>
                        {data.treatments.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTreatment(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Treatment title (e.g., Root Canal, MRI Scan)"
                          value={t.title}
                          onChange={(e) =>
                            handleTreatmentChange(
                              index,
                              "title",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                        <textarea
                          placeholder="Detailed description of the treatment..."
                          value={t.description}
                          onChange={(e) =>
                            handleTreatmentChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/admin-dashboard")}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;