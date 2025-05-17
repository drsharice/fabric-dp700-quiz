import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        quizStarted,
        setQuizStarted,
        selectedDomains,
        setSelectedDomains,
        numQuestions,
        setNumQuestions,
        score,
        setScore,
        userAnswers,
        setUserAnswers,
        reviewMode,
        setReviewMode,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
