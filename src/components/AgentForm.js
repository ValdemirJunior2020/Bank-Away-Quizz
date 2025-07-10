// src/components/AgentForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AgentForm = () => {
  const [callCenter, setCallCenter] = useState("");
  const [agentName, setAgentName] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();

    if (!callCenter || !agentName || !date) {
      alert("Please complete all fields.");
      return;
    }

    const sessionId = uuidv4(); // Unique session ID for each quiz attempt

    // Pass data through route
    navigate("/quiz", {
      state: {
        callCenter,
        agentName,
        date,
        sessionId,
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Start Training Quiz</h2>
      <form onSubmit={handleStart} className="border p-4 rounded bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Call Center</label>
          <select
            className="form-select"
            value={callCenter}
            onChange={(e) => setCallCenter(e.target.value)}
          >
            <option value="">Select Call Center</option>
            <option value="TEP">TEP</option>
            <option value="Buwelo">Buwelo</option>
            <option value="WNS">WNS</option>
            <option value="Concentrix">Concentrix</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Agent Name</label>
          <input
            type="text"
            className="form-control"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Enter agent name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default AgentForm;
