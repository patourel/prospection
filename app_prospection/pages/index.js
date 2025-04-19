import { useState } from 'react';
import Papa from 'papaparse';

export default function Home() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
        setColumns(Object.keys(results.data[0] || {}));
      },
    });
  };

  return (
    <div>
      <h1>Import CSV - Prospection</h1>

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {csvData.length > 0 && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
// JavaScript Document