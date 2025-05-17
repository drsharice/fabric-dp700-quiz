import { useQuiz } from "../QuizContext";
import questions from "../data/questions.json";

export default function ReviewScreen() {
  const {
    userAnswers,
    selectedDomains,
    numQuestions,
    setQuizStarted,
    setUserAnswers,
    setScore,
    score
  } = useQuiz();

  const filteredQuestions = questions
    .filter((q) => selectedDomains.length === 0 || selectedDomains.includes(q.domain))
    .slice(0, numQuestions);

  const handleRestart = () => {
    setUserAnswers({});
    setScore(0);
    setQuizStarted(false);
  };

  const isCorrect = (q) => {
    const userAns = userAnswers[q.id] || [];
    return JSON.stringify(userAns.sort()) === JSON.stringify(q.answer.sort());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Your Answers</h2>
      <p className="mb-4 text-lg">You scored {score} out of {filteredQuestions.length}</p>
      {filteredQuestions.map((q, idx) => (
        <div key={q.id} className={`mb-6 p-4 border-l-4 rounded shadow ${isCorrect(q) ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <h3 className="font-semibold">{idx + 1}. {q.question}</h3>
          <p className="text-sm mt-2">Domain: <span className="font-medium">{q.domain}</span></p>
          <div className="mt-2">
            <p className="font-medium">Your Answer:</p>
            <ul className="list-disc ml-6">
              {(userAnswers[q.id] || []).map((ans, i) => (
                <li key={i}>{ans}</li>
              ))}
            </ul>
            <p className="mt-2 font-medium">Correct Answer:</p>
            <ul className="list-disc ml-6">
              {q.answer.map((ans, i) => (
                <li key={i}>{ans}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="text-center mt-6">
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
