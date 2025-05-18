import { useQuiz } from "../QuizContext";
import questions from "../data/questions.json";

export default function ReviewScreen() {
  const {
    userAnswers,
    setQuizStarted,
    setReviewMode,
    score,
    numQuestions,
  } = useQuiz();

  const filteredQuestions = questions
    .filter(q => Object.keys(userAnswers).includes(String(q.id)))
    .slice(0, numQuestions);

  const percentage = ((score / filteredQuestions.length) * 100).toFixed(0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        You got {score} out of {filteredQuestions.length} correct ({percentage}%)
      </h2>

      {filteredQuestions.map((q) => {
        const user = userAnswers[q.id] || [];
        const isCorrect =
          JSON.stringify(q.answer.sort()) === JSON.stringify(user.sort());

        return (
          <div
            key={q.id}
            className={`border p-4 my-4 rounded ${
              isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{q.question}</h3>
              <span className="text-xs font-medium bg-black text-white px-2 py-1 rounded-full">{q.domain}</span>
            </div>
            <div className="mt-2 text-sm">
              <p className="mb-1">
                <strong>Your answer:</strong> {user.join(", ") || "No answer"}
              </p>
              {!isCorrect && (
                <p>
                  <strong>Correct answer:</strong> {q.answer.join(", ")}
                </p>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            setReviewMode(false);
            setQuizStarted(false);
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
