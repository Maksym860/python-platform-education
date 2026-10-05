import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-mark">Py</span>
          <span className="navbar__brand-text">PyPath</span>
        </NavLink>
        <nav className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Головна
          </NavLink>
          <NavLink to="/modules" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Модулі курсу
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
