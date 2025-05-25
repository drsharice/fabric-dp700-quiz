import { useState } from 'react';
import { QuizProvider, useQuiz } from './QuizContext';
import DomainSelector from './components/DomainSelector';
import questions from './data/questions.json';
import ReviewScreen from './components/ReviewScreen';

function QuizScreen() {
  const { selectedDomains, numQuestions, setScore, setQuizStarted, setReviewMode, setUserAnswers } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, updateUserAnswers] = useState({});

  const filteredQuestions = questions
    .filter(q => selectedDomains.length === 0 || selectedDomains.includes(q.domain))
    .slice(0, numQuestions);

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>No questions found for the selected domain(s).</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setQuizStarted(false)}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const current = filteredQuestions[currentIndex];

  const domainColors = {
    "Lakehouse": "bg-blue-100 border-blue-500",
    "Apache Spark": "bg-orange-100 border-orange-500",
    "Delta Lake": "bg-green-100 border-green-500",
    "Medallion": "bg-purple-100 border-purple-500",
    "Prepare the Data": "bg-yellow-100 border-yellow-500",
    "Model the Data": "bg-indigo-100 border-indigo-500",
    "Visualize the Data": "bg-pink-100 border-pink-500",
    "Analyze the Data": "bg-teal-100 border-teal-500",
    "Deploy and Maintain Assets": "bg-gray-100 border-gray-500",
    "Data Movement": "bg-amber-100 border-amber-500",
    "Data Warehouse": "bg-lime-100 border-lime-500",
    "Load Data": "bg-cyan-100 border-cyan-500",
    "Monitor": "bg-red-100 border-red-500",
    "CI/CD": "bg-stone-100 border-stone-500",
    "Secure data Access": "bg-emerald-100 border-emerald-500",
    "DataFlows": "bg-violet-100 border-violet-500",
    "Real-Time Intelligence": "bg-fuchsia-100 border-fuchsia-500",
    "Real-Time Eventstream": "bg-rose-100 border-rose-500",
    "Eventhouse": "bg-sky-100 border-sky-500",
    default: "bg-white border-gray-400"
  };

  const colorClass = domainColors[current.domain] || domainColors.default;

  const handleAnswer = (qid, value) => {
    updateUserAnswers({ ...userAnswers, [qid]: value });
  };

  const handleSubmit = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      const ans = userAnswers[q.id] || [];
      const right = JSON.stringify(q.answer.sort()) === JSON.stringify(ans.sort());
      if (right) correct++;
    });
    setScore(correct);
    setUserAnswers(userAnswers);
    setReviewMode(true);
  };

  return (
    <div className={`p-6 m-6 border-2 rounded-xl shadow-md ${colorClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Question {currentIndex + 1} of {filteredQuestions.length}: {current.question}
        </h2>
        <span className="text-xs font-semibold px-2 py-1 bg-black text-white rounded-full">
          {current.domain}
        </span>
      </div>
      <div className="space-y-2 mb-6">
        {current.options.map(opt => (
          <label key={opt} className="block">
            <input
              type={current.type}
              name={`q-${current.id}`}
              value={opt}
              className="mr-2"
              onChange={(e) => {
                const val = e.target.value;
                const prev = userAnswers[current.id] || [];
                const updated = current.type === "checkbox"
                  ? e.target.checked ? [...prev, val] : prev.filter(v => v !== val)
                  : [val];
                handleAnswer(current.id, updated);
              }}
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex justify-between">
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(i => i - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {currentIndex < filteredQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(i => i + 1)}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          className="text-sm text-blue-600 underline hover:text-blue-800"
          onClick={() => setQuizStarted(false)}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

function StartScreen() {
  const { selectedDomains, numQuestions, setNumQuestions, setQuizStarted } = useQuiz();

  const availableQuestions = questions.filter(q =>
    selectedDomains.length === 0 || selectedDomains.includes(q.domain)
  ).length;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <DomainSelector />
      <div className="mt-4">
        <label className="block mb-2 font-semibold">
          Number of Questions (max {availableQuestions}):
        </label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          min="1"
          max={availableQuestions}
          className="border p-2 rounded w-24"
        />
      </div>
      <button
        onClick={() => setQuizStarted(true)}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
}

function App() {
  const { quizStarted, reviewMode } = useQuiz();
  if (reviewMode) return <ReviewScreen />;
  return <div className="App font-sans">{quizStarted ? <QuizScreen /> : <StartScreen />}</div>;
}

export default function WrappedApp() {
  return (
    <QuizProvider>
      <App />
    </QuizProvider>
  );
}
