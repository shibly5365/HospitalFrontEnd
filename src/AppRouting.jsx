// src/routes/AppRoutes.js
import { useRoutes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Public pages
import HomePage from "./Project/Home/Home";
const SignupPage = lazy(() => import("./Project/Home/LoginPage/SignupPage"));
import Login from "./Project/Home/LoginPage/Login";
import ForgotPassword from "./Project/Home/FrogetPassword/ForgotPassword";
import ResetPassword from "./Project/Home/FrogetPassword/ResetPassword";

// Super Admin
import SuperAdminLayout from "./Project/Pages/SuperAdmin/SuperAdminLayout";
const SuperAdminDashboard = lazy(
  () => import("./Project/Pages/SuperAdmin/SuperAdminDashboard"),
);
import CreateAdmin from "./Project/Pages/SuperAdmin/CreateAdmin";
import AdminDetails from "./Project/Pages/SuperAdmin/AdminDetails";
const Payments = lazy(() => import("./Project/Pages/SuperAdmin/payments"));
const Analytics = lazy(() => import("./Project/Pages/SuperAdmin/Analytics"));
import SuperAdminSettings from "./Project/Pages/SuperAdmin/SuperAdminSettings";

// Patient
const Dashboard = lazy(() => import("./Project/Pages/Patients/Dashboard"));

// Route protection
import ProtectedRoute from "./Project/Components/ProtectedRoute";
import PatientLayout from "./Project/Pages/Patients/PatientLayout";

// admin
import AdminLayout from "./Project/Pages/Admin/AdminLayout";
const AdminDashboard = lazy(
  () => import("./Project/Pages/Admin/AdminDashboard"),
);
const DoctorTable = lazy(() => import("./Project/Pages/Admin/DoctorTable"));
const AdminPatients = lazy(() => import("./Project/Pages/Admin/AdminPatients"));
const AdminAppointments = lazy(
  () => import("./Project/Pages/Admin/AdminAppointments"),
);
const AdminDepartment = lazy(
  () => import("./Project/Pages/Admin/AdminDepartment"),
);
import DoctorsLayout from "./Project/Pages/Doctors/DoctorsLayout";
import ReceptionLayout from "./Project/Pages/Receptionist/ReceptionLayout";
const DoctorsDashboard = lazy(
  () => import("./Project/Pages/Doctors/DoctorsDashboard"),
);
const DoctorAppointment = lazy(
  () => import("./Project/Pages/Doctors/DoctorAppointment"),
);
const DoctoresPatients = lazy(
  () => import("./Project/Pages/Doctors/DoctoresPatients"),
);
const PatientDetailCard = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/PatientDrawer"),
);
const AddPatientForm = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/AddPatientForm"),
);
const AppointmentForm = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/AppointmentForm"),
);

