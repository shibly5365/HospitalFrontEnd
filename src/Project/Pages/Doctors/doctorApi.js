import { apiClient } from "../../../services/queryClient";

const doctorPath = (path) => `/doctor${path}`;
const doctorApi = {
  get: (path, config) => apiClient.get(doctorPath(path), config),
  post: (path, data, config) => apiClient.post(doctorPath(path), data, config),
  put: (path, data, config) => apiClient.put(doctorPath(path), data, config),
  delete: (path, config) => apiClient.delete(doctorPath(path), config),
};

export default doctorApi;
