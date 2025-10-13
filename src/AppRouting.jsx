// src/routes/AppRoutes.js
import { useRoutes } from "react-router-dom";

// Public pages
import HomePage from "./Project/Home/Home";
import SignupPage from "./Project/Home/LoginPage/SignupPage";
import Login from "./Project/Home/LoginPage/Login";
import ForgotPassword from "./Project/Home/FrogetPassword/ForgotPassword";
import ResetPassword from "./Project/Home/FrogetPassword/ResetPassword";

// Super Admin
import SuperAdminLayout from "./Project/Pages/SuperAdmin/SuperAdminLayout";
import SuperAdminDashboard from "./Project/Pages/SuperAdmin/SuperAdminDashboard";
import CreateAdmin from "./Project/Pages/SuperAdmin/CreateAdmin";

// Patient
import PatientSidebar from "./Project/Pages/Patients/PatientSidebar";
import Dashboard from "./Project/Pages/Patients/Dashboard";

// Route protection
import ProtectedRoute from "./Project/Components/ProtectedRoute";
import PatientLayout from "./Project/Pages/Patients/PatientLayout";

// admin
import AdminLayout from "./Project/Pages/Admin/AdminLayout";
import AdminDashboard from "./Project/Pages/Admin/AdminDashboard";
import DoctorTable from "./Project/Pages/Admin/DoctorTable";
import AdminPatients from "./Project/Pages/Admin/AdminPatients";
import AdminAppointments from "./Project/Pages/Admin/AdminAppointments";
import AdminDepartment from "./Project/Pages/Admin/AdminDepartment";
import DoctorsLayout from "./Project/Pages/Doctors/DoctorsLayout";
import ReceptionLayout from "./Project/Pages/Receptionist/ReceptionLayout";
import ReceptionDashboard from "./Project/Pages/Receptionist/RecepDashboard";
import RecepAppointmetns from "./Project/Pages/Receptionist/RecepAppointmetns";
import ReceptionRegistration from "./Project/Pages/Receptionist/Registrection/ReceptionRegistration";
import DoctorsDashboard from "./Project/Pages/Doctors/DoctorsDashboard";
import DoctorAppointment from "./Project/Pages/Doctors/DoctorAppointment";
import DoctoresPatients from "./Project/Pages/Doctors/DoctoresPatients";
import PatientDetailCard from "./Project/Pages/Doctors/DoctorPages/PatientDrawer";
import AddPatientForm from "./Project/Pages/Doctors/DoctorPages/AddPatientForm";
import AppointmentForm from "./Project/Pages/Doctors/DoctorPages/AppointmentForm";

import AdminReceptionist from "./Project/Pages/Admin/AdminReceptionist";
import AddDoctorForm from "./Project/Pages/Admin/pages/AddDoctorForm";
import Department from "./Project/Pages/Receptionist/Registrection/Department";
import PatientDetails from "./Project/Pages/Admin/pages/PatientDetails";
import ReceptionistDetails from "./Project/Pages/Admin/pages/ReceptionistDetails";
import PatientAppointments from "./Project/Pages/Patients/Appointments";
import PatientAppointmentForm from "./Project/Pages/Patients/pages/Appointments/PatientAppointmentForm";
import PatientLists from "./Project/Pages/Receptionist/PatientLists";
import DepartmentDetails from "./Project/Pages/Admin/pages/DepartmentDetails";
import DoctorSchedule from "./Project/Pages/Doctors/DoctorSchedule";
import AddDepartment from "./Project/Pages/Admin/pages/AddDepartment";
import PatientsLists from "./Project/Pages/Receptionist/pages/Add/PatientsLists";
import ReSchedulingAppointments from "./Project/Pages/Patients/pages/ReScheduling";
import ErrorPage from "./Units/ErrorPage";
import DoctorSearch from "./Project/Pages/Patients/pages/DoctorSearch";
import NewAppointmentForm from "./Project/Pages/Receptionist/pages/NewAppointmentForm";
import Consultation from "./Project/Pages/Doctors/Consultation";
import ConsultationList from "./Project/Pages/Doctors/Consuletion";
import CreateReceptionistForm from "./Project/Pages/Admin/pages/CreateReceptionistForm";
import DoctorScheduleRece from "./Project/Pages/Receptionist/DoctorSchedule";
import ReceptionHub from "./Project/Pages/Receptionist/Registrection/ReceptionHub";
import GuestRoute from "./Project/Components/DefaultRoute ";
import PtientsDepartment from "./Project/Pages/Patients/Departments";
import PatientsDepartmentDetails from "./Project/Pages/Patients/pages/viewDepartments";
import AppointmentUI from "./Project/Pages/Patients/pages/doctor";
import History from "./Project/Pages/Patients/pages/Appointments/History";
import ChatUI from "./Project/Pages/Patients/Chat";
import ConsultationHistory from "./Project/Pages/Patients/ConsultationHistory";

