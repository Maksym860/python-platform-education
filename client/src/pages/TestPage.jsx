import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api.js';
import TestQuestion from '../components/TestQuestion.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function TestPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .getLessonTest(lessonId)
      .then((data) => {
        if (!cancelled) {
          setTest(data);
          setAnswers(Array(data.questions.length).fill(null));
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const handleSelect = (questionIdx, optionIdx) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIdx] = optionIdx;
      return next;
    });
  };

  const allAnswered = answers.length > 0 && answers.every((a) => a !== null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitting(true);
    try {
      const result = await api.submitLessonTest(lessonId, answers);
      navigate(`/lessons/${lessonId}/result`, { state: { result, testTitle: test.title } });
    } catch (err) {
      setError(err.message);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') return <Loader label="Готуємо тест…" />;
  if (status === 'error') return <ErrorState message={error} />;
  if (!test) return null;

  return (
    <div className="test-page container">
      <Link to={`/lessons/${lessonId}`} className="back-link">
        ← Повернутись до уроку
      </Link>

      <header className="test-page__header">
        <h1>{test.title}</h1>
        <p>Дай відповідь на всі питання, щоб побачити результат і пояснення.</p>
      </header>

      <form className="test-page__form" onSubmit={handleSubmit}>
        {test.questions.map((question, idx) => (
          <TestQuestion
            key={idx}
            question={question}
            index={idx}
            selectedIndex={answers[idx]}
            onSelect={handleSelect}
          />
        ))}

        <button type="submit" className="btn btn--primary btn--wide" disabled={!allAnswered || submitting}>
          {submitting ? 'Перевіряємо…' : 'Перевірити відповіді'}
        </button>
      </form>
    </div>
  );
}
