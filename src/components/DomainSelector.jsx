// src/components/DomainSelector.jsx
import { useQuiz } from '../QuizContext';
import questions from '../data/questions.json';

export default function DomainSelector() {
  const { selectedDomains, setSelectedDomains } = useQuiz();

  // 🔧 Extract unique domains from the question file
  const domains = [...new Set(questions.map(q => q.domain))].sort();

  const toggleDomain = (domain) => {
    setSelectedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2">Select Domains:</h3>
      <div className="flex flex-wrap gap-4">
        {domains.map(domain => (
          <label key={domain} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDomains.includes(domain)}
              onChange={() => toggleDomain(domain)}
            />
            <span>{domain}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