const AppRoutes = () => {
  const routes = [
    // 🔹 Public routes
    {
      path: "/",
      element: <GuestRoute />,
      children: [{ path: "", element: <HomePage /> }],
    },

    {
      path: "/login",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/signup",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <SignupPage /> }],
    },
    {
      path: "/forgot-password",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <ForgotPassword /> }],
    },
    {
      path: "/reset-password/:token",
      element: <GuestRoute  guestRedirect={true} />,
      children: [{ path: "", element: <ResetPassword /> }],
    },

    // 🔹 Super Admin routes
    {
      path: "/super-admin",
      element: <ProtectedRoute roleRequired="superadmin" />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <SuperAdminLayout />,
          children: [
            { path: "super-admin-dashboard", element: <SuperAdminDashboard /> },
            { path: "admin-management", element: <CreateAdmin /> },
          ],
        },
      ],
    },

    {
      /* Admin Routing  */
    },
    {
      path: "/admin",
      element: <ProtectedRoute roleRequired={"admin"} />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { path: "admin-dashboard", element: <AdminDashboard /> },
            { path: "admin-appointments", element: <AdminAppointments /> },
            { path: "admin-patient", element: <AdminPatients /> },
            { path: "admin-receptionist", element: <AdminReceptionist /> },
            { path: "admin-doctorDetails", element: <DoctorTable /> },
            { path: "admin-department", element: <AdminDepartment /> },
            { path: "patients/:id", element: <PatientDetails /> },
            { path: "doctorForm", element: <AddDoctorForm /> },
            { path: "addDepartment", element: <AddDepartment /> },
            {
              path: "creating-receptionist",
              element: <CreateReceptionistForm />,
            },
            { path: "departmetsDetails/:id", element: <DepartmentDetails /> },
            { path: "receptionist/:id", element: <ReceptionistDetails /> },
          ],
        },
      ],
    },

    // 🔹 Doctors routes

    {
      path: "/doctors",
      element: <ProtectedRoute roleRequired="doctor" />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <DoctorsLayout />,
          children: [
            { path: "doctors-dashboard", element: <DoctorsDashboard /> },
            { path: "doctors-appointments", element: <DoctorAppointment /> },
            { path: "doctors-patients", element: <DoctoresPatients /> },
            { path: "doctors-availability", element: <DoctorSchedule /> },
            { path: "doctors-consuletion", element: <ConsultationList /> },
            { path: "patients-Deteails/:id", element: <PatientDetailCard /> },
            { path: "patients-add", element: <AddPatientForm /> },
            { path: "appointments-add", element: <AppointmentForm /> },
          ],
        },
      ],
    },

    //  🔹 Receptionist routes

    {
      path: "/receptionist",
      element: <ProtectedRoute roleRequired="receptionist" />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <ReceptionLayout />,
          children: [
            {
              path: "receptionist-dashboard",
              element: <ReceptionDashboard />,
            },
            {
              path: "receptionist-appointments",
              element: <RecepAppointmetns />,
            },
            {
              path: "receptionist-registretion",
              element: <ReceptionRegistration />,
            },
            {
              path: "receptionist-DoctorSchedule",
              element: <DoctorScheduleRece />,
            },
            { path: "receptionist-ReceptionHub", element: <ReceptionHub /> },
            { path: "receptionist-patientlists", element: <PatientLists /> },
            { path: "departments/:id", element: <Department /> },
            { path: "AddNewAppointments", element: <NewAppointmentForm /> },
            { path: "receptionist-details", element: <PatientsLists /> },
          ],
        },
      ],
    },

    // 🔹 Patient routes
    {
      path: "/patient",
      element: <ProtectedRoute roleRequired="patient" />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <PatientLayout />,
          children: [
            { path: "patient-dashboard", element: <Dashboard /> },
            { path: "patient-appointments", element: <PatientAppointments /> },
            { path: "patient-departments", element: <PtientsDepartment /> },
            { path: "patient-Form", element: <PatientAppointmentForm /> },
            { path: "doctoresList/:id", element: <AppointmentUI /> },
            {
              path: "patient-appointmenSchedule/:id",
              element: <ReSchedulingAppointments />,
            },
            { path: "doctors-search", element: <DoctorSearch /> },
            { path: "appointmentsHistory", element: <History /> },
            { path: "patient-departments/:id", element: <PatientsDepartmentDetails /> },
            { path: "chatPage", element: <ChatUI /> },
            { path: "consultation", element: <ConsultationHistory /> },
          ],
        },
      ],
    },
    {
      path: "/errorPage",
      element: <ProtectedRoute guestRedirect={true} />,
      errorElement: <ErrorPage />,
      children: [{ path: "", element: <ErrorPage /> }],
    },

    // 🔹 404 fallback
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
