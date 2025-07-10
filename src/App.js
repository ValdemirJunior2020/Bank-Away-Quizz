import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgentForm from "./components/AgentForm";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import TrainingGuide from "./pages/TrainingGuide";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/training" element={<TrainingGuide />} />
        <Route path="/" element={<AgentForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
