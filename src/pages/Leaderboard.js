import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const q = query(collection(db, "quizResults"), orderBy("score", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setResults(data);
    };

    fetchResults();
  }, []);

  const getBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🏆 Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Agent</th>
              <th>Call Center</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, idx) => (
              <tr
                key={idx}
                className={idx === 0 ? "table-warning" : idx === 1 ? "table-info" : idx === 2 ? "table-light" : ""}
              >
                <td>{getBadge(idx)}</td>
                <td>{res.agentName}</td>
                <td>{res.callCenter}</td>
                <td>
                  {res.timestamp?.seconds
                    ? new Date(res.timestamp.seconds * 1000).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{res.score} / {res.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
