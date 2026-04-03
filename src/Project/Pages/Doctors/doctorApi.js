import axios from "axios";

const doctorApi = axios.create({
  baseURL: "http://localhost:4002/api/doctor",
  withCredentials: true,
});

export default doctorApi;