const AdminReceptionist = lazy(
  () => import("./Project/Pages/Admin/AdminReceptionist"),
);
const AddDoctorForm = lazy(
  () => import("./Project/Pages/Admin/pages/AddDoctorForm"),
);
// import Department from "./Project/Pages/Receptionist/Registrection/Department";
const PatientDetails = lazy(
  () => import("./Project/Pages/Admin/pages/PatientDetails"),
);
const ReceptionistDetails = lazy(
  () => import("./Project/Pages/Admin/pages/ReceptionistDetails"),
);
const PatientAppointments = lazy(
  () => import("./Project/Pages/Patients/Appointments"),
);
const PatientAppointmentForm = lazy(
  () =>
    import("./Project/Pages/Patients/pages/Appointments/PatientAppointmentForm"),
);
const PatientLists = lazy(
  () => import("./Project/Pages/Receptionist/PatientLists"),
);
const DepartmentDetails = lazy(
  () => import("./Project/Pages/Admin/pages/DepartmentDetails"),
);
const DoctorSchedule = lazy(
  () => import("./Project/Pages/Doctors/DoctorSchedule"),
);
const AddDepartment = lazy(
  () => import("./Project/Pages/Admin/pages/AddDepartment"),
);
const PatientsLists = lazy(
  () => import("./Project/Pages/Receptionist/pages/Add/PatientsLists"),
);
const ReSchedulingAppointments = lazy(
  () => import("./Project/Pages/Patients/pages/ReScheduling"),
);
const DoctorSearch = lazy(
  () => import("./Project/Pages/Patients/pages/DoctorSearch"),
);
const CreateReceptionistForm = lazy(
  () => import("./Project/Pages/Admin/pages/CreateReceptionistForm"),
);
const DoctorScheduleRece = lazy(
  () => import("./Project/Pages/Receptionist/DoctorSchedule"),
);
// import ReceptionHub from "./Project/Pages/Receptionist/Registrection/ReceptionHub";
import GuestRoute from "./Project/Components/DefaultRoute ";
const PtientsDepartment = lazy(
  () => import("./Project/Pages/Patients/Departments"),
);
const PatientsDepartmentDetails = lazy(
  () => import("./Project/Pages/Patients/pages/viewDepartments"),
);
const AppointmentUI = lazy(
  () => import("./Project/Pages/Patients/pages/doctor"),
);
const History = lazy(
  () => import("./Project/Pages/Patients/pages/Appointments/History"),
);
const ConsultationHistory = lazy(
  () => import("./Project/Pages/Patients/ConsultationHistory"),
);
const MedicalRecordDashboard = lazy(
  () => import("./Project/Pages/Patients/MedicalRecord"),
);
const ChatPagePatient = lazy(() => import("./Project/Pages/Patients/ChatPage"));
const PatientSettings = lazy(() => import("./Project/Pages/Patients/Settings"));
const Receptinistappointment = lazy(
  () => import("./Project/Pages/Receptionist/RecepAppointmetns"),
);
const ReceptionRegistration = lazy(
  () => import("./Project/Pages/Receptionist/Registeration"),
);
const DoctorConsultationDashboard = lazy(
  () => import("./Project/Pages/Doctors/DoctorConsultationDashboard"),
);
const ChatPageDoctors = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/doctorChat"),
);
const DoctorPrescriptionHistory = lazy(
  () => import("./Project/Pages/Doctors/prescriptionHistory"),
);
const DoctorAnalyticsDashboard = lazy(
  () => import("./Project/Pages/Doctors/DoctorAnalyticsDashboard"),
);
const PaymentManagementSystem = lazy(
  () => import("./Project/Pages/Doctors/payments"),
);
const AppointmentBooking = PatientAppointmentForm;
const BillingManagement = lazy(
  () => import("./Project/Pages/Receptionist/pages/Billing/BillingManagement"),
);
const DoctorsList = lazy(
  () => import("./Project/Pages/Receptionist/pages/Doctors/DoctorsList"),
);
const DepartmentsList = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/Departments/DepartmentsList"),
);
const ViewSearchPatients = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/Patients/ViewSearchPatients"),
);
const RegisterPatientPage = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/Patients/RegisterPatientPage"),
);
const BookAppointment = lazy(
  () => import("./Project/Pages/Receptionist/pages/Patients/BookAppointment"),
);
const VisitorManagement = lazy(
  () => import("./Project/Pages/Receptionist/pages/Visitors/VisitorManagement"),
);
const HelpDeskManagement = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/HelpDesk/HelpDeskManagement"),
);
const ProfileSettings = lazy(
  () => import("./Project/Pages/Receptionist/pages/Profile/ProfileSettings"),
);
const RegisterPatient = lazy(
  () => import("./Project/Pages/Receptionist/pages/Patients/RegisterPatient"),
);
const DailyAppointmentReports = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/Reports/DailyAppointmentReports"),
);
const DailyBillingReports = lazy(() =>
  import("./Project/Pages/Receptionist/pages/Reports/DailyBillingReports").then(
    (module) => ({ default: module.DailyBillingReports }),
  ),
);
const PatientRegistrationReports = lazy(
  () =>
    import("./Project/Pages/Receptionist/pages/Reports/PatientRegistrationReports"),
);
const DoctorWritePrescription = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/DoctorWritePrescription"),
);
const DoctorPrescriptionPage = lazy(
  () => import("./Project/Pages/Doctors/DoctorPages/DoctorPrescriptionPage"),
);
const VerifyOtp = lazy(() => import("./Project/Home/LoginPage/VerifyOtp"));
const DoctorScheduleAdmin = lazy(
  () => import("./Project/Pages/Admin/DoctorScheduleAdmin"),
);
import ErrorPage from "./units/ErrorPage";
const DoctorProfileSettings = lazy(
  () => import("./Project/Pages/Doctors/DoctorProfileSettings"),
);
const EditDepartment = lazy(
  () => import("./Project/Pages/Admin/pages/EditDepartment"),
);
const DoctorMonitoringDashboard = lazy(
  () => import("./Project/Pages/Admin/pages/DoctorMonitoringDashboard"),
);
const AdminChat = lazy(() => import("./Project/Pages/Admin/AdminChat"));
const PaymentDashboard = lazy(
  () => import("./Project/Pages/Admin/PaymentDashboard"),
);
import ChatProvider from "./features/chat/ChatProvider";
import PageLoader from "./skeletons/PageLoader";
import SupportCenter from "./Project/Pages/Admin/SupportCenter";
const PatientPaymentHistorys = lazy(
  () => import("./Project/Pages/Patients/pages/PatientPaymentHistory"),
);
const PrescriptionHistory = lazy(
  () => import("./Project/Pages/Patients/pages/PrescriptionHistory"),
);

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
            { path: "edit-department/:id", element: <EditDepartment /> },
            { path: "patients/:id", element: <PatientDetails /> },
            { path: "doctorForm", element: <AddDoctorForm /> },
            { path: "doctorView/:id", element: <DoctorMonitoringDashboard /> },
            { path: "addDepartment", element: <AddDepartment /> },
            {
              path: "creating-receptionist",
              element: <CreateReceptionistForm />,
            },
            { path: "departmetsDetails/:id", element: <DepartmentDetails /> },
            { path: "receptionist/:id", element: <ReceptionistDetails /> },
            { path: "doctor-schedule", element: <DoctorScheduleAdmin /> },
            { path: "admin-messages", element: <AdminChat /> },
            { path: "admin-payments", element: <PaymentDashboard /> },
            { path: "admin-complaints", element: <SupportCenter /> },
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
            {
              path: "doctors-messages",
              element: (
                <ChatProvider>
                  <ChatPageDoctors />
                </ChatProvider>
              ),
            },
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
            {
              path: "appointments-settings",
              element: <DoctorProfileSettings />,
            },
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
            {
              path: "chatPage",
              element: (
                <ChatProvider>
                  <ChatPagePatient />
                </ChatProvider>
              ),
            },
            { path: "records", element: <MedicalRecordDashboard /> },
            { path: "consultation", element: <ConsultationHistory /> },
            { path: "settings", element: <PatientSettings /> },
            { path: "book-appointments", element: <AppointmentBooking /> },
            { path: "payment-history", element: <PatientPaymentHistorys /> },
            {
              path: "prescrption-history",
              element: (
                <ChatProvider>
                  <PrescriptionHistory />
                </ChatProvider>
              ),
            },
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

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
};

export default AppRoutes;
