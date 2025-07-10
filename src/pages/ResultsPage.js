import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { CSVLink } from "react-csv";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email === "valdemir.goncalves@hotelplanner.com") {
        setUserAuthorized(true);
        fetchResults();
      } else {
        alert("Access Denied");
        window.location.href = "/";
      }
    });
    return () => unsub();
  }, []);

  const fetchResults = async () => {
    const q = query(collection(db, "quizResults"), orderBy("score", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setResults(data);
  };

  const filteredResults = results.filter(res => {
    const matchesCenter = selectedCenter === "All" || res.callCenter === selectedCenter;
    const matchesSearch = res.agentName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCenter && matchesSearch;
  });

  const formattedResults = filteredResults.map(res => ({
    Agent: res.agentName,
    "Call Center": res.callCenter,
    Date: res.timestamp?.seconds
      ? format(new Date(res.timestamp.seconds * 1000), "yyyy-MM-dd")
      : "N/A",
    Score: `${res.score} / ${res.total}`,
  }));

  const callCenters = ["All", "TEP", "Buwelo", "WNS", "Concentrix"];

  const handleExcelDownload = () => {
    const ws = XLSX.utils.json_to_sheet(formattedResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "QA_Quiz_Results.xlsx");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 QA Quiz Results</h2>

      {userAuthorized && results.length > 0 && (
        <>
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-3">
            <div>
              <label className="form-label">Filter by Call Center:</label>
              <select
                className="form-select"
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
              >
                {callCenters.map(center => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Search by Agent:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter agent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="btn-group mt-3 mt-md-0">
              <CSVLink
                data={formattedResults}
                filename={"QA_Quiz_Results.csv"}
                className="btn btn-success"
              >
                Download CSV
              </CSVLink>
              <button className="btn btn-outline-primary" onClick={handleExcelDownload}>
                Download Excel (.xlsx)
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered shadow">
            <thead className="table-dark">
              <tr>
                <th>Agent</th>
                <th>Call Center</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {formattedResults.map((res, idx) => (
                <tr key={idx}>
                  <td>{res.Agent}</td>
                  <td>{res["Call Center"]}</td>
                  <td>{res.Date}</td>
                  <td>{res.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
