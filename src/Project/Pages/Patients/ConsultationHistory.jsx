import { useState } from 'react';

const consultationData = [
  {
    id: 1,
    doctorName: 'Dr. John Smith',
    department: 'Cardiology',
    dateTime: '2025-09-20 14:30',
    note: 'Follow-up on blood pressure medication',
    fullDetails: 'Patient showed good response to medication. Recommend continuing current dosage and scheduling next visit in 3 months.',
  },
  {
    id: 2,
    doctorName: 'Dr. Emma Brown',
    department: 'Dermatology',
    dateTime: '2025-08-15 10:00',
    note: 'Skin rash evaluation',
    fullDetails: 'Diagnosed as mild eczema. Prescribed topical corticosteroid cream. Advised on skin care routine.',
  },
  // Add more consultation records here...
];

function ConsultationHistory() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {consultationData.map(({ id, doctorName, department, dateTime, note, fullDetails }) => (
        <div key={id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{doctorName}</h3>
              <p className="text-sm text-gray-600">{department}</p>
            </div>
            <div className="text-sm text-gray-500">{dateTime}</div>
          </div>

          <p className="mt-2 text-gray-700 truncate">{note}</p>

          {expandedId === id && (
            <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-300 text-gray-800">
              {fullDetails}
            </div>
          )}

          <button
            onClick={() => setExpandedId(expandedId === id ? null : id)}
            className="mt-3 text-blue-600 hover:underline focus:outline-none"
          >
            {expandedId === id ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ConsultationHistory;
