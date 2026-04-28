// src/routes/AppRoutes.js
import { useRoutes } from "react-router-dom";
import React, { lazy, Suspense } from "react";


// Public pages
import HomePage from "./Project/Home/Home";
import SignupPage from "./Project/Home/LoginPage/SignupPage";
import Login from "./Project/Home/LoginPage/Login";
import ForgotPassword from "./Project/Home/FrogetPassword/ForgotPassword";
import ResetPassword from "./Project/Home/FrogetPassword/ResetPassword";

// Super Admin
import SuperAdminLayout from "./Project/Pages/SuperAdmin/SuperAdminLayout";
const SuperAdminDashboard = lazy(() =>
  import("./Project/Pages/SuperAdmin/SuperAdminDashboard")
);
import CreateAdmin from "./Project/Pages/SuperAdmin/CreateAdmin";
import AdminDetails from "./Project/Pages/SuperAdmin/AdminDetails";
import Payments from "./Project/Pages/SuperAdmin/payments";
import Analytics from "./Project/Pages/SuperAdmin/Analytics";
import SuperAdminSettings from "./Project/Pages/SuperAdmin/SuperAdminSettings";

// Patient
const Dashboard = lazy(() =>
  import("./Project/Pages/Patients/Dashboard")
);

// Route protection
import ProtectedRoute from "./Project/Components/ProtectedRoute";
import PatientLayout from "./Project/Pages/Patients/PatientLayout";

// admin
import AdminLayout from "./Project/Pages/Admin/AdminLayout";
const AdminDashboard = lazy(() =>
  import("./Project/Pages/Admin/AdminDashboard")
);
import DoctorTable from "./Project/Pages/Admin/DoctorTable";
import AdminPatients from "./Project/Pages/Admin/AdminPatients";
import AdminAppointments from "./Project/Pages/Admin/AdminAppointments";
import AdminDepartment from "./Project/Pages/Admin/AdminDepartment";
import DoctorsLayout from "./Project/Pages/Doctors/DoctorsLayout";
import ReceptionLayout from "./Project/Pages/Receptionist/ReceptionLayout";
const DoctorsDashboard = lazy(() =>
  import("./Project/Pages/Doctors/DoctorsDashboard")
);
import DoctorAppointment from "./Project/Pages/Doctors/DoctorAppointment";
import DoctoresPatients from "./Project/Pages/Doctors/DoctoresPatients";
import PatientDetailCard from "./Project/Pages/Doctors/DoctorPages/PatientDrawer";
import AddPatientForm from "./Project/Pages/Doctors/DoctorPages/AddPatientForm";
import AppointmentForm from "./Project/Pages/Doctors/DoctorPages/AppointmentForm";

import AdminReceptionist from "./Project/Pages/Admin/AdminReceptionist";
import AddDoctorForm from "./Project/Pages/Admin/pages/AddDoctorForm";
// import Department from "./Project/Pages/Receptionist/Registrection/Department";
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
import DoctorSearch from "./Project/Pages/Patients/pages/DoctorSearch";
import CreateReceptionistForm from "./Project/Pages/Admin/pages/CreateReceptionistForm";
import DoctorScheduleRece from "./Project/Pages/Receptionist/DoctorSchedule";
// import ReceptionHub from "./Project/Pages/Receptionist/Registrection/ReceptionHub";
import GuestRoute from "./Project/Components/DefaultRoute ";
import PtientsDepartment from "./Project/Pages/Patients/Departments";
import PatientsDepartmentDetails from "./Project/Pages/Patients/pages/viewDepartments";
import AppointmentUI from "./Project/Pages/Patients/pages/doctor";
import History from "./Project/Pages/Patients/pages/Appointments/History";
import ConsultationHistory from "./Project/Pages/Patients/ConsultationHistory";
import MedicalRecord from "./Project/Pages/Patients/MedicalRecord";
import MedicalRecordDashboard from "./Project/Pages/Patients/MedicalRecord";
import ChatPagePatient from "./Project/Pages/Patients/ChatPage";
import PatientSettings from "./Project/Pages/Patients/Settings";
import Receptinistappointment from "./Project/Pages/Receptionist/RecepAppointmetns";
import ReceptionRegistration from "./Project/Pages/Receptionist/Registeration";
import DoctorConsultationDashboard from "./Project/Pages/Doctors/DoctorConsultationDashboard";
import ChatPageDoctors from "./Project/Pages/Doctors/DoctorPages/doctorChat";
import DoctorPrescriptionHistory from "./Project/Pages/Doctors/prescriptionHistory";
import DoctorAnalyticsDashboard from "./Project/Pages/Doctors/DoctorAnalyticsDashboard";
import PaymentManagementSystem from "./Project/Pages/Doctors/payments";
import AppointmentBooking from "./Project/Pages/Patients/pages/Appointments/PatientAppointmentForm";
import BillingManagement from "./Project/Pages/Receptionist/pages/Billing/BillingManagement";
import DoctorsList from "./Project/Pages/Receptionist/pages/Doctors/DoctorsList";
import DepartmentsList from "./Project/Pages/Receptionist/pages/Departments/DepartmentsList";
import ReportsPage from "./Project/Pages/Receptionist/pages/Reports/DailyAppointmentReports";
import ViewSearchPatients from "./Project/Pages/Receptionist/pages/Patients/ViewSearchPatients";
import RegisterPatientPage from "./Project/Pages/Receptionist/pages/Patients/RegisterPatientPage";
import BookAppointment from "./Project/Pages/Receptionist/pages/Patients/BookAppointment";
import VisitorManagement from "./Project/Pages/Receptionist/pages/Visitors/VisitorManagement";
import HelpDeskManagement from "./Project/Pages/Receptionist/pages/HelpDesk/HelpDeskManagement";
import ProfileSettings from "./Project/Pages/Receptionist/pages/Profile/ProfileSettings";
import RegisterPatient from "./Project/Pages/Receptionist/pages/Patients/RegisterPatient";
import DailyAppointmentReports from "./Project/Pages/Receptionist/pages/Reports/DailyAppointmentReports";
import { DailyBillingReports } from "./Project/Pages/Receptionist/pages/Reports/DailyBillingReports";
import PatientRegistrationReports from "./Project/Pages/Receptionist/pages/Reports/PatientRegistrationReports";
import DoctorWritePrescription from "./Project/Pages/Doctors/DoctorPages/DoctorWritePrescription";
import DoctorPrescriptionPage from "./Project/Pages/Doctors/DoctorPages/DoctorPrescriptionPage";
import VerifyOtp from "./Project/Home/LoginPage/VerifyOtp";
import DoctorProfileSettings from "./Project/Pages/Doctors/DoctorProfileSettings";
import  ErrorPage  from "../src/units/ErrorPage";

