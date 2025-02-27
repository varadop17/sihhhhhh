import React, { useState } from 'react';
import jsPDF from 'jspdf';

const patientReports = [
  { id: 1, name: 'Ravi Kumar', date: '2024-08-29', details: 'Condition: Stable. Treatment: Prescribed medication.', fullDetails: 'Ravi Kumar has been under observation for 3 days. Vital signs are stable. Medication prescribed includes XYZ. Advised to continue medication and return for a follow-up after 1 week.', diseaseType: 'Hypertension', bloodGroup: 'O+' },
  { id: 2, name: 'Priya Sharma', date: '2024-08-28', details: 'Condition: Requires follow-up. Treatment: Physiotherapy.', fullDetails: 'Priya Sharma has shown improvement with physiotherapy. Advised to continue sessions for another 2 weeks. Possible re-evaluation after the period to assess recovery progress.', diseaseType: 'Back Pain', bloodGroup: 'A-' },
  { id: 3, name: 'Anjali Verma', date: '2024-08-27', details: 'Condition: Critical. Treatment: Immediate surgery needed.', fullDetails: 'Anjali Verma requires immediate surgery due to complications. Pre-surgery preparations are underway, and family has been informed. Post-surgery care plan will be discussed after the operation.', diseaseType: 'Appendicitis', bloodGroup: 'B+' },
  { id: 4, name: 'Vikram Singh', date: '2024-08-26', details: 'Condition: Improving. Treatment: Continued monitoring.', fullDetails: 'Vikram Singh is recovering well. Vital signs are improving. Advised to remain under observation for another 48 hours before discharge. Diet plan and light exercises suggested for post-discharge care.', diseaseType: 'Diabetes', bloodGroup: 'AB-' },
  { id: 5, name: 'Meera Patel', date: '2024-08-25', details: 'Condition: Stable. Treatment: Routine check-up.', fullDetails: 'Meera Patel has come in for a routine check-up. All vital signs are normal. Advised to maintain current lifestyle and return for a yearly check-up unless symptoms arise.', diseaseType: 'Asthma', bloodGroup: 'O-' },
  { id: 6, name: 'Amitabh Desai', date: '2024-08-24', details: 'Condition: Critical. Treatment: ICU admission.', fullDetails: 'Amitabh Desai is in critical condition and has been admitted to the ICU. He is on ventilator support and being closely monitored. Family has been briefed on the situation. Awaiting further tests to determine the next steps.', diseaseType: 'Severe Pneumonia', bloodGroup: 'A+' },
];

const PatientReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  const filteredReports = patientReports.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadPDF = (report) => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Hospital Report', 14, 22);

    // Add patient information section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Information', 14, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${report.name}`, 14, 50);
    doc.text(`Date: ${report.date}`, 14, 60);
    doc.text(`Disease Type: ${report.diseaseType}`, 14, 70);
    doc.text(`Blood Group: ${report.bloodGroup}`, 14, 80);

    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(14, 85, 196, 85); // X1, Y1, X2, Y2

    // Add details section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Report Details', 14, 95);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(report.fullDetails, 14, 105, { maxWidth: 180 });

    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated by Aarogya Kavach', 14, doc.internal.pageSize.height - 10);

    doc.save(`${report.name}_Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="bg-green-100 text-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="App Logo" className="w-10 h-auto mr-3" />
            <span className="text-xl font-bold">Aarogya Kavach</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-gray-600">Home</a>
            <a href="#reports" className="hover:text-gray-600">Reports</a>
            <a href="#contact" className="hover:text-gray-600">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">XYZ Hospital</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Patient Reports</h1>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a patient..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Patient Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(report)}
            >
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-700 mb-1">{report.name}</h2>
                <p className="text-sm text-gray-400 mb-2">{report.date}</p>
                <p className="text-sm text-gray-600 truncate">{report.details}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="absolute top-3 right-3 text-gray-600 cursor-pointer text-xl" onClick={closeModal}>&times;</span>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{selectedReport.name}</h2>
              <p className="text-sm text-gray-400 mb-3">{selectedReport.date}</p>
              <p className="text-sm text-gray-600 mb-3">Disease Type: {selectedReport.diseaseType}</p>
              <p className="text-sm text-gray-600 mb-6">Blood Group: {selectedReport.bloodGroup}</p>
              <p className="text-base text-gray-700 mb-6">{selectedReport.fullDetails}</p>
              <button
                className="w-full py-2 mb-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                onClick={() => downloadPDF(selectedReport)}
              >
                Download PDF
              </button>
              <button
                className="w-full py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReports;
