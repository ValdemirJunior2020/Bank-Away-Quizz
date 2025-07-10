import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";
import confetti from "canvas-confetti";

const questions = [
{
  question: "The guest says, 'Where is my refund? I’m still waiting.' The policy is NON-REFUNDABLE. What should the agent say?",
  options: [
    "I'll request a full refund for you.",
    "I'll open a case so our escalation team can review your situation.",
    "You're right, this is taking too long. I'll get it refunded."
  ],
  answer: "I'll open a case so our escalation team can review your situation.",
  explanation: "If the policy is non-refundable, agents should not promise a refund. Only escalate it without assuming the outcome."
},
{
  question: "The guest canceled a reservation that had a FREE CANCELLATION policy. What can the agent say?",
  options: [
    "I'll request a full refund from our escalation team.",
    "That’s non-refundable, sorry.",
    "There’s nothing we can do."
  ],
  answer: "I'll request a full refund from our escalation team.",
  explanation: "If the policy allows full refund, it’s acceptable to request one through escalation — but the agent still shouldn't guarantee it."
},
{
  question: "The guest is angry. The policy is NON-REFUNDABLE. What should the agent avoid saying?",
  options: [
    "I’ll open a ticket and have the case reviewed.",
    "I’ll request a full refund.",
    "Let me explain the cancellation policy to you."
  ],
  answer: "I’ll request a full refund.",
  explanation: "This gives false hope when the policy doesn't allow refunds. Agents should explain and escalate only."
},
{
  question: "The guest says, 'I canceled within the free period and still didn’t get money back.' What’s the best agent response?",
  options: [
    "I’ll open a ticket for review since it was within the free cancellation window.",
    "You're totally right, I'll refund it myself.",
    "That’s not my problem."
  ],
  answer: "I’ll open a ticket for review since it was within the free cancellation window.",
  explanation: "If within policy, escalate and note that. But still, don't promise the refund yourself."
},
{
  question: "When can an agent say 'I’ll request a full refund'?",
  options: [
    "When the policy clearly allows a free cancellation.",
    "Whenever the guest is angry.",
    "Always, just in case."
  ],
  answer: "When the policy clearly allows a free cancellation.",
  explanation: "It’s only appropriate when the policy supports it. Otherwise, escalate without promises."
},
{
  question: "A guest calls upset. The agent sees ‘Non-Refundable’ on the booking. What should the agent say?",
  options: [
    "Let me get you a full refund.",
    "I’ll open a case to be reviewed, but the policy is non-refundable.",
    "That’s not my problem."
  ],
  answer: "I’ll open a case to be reviewed, but the policy is non-refundable.",
  explanation: "You’re being transparent but not giving away the bank. That’s the correct balance."
},
{
  question: "The guest insists they were promised a refund earlier. The agent sees it was non-refundable. What’s the correct response?",
  options: [
    "I'll issue it right now.",
    "I understand the confusion. I’ll open a case to have this reviewed.",
    "Okay, let me just process the refund."
  ],
  answer: "I understand the confusion. I’ll open a case to have this reviewed.",
  explanation: "Always show empathy, but never promise or issue anything outside policy."
},
{
  question: "The agent sees the policy was refundable, but past the cancellation window. What’s the correct response?",
  options: [
    "I'll request a full refund for you.",
    "The window has passed, but I’ll escalate it for review.",
    "It’s refundable no matter what."
  ],
  answer: "The window has passed, but I’ll escalate it for review.",
  explanation: "You're acknowledging the guest’s concern while still protecting the company from false promises."
},
{
  question: "The guest says: 'I just want my money back, I was told I could cancel!' The policy says non-refundable. What do you do?",
  options: [
    "Blame the hotel.",
    "Apologize and say you'll try to get a refund.",
    "Acknowledge their concern, explain the policy, and escalate the case."
  ],
  answer: "Acknowledge their concern, explain the policy, and escalate the case.",
  explanation: "Be empathetic but do not give false promises. Escalation is the correct step."
},
{
  question: "The guest is calm but confused about a charge. The booking is non-refundable. What should the agent do?",
  options: [
    "Explain the policy clearly and offer to escalate for review.",
    "Just refund to avoid conflict.",
    "Say nothing and hang up."
  ],
  answer: "Explain the policy clearly and offer to escalate for review.",
  explanation: "Even when calm, the same rules apply. Policy, empathy, and escalation — no promises."
}

];

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (option) => {
    if (selected) return; // Prevent double clicking

    const isCorrect = option === questions[currentQ].answer;
    setSelected(option);
    setShowExplanation(true);

    if (isCorrect) {
      new Audio(correctSound).play();
      confetti();
      setScore((prev) => prev + 1);
    } else {
      new Audio(wrongSound).play();
    }

    // Wait and move to next question
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ((prev) => prev + 1);
        setSelected(null);
        setShowExplanation(false);
      } else {
        saveResult();
        setFinished(true);
      }
    }, 8000);
  };

  const saveResult = async () => {
    await addDoc(collection(db, "quizResults"), {
      agentName: state.agentName,
      callCenter: state.callCenter,
      date: state.date,
      score,
      total: questions.length,
      timestamp: new Date(),
    });
  };

  if (!state) return <div className="container mt-5">Invalid access</div>;

  const current = questions[currentQ];

  return (
    <div className="container mt-5">
      {!finished ? (
        <div className="card p-4 shadow">
          <h4 className="mb-3">Question {currentQ + 1} of {questions.length}</h4>
          <h5>{current.question}</h5>
          {current.options.map((option, i) => (
            <button
              key={i}
              className={`btn w-100 my-2 ${
                selected
                  ? option === current.answer
                    ? "btn-success"
                    : option === selected
                    ? "btn-danger"
                    : "btn-outline-secondary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
            >
              {option}
            </button>
          ))}

          {showExplanation && (
            <div className="alert alert-info mt-3">
              <strong>Why?</strong> {current.explanation}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2>🎉 Quiz Complete!</h2>
          <p>
            <strong>{state.agentName}</strong> from <strong>{state.callCenter}</strong><br />
            Score: <strong>{score} / {questions.length}</strong>
          </p>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
