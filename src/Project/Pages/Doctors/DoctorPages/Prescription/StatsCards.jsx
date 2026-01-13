import React from 'react';
import { FileText, Activity, ClipboardList } from 'lucide-react';

const StatsCards = ({ prescriptions }) => {
  const stats = [
    {
      label: 'Total Prescriptions',
      value: prescriptions.length,
      icon: FileText,
      color: 'blue'
    },
    {
      label: 'Active Prescriptions',
      value: prescriptions.filter(p => p.status === 'Active').length,
      icon: Activity,
      color: 'green'
    },
    {
      label: 'Completed',
      value: prescriptions.filter(p => p.status === 'Completed').length,
      icon: ClipboardList,
      color: 'gray'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${stat.color}-600`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <stat.icon className={`w-12 h-12 text-${stat.color}-600 opacity-20`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;