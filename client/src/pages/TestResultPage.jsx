import { Link, useLocation, useParams } from 'react-router-dom';

export default function TestResultPage() {
  const { lessonId } = useParams();
  const location = useLocation();
  const state = location.state;

  if (!state?.result) {
    return (
      <div className="container result-page">
        <p>Результат тесту не знайдено.</p>
        <Link to={`/lessons/${lessonId}/test`} className="btn btn--primary">
          Пройти тест ще раз
        </Link>
      </div>
    );
  }

  const { result, testTitle } = state;
  const scoreClass =
    result.scorePercent >= 80 ? 'score--great' : result.scorePercent >= 50 ? 'score--ok' : 'score--retry';

  return (
    <div className="result-page container">
      <div className={`result-page__score ${scoreClass}`}>
        <span className="result-page__score-number">{result.scorePercent}%</span>
        <span className="result-page__score-label">
          {result.correct} з {result.total} правильних відповідей
        </span>
      </div>

      <h1 className="result-page__title">{testTitle}</h1>

      <div className="result-page__list">
        {result.results.map((item, idx) => (
          <div key={idx} className={`result-item ${item.isCorrect ? 'result-item--correct' : 'result-item--wrong'}`}>
            <span className="result-item__badge" aria-hidden="true">
              {item.isCorrect ? '✓' : '✕'}
            </span>
            <div>
              <p className="result-item__question">{item.question}</p>
              <p className="result-item__explanation">{item.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="result-page__actions">
        <Link to={`/lessons/${lessonId}/test`} className="btn btn--ghost">
          Пройти тест ще раз
        </Link>
        <Link to="/modules" className="btn btn--primary">
          До каталогу модулів
        </Link>
      </div>
    </div>
  );
}
