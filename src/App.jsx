import React, { useState } from "react";
import * as d3 from "d3";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [report] = useState({
    patientId: "P-12345",
    findings: [
      { issue: "Cavity", count: 2 },
      { issue: "Alignment Issue", count: 1 },
      { issue: "Gum Problem", count: 1 },
    ],
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const generatePDF = () => {
    const reportElement = document.getElementById("report-section");
    html2canvas(reportElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dental-report.pdf");
    });
  };

  return (
    <div className="app">
      <h1>Dental Imaging Analysis Demo</h1>

      {/* Upload */}
      <input type="file" accept="image/*" onChange={handleUpload} />

      {/* Image Area */}
      {image && (
        <div className="image-area">
          <img src={image} alt="Dental X-ray" className="xray" />
          {/* Highlighted Regions */}
          <div
            className="highlight"
            style={{ top: "30%", left: "40%" }}
          ></div>
          <div
            className="highlight"
            style={{ top: "55%", left: "60%" }}
          ></div>
        </div>
      )}

      {/* Report */}
      <div id="report-section" className="report">
        <h2>Patient Report</h2>
        <p>
          <strong>Patient ID:</strong> {report.patientId}
        </p>
        <h3>Findings:</h3>
        <ul>
          {report.findings.map((f, i) => (
            <li key={i}>
              {f.issue}: {f.count}
            </li>
          ))}
        </ul>

        <div id="chart"></div>
      </div>

      {/* Export Button */}
      <button onClick={generatePDF}>Export Report as PDF</button>
    </div>
  );
}
