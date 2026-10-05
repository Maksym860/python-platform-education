import { Link } from 'react-router-dom';

export default function ModuleCard({ module, index }) {
  return (
    <Link to={`/modules/${module._id}`} className="module-card">
      <div className="module-card__index">{String(index + 1).padStart(2, '0')}</div>
      <div className="module-card__icon" aria-hidden="true">
        {module.icon}
      </div>
      <div className="module-card__body">
        <h3 className="module-card__title">{module.title}</h3>
        <p className="module-card__description">{module.description}</p>
      </div>
      <div className="module-card__meta">
        <span>{module.lessonsCount ?? 0} {pluralizeLessons(module.lessonsCount ?? 0)}</span>
        <span className="module-card__arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

function pluralizeLessons(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'урок';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'уроки';
  return 'уроків';
}
