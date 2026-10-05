import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import ModuleCard from '../components/ModuleCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function ModulesCatalogPage() {
  const [modules, setModules] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    api
      .getModules()
      .then((data) => {
        if (!cancelled) {
          setModules(data);
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
  }, []);

  return (
    <div className="catalog-page container">
      <header className="catalog-page__header">
        <p className="hero__eyebrow">Каталог модулів</p>
        <h1>Обери модуль і рухайся своїм темпом</h1>
        <p className="catalog-page__subtitle">
          Модулі розташовані в рекомендованому порядку — від перших кроків у Python до умовних операторів.
        </p>
      </header>

      {status === 'loading' && <Loader label="Завантажуємо каталог модулів…" />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'ready' && (
        <div className="catalog-page__grid">
          {modules.map((module, idx) => (
            <ModuleCard key={module._id} module={module} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
