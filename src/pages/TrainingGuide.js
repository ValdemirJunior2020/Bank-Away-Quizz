import React from "react";

const TrainingGuide = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧠 Training Guide: Don’t Give the Bank Away</h2>

      <div className="card p-4 shadow-sm">
        <h4>✅ What Agents Should Say</h4>
        <ul>
          <li>“I’ll be happy to check on that for you.”</li>
          <li>“I’ll open a ticket for our team to review your case.”</li>
          <li>“While I can’t promise a refund, we’ll definitely have this reviewed.”</li>
        </ul>
      </div>

      <div className="card p-4 mt-4 shadow-sm bg-light">
        <h4>❌ What Agents Should Never Say</h4>
        <ul>
          <li>“I’ll get you a full refund.”</li>
          <li>“The hotel agreed, I’ll take care of it.”</li>
          <li>“You’re totally right, we’ll fix this.”</li>
        </ul>
      </div>

      <div className="card p-4 mt-4 shadow-sm">
        <h4>🎯 Golden Rule</h4>
        <p>
          Always explain the **policy**, show **empathy**, and **escalate when needed** — but **never promise** refunds or take ownership of the hotel's decisions.
        </p>
      </div>

      <div className="card p-4 mt-4 shadow-sm bg-success text-white">
        <h4>🌟 Ideal Script Example</h4>
        <p>
          “I do see there’s a policy that applies a fee for cancellations. I completely understand your frustration,
          so what I’ll do is open a case for our escalation team to review everything and follow up with you by email.
          While I can’t promise the outcome, they’ll make sure it’s looked at fairly.”
        </p>
      </div>
    </div>
  );
};

export default TrainingGuide;
