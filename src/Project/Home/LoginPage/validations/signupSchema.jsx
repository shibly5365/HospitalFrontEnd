import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
    .required("Contact is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .max(120, "Please enter a valid age")
    .required("Age is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Select a valid gender")
    .required("Gender is required"),
  profileImage: Yup.mixed()
    .nullable()
    .test("fileSize", "File too large (max 5MB)", (value) => {
      if (!value || !value[0]) return true;
      return value[0].size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || !value[0]) return true;
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value[0].type);
    }),
});