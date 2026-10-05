import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

const HERO_LINES = [
  { text: 'name = input("Як тебе звати? ")', delay: 0 },
  { text: 'print(f"Привіт, {name}! Починаємо вчити Python 🐍")', delay: 900 },
  { text: '', delay: 1700 },
  { text: 'streak = 1', delay: 1900 },
  { text: 'if streak > 0:', delay: 2500 },
  { text: '    print("Ти на правильному шляху")', delay: 3100 }
];

export default function HomePage() {
  const [modules, setModules] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api
      .getModules()
      .then((data) => {
        if (!cancelled) {
          setModules(data.slice(0, 3));
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

  useEffect(() => {
    const timers = HERO_LINES.map((line, idx) =>
      setTimeout(() => setVisibleLines(idx + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Курс для учнів 7–8 класів</p>
          <h1 className="hero__title">
            Зроби перший крок у програмуванні мовою Python
          </h1>
          <p className="hero__subtitle">
            Теорія маленькими кроками, живі приклади коду та тести після кожного уроку.
            Жодних складних термінів на старті — лише зрозумілі пояснення й практика.
          </p>
          <div className="hero__actions">
            <Link to="/modules" className="btn btn--primary">
              Почати навчання
            </Link>
            <a href="#how-it-works" className="btn btn--ghost">
              Як влаштовано курс
            </a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>3</dt>
              <dd>навчальні модулі</dd>
            </div>
            <div>
              <dt>7</dt>
              <dd>інтерактивних уроків</dd>
            </div>
            <div>
              <dt>7</dt>
              <dd>тестів для самоперевірки</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <div className="code-block code-block--hero">
            <div className="code-block__chrome">
              <span className="code-block__dot code-block__dot--red" />
              <span className="code-block__dot code-block__dot--yellow" />
              <span className="code-block__dot code-block__dot--green" />
              <span className="code-block__caption">first_steps.py</span>
            </div>
            <pre className="code-block__body code-block__body--hero">
              <code>
                {HERO_LINES.slice(0, visibleLines).map((line, idx) => (
                  <span key={idx} className="hero-line">
                    {line.text || '\u00A0'}
                    {'\n'}
                  </span>
                ))}
                <span className="hero-cursor" aria-hidden="true">▍</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">Як влаштовано навчання</h2>
        <div className="how-it-works__grid">
          <div className="how-card">
            <span className="how-card__mark">Крок 1</span>
            <h3>Читаєш теорію</h3>
            <p>Коротке пояснення теми з реальними прикладами коду й очікуваним виводом програми.</p>
          </div>
          <div className="how-card">
            <span className="how-card__mark">Крок 2</span>
            <h3>Розбираєш приклади</h3>
            <p>Дивишся, як виглядає код у редакторі, і що відбувається під час його виконання.</p>
          </div>
          <div className="how-card">
            <span className="how-card__mark">Крок 3</span>
            <h3>Проходиш тест</h3>
            <p>Перевіряєш себе коротким тестом одразу після уроку та бачиш детальний розбір відповідей.</p>
          </div>
        </div>
      </section>

      <section className="modules-preview">
        <div className="modules-preview__header">
          <h2 className="section-title">Модулі курсу</h2>
          <Link to="/modules" className="link-more">
            Усі модулі →
          </Link>
        </div>

        {status === 'loading' && <Loader label="Завантажуємо модулі курсу…" />}
        {status === 'error' && <ErrorState message={error} />}
        {status === 'ready' && (
          <div className="modules-preview__list">
            {modules.map((module) => (
              <Link key={module._id} to={`/modules/${module._id}`} className="module-pill">
                <span className="module-pill__icon">{module.icon}</span>
                <span className="module-pill__title">{module.title}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
