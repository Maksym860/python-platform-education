import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api.js';
import LessonListItem from '../components/LessonListItem.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function ModulePage() {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    api
      .getModule(moduleId)
      .then((data) => {
        if (!cancelled) {
          setModule(data);
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
  }, [moduleId]);

  if (status === 'loading') return <Loader label="Завантажуємо модуль…" />;
  if (status === 'error') return <ErrorState message={error} />;
  if (!module) return null;

  return (
    <div className="module-page container">
      <Link to="/modules" className="back-link">
        ← Усі модулі
      </Link>

      <header className="module-page__header">
        <div className="module-page__icon">{module.icon}</div>
        <div>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
        </div>
      </header>

      <section className="module-page__lessons">
        <h2 className="section-title section-title--compact">Уроки модуля</h2>
        <div className="lesson-list">
          {module.lessons.map((lesson, idx) => (
            <LessonListItem key={lesson._id} lesson={lesson} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
