import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container not-found">
      <p className="hero__eyebrow">Помилка 404</p>
      <h1>Такої сторінки немає</h1>
      <p>Можливо, посилання застаріле. Повернись до каталогу модулів і продовж навчання.</p>
      <Link to="/modules" className="btn btn--primary">
        До каталогу модулів
      </Link>
    </div>
  );
}
