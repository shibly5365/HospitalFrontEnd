import { toast } from "react-hot-toast";

export const notify = {
  success: (msg) =>
    toast.success(msg || "Success!", {
      position: "top-right",
      className: "bg-green-500 text-white px-4 py-2 rounded-lg shadow",
    }),
  error: (msg) =>
    toast.error(msg || "Error!", {
      position: "top-right",
      className: "bg-red-500 text-white px-4 py-2 rounded-lg shadow",
    }),
  info: (msg) =>
    toast(msg || "Info", {
      position: "top-right",
      className: "bg-blue-500 text-white px-4 py-2 rounded-lg shadow",
    }),
};
