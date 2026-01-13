# Redux Store Structure

This project uses Redux Toolkit for state management along with React Context API for easier access.

## Store Structure

### Slices

1. **medicalRecordsSlice** (`store/slices/medicalRecordsSlice.js`)
   - Manages patient medical records data
   - State includes:
     - `patient`: Patient profile information
     - `prescriptions`: List of prescriptions
     - `consultations`: List of consultations
     - `labReports`: List of lab reports
     - `vitals`: Patient vital signs
     - `selectedRecord`: Currently selected medical record
     - `loading`: Loading state
     - `error`: Error messages

   - Actions:
     - `fetchMedicalRecords`: Fetch all medical records
     - `fetchMedicalRecordById`: Fetch a specific medical record
     - `deleteMedicalRecord`: Delete a medical record
     - `clearError`: Clear error state
     - `clearSelectedRecord`: Clear selected record

2. **consultationsSlice** (`store/slices/consultationsSlice.js`)
   - Manages consultations grouped by doctor
   - State includes:
     - `doctors`: Array of doctors with their consultation history
     - `summary`: Summary statistics (total doctors, visits, upcoming)
     - `loading`: Loading state
     - `error`: Error messages

   - Actions:
     - `fetchConsultationsByDoctor`: Fetch consultations grouped by doctor
     - `clearError`: Clear error state

## Context API

### PatientContext (`context/PatientContext.jsx`)

Provides a convenient wrapper around Redux store with helper functions:
- `usePatient()`: Hook to access patient-related data and actions
- Automatically handles error notifications
- Provides clean API for components

## Usage Example

```jsx
import { usePatient } from '../context/PatientContext';

function MyComponent() {
  const { medicalRecords, consultations } = usePatient();
  
  // Access data
  const { patient, prescriptions, loading } = medicalRecords;
  const { doctors, summary } = consultations;
  
  // Use actions
  medicalRecords.loadMedicalRecords();
  consultations.loadConsultations();
  
  return <div>...</div>;
}
```

## Provider Setup

The store and context providers are set up in `main.jsx`:

```jsx
<Provider store={store}>
  <AuthProvider>
    <PatientProvider>
      <App />
    </PatientProvider>
  </AuthProvider>
</Provider>
```
