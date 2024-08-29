// src/components/PatientReports.jsx
import React, { useState } from 'react';

const patientReports = [
  { id: 1, name: 'John Doe', date: '2024-08-29', details: 'Detailed report for John Doe... Condition: Stable. Treatment: Prescribed medication.' },
  { id: 2, name: 'Jane Smith', date: '2024-08-28', details: 'Detailed report for Jane Smith... Condition: Requires follow-up. Treatment: Physiotherapy.' },
  { id: 3, name: 'Alice Johnson', date: '2024-08-27', details: 'Detailed report for Alice Johnson... Condition: Critical. Treatment: Immediate surgery needed.' },
];

const PatientReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Logo */}
      <header className="flex items-center justify-between mb-12">
        <img src="/logo.png" alt="App Logo" className="w-32 h-auto" />
        <h1 className="text-4xl font-bold text-green-900">Patient Reports</h1>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {patientReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => openModal(report)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{report.name}</h2>
              <p className="text-gray-500 mb-4">{report.date}</p>
              <p className="text-gray-700 truncate">{report.details}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer" onClick={closeModal}>&times;</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedReport.name}</h2>
            <p className="text-gray-500 mb-4">{selectedReport.date}</p>
            <p className="text-gray-700 mb-6">{selectedReport.details}</p>
            <button
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReports;
