export default function Loader({ label = 'Завантаження…' }) {
  return (
    <div className="loader">
      <div className="loader__spinner" aria-hidden="true" />
      <p className="loader__label">{label}</p>
    </div>
  );
}
