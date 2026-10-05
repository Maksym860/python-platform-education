import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api.js';
import TheoryBlock from '../components/TheoryBlock.jsx';
import PracticeBlock from '../components/PracticeBlock.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    api
      .getLesson(lessonId)
      .then((data) => {
        if (!cancelled) {
          setLesson(data);
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

  if (status === 'loading') return <Loader label="Завантажуємо урок…" />;
  if (status === 'error') return <ErrorState message={error} />;
  if (!lesson) return null;

  return (
    <div className="lesson-page container">
      {lesson.module && (
        <Link to={`/modules/${lesson.module._id}`} className="back-link">
          ← {lesson.module.title}
        </Link>
      )}

      <header className="lesson-page__header">
        <p className="hero__eyebrow">{lesson.estimatedMinutes} хв читання</p>
        <h1>{lesson.title}</h1>
        {lesson.description && <p className="lesson-page__description">{lesson.description}</p>}
      </header>

      <div className="lesson-page__theory">
        <p className="lesson-section-label">Теорія</p>
        {lesson.theory.map((block) => (
          <TheoryBlock key={block.heading} block={block} />
        ))}
      </div>

      <PracticeBlock practice={lesson.practice} />

      <footer className="lesson-page__footer">
        {lesson.hasTest ? (
          <Link to={`/lessons/${lesson._id}/test`} className="btn btn--primary">
            Пройти тест до уроку →
          </Link>
        ) : (
          <Link to={`/modules/${lesson.module?._id}`} className="btn btn--ghost">
            Повернутись до модуля
          </Link>
        )}
      </footer>
    </div>
  );
}