const AppRoutes = () => {
  const routes = [
    // 🔹 Public routes
    {
      path: "/",
      element: <GuestRoute />,
      children: [{ path: "", element: <HomePage /> }],
    },

    {
      path: "/signup",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <SignupPage /> }],
    },
    {
      path: "/verify-otp",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <VerifyOtp /> }],
    },
    {
      path: "/login",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/forgot-password",
      element: <GuestRoute guestRedirect={true} />,
      children: [{ path: "", element: <ForgotPassword /> }],
    },
    {
      path: "/reset-password/:token",
      element: <GuestRoute guestRedirect={true} />,
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
            { path: "admin-details/:id", element: <AdminDetails /> },
            { path: "payments", element: <Payments /> },
            { path: "analytics", element: <Analytics /> },
            { path: "settings", element: <SuperAdminSettings /> },
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
            {
              path: "doctors-consuletion",
              element: <DoctorConsultationDashboard />,
            },
            {
              path: "doctors-prescription",
              element: <DoctorPrescriptionHistory />,
            },
            { path: "doctors-messages", element: <ChatPageDoctors /> },
            {
              path: "doctors-prescription/:appointmentId",
              element: <DoctorPrescriptionPage />,
            },
            { path: "doctors-availability", element: <DoctorSchedule /> },
            { path: "doctors-payment", element: <PaymentManagementSystem /> },
            {
              path: "doctors-analytics",
              element: <DoctorAnalyticsDashboard />,
            },
            { path: "patients-Deteails/:id", element: <PatientDetailCard /> },
            { path: "patients-add", element: <AddPatientForm /> },
            { path: "appointments-add", element: <AppointmentForm /> },
            { path: "appointments-settings", element: <DoctorProfileSettings /> },
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
              path: "receptionist-appointments",
              element: <Receptinistappointment />,
            },
            {
              path: "receptionist-registretion",
              element: <ReceptionRegistration />,
            },
            {
              path: "receptionist-DoctorSchedule",
              element: <DoctorScheduleRece />,
            },
            { path: "receptionist-patientlists", element: <PatientLists /> },
            { path: "AddNewAppointments", element: <RegisterPatient /> },
            { path: "receptionist-details", element: <PatientsLists /> },

            // Patient Management
            { path: "patients/register", element: <RegisterPatientPage /> },
            { path: "patients/book-appointment", element: <BookAppointment /> },
            { path: "patients/view-search", element: <ViewSearchPatients /> },

            // Billing & Payments
            { path: "billing/generate-bill", element: <BillingManagement /> },

            // Doctors & Departments
            { path: "doctors", element: <DoctorsList /> },
            { path: "departments", element: <DepartmentsList /> },

            // Reports
            {
              path: "reports/appointments",
              element: <DailyAppointmentReports />,
            },
            { path: "reports/billing", element: <DailyBillingReports /> },
            {
              path: "reports/patient-registrations",
              element: <PatientRegistrationReports />,
            },

            // Visitor Management
            { path: "visitors/register", element: <VisitorManagement /> },
            { path: "visitors/pass", element: <VisitorManagement /> },
            { path: "visitors/history", element: <VisitorManagement /> },

            // Help Desk
            { path: "helpdesk/enquiries", element: <HelpDeskManagement /> },
            { path: "helpdesk/info", element: <HelpDeskManagement /> },
            { path: "helpdesk/lost-found", element: <HelpDeskManagement /> },
            { path: "helpdesk/announcements", element: <HelpDeskManagement /> },

            // Profile & Settings
            { path: "profile", element: <ProfileSettings /> },
            { path: "settings", element: <ProfileSettings /> },
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
            {
              path: "patient-departments/:id",
              element: <PatientsDepartmentDetails />,
            },
            { path: "chatPage", element: <ChatPagePatient /> },
            { path: "records", element: <MedicalRecordDashboard /> },
            { path: "consultation", element: <ConsultationHistory /> },
            { path: "settings", element: <PatientSettings /> },
            { path: "book-appointments", element: <AppointmentBooking /> },
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

 const element = useRoutes(routes);

return (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    }
  >
    {element}
  </Suspense>
);
};

export default AppRoutes;
