import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import jsPDF from "jspdf";

const App = () => {
  const [image, setImage] = useState("/sample-xray.jpg"); // fallback sample
  const [issues] = useState([
    { type: "Cavity", count: 2 },
    { type: "Alignment Issue", count: 1 },
    { type: "Other", count: 1 },
  ]);
  const chartRef = useRef(null);

  // handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // draw chart with D3
  useEffect(() => {
    if (chartRef.current) {
      d3.select(chartRef.current).selectAll("*").remove();
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", 300)
        .attr("height", 200);

      const x = d3
        .scaleBand()
        .domain(issues.map((d) => d.type))
        .range([0, 300])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(issues, (d) => d.count)])
        .nice()
        .range([200, 0]);

      svg
        .selectAll("rect")
        .data(issues)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.type))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => 200 - y(d.count))
        .attr("fill", "#007bff");

      svg
        .append("g")
        .attr("transform", "translate(0,200)")
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));
    }
  }, [issues]);

  // export report to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Report", 10, 10);
    doc.text(`Patient ID: P-${Math.floor(Math.random() * 1000)}`, 10, 20);
    doc.text("Findings:", 10, 30);
    issues.forEach((issue, i) => {
      doc.text(`${i + 1}. ${issue.type}: ${issue.count}`, 10, 40 + i * 10);
    });
    doc.save("report.pdf");
  };

  return (
    <div className="container">
      <h1>Dental Imaging Analysis</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />

      <div>
        <img src={image} alt="Dental X-ray" />
        {/* Example highlights */}
        <svg
          style={{ position: "absolute", top: 200, left: 200 }}
          width="400"
          height="300"
        >
          <circle
            cx="100"
            cy="80"
            r="30"
            stroke="red"
            strokeWidth="3"
            fill="none"
          />
          <rect
            x="200"
            y="150"
            width="60"
            height="40"
            stroke="orange"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      <div className="report">
        <h2>Patient Report</h2>
        <p>Patient ID: P-123</p>
        <ul>
          {issues.map((issue, i) => (
            <li key={i}>
              {issue.type}: {issue.count}
            </li>
          ))}
        </ul>
      </div>

      <div ref={chartRef}></div>

      <button onClick={exportPDF}>Export Report as PDF</button>
    </div>
  );
};
