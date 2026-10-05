export default function ProgressDots({ total, current }) {
  return (
    <div className="progress-dots" role="list" aria-label="Прогрес уроків у модулі">
      {Array.from({ length: total }).map((_, idx) => (
        <span
          key={idx}
          role="listitem"
          className={`progress-dots__dot ${idx === current ? 'progress-dots__dot--active' : ''} ${
            idx < current ? 'progress-dots__dot--done' : ''
          }`}
        />
      ))}
    </div>
  );
}
