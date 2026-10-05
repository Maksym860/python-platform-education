export default function ErrorState({ message }) {
  return (
    <div className="error-state">
      <p className="error-state__title">Щось пішло не так</p>
      <p className="error-state__message">{message}</p>
      <p className="error-state__hint">
        Перевірте, що backend-сервер запущено (npm run dev у теці server) і базу даних заповнено (npm run seed).
      </p>
    </div>
  );
}
