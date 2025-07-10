import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgentForm from "./components/AgentForm";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import TrainingGuide from "./pages/TrainingGuide";
import LoginPage from "./pages/LoginPage";
import ResultsPage from "./pages/ResultsPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/training" element={<TrainingGuide />} />
        <Route path="/" element={<AgentForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<LoginPage />} />
<Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
