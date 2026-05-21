import { toast } from "react-hot-toast";

export const confirmToast = (message) =>
  new Promise((resolve) => {
    toast(
      (t) => (
        <div className="bg-white shadow-lg rounded-lg p-4 w-72">
          <p className="text-sm font-medium text-gray-700 mb-3">
            {message}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Yes
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right", // ✅ TOP RIGHT
        duration: 5000,
      }
    );
  });