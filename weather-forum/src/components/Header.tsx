import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="logo">Погодный форум</h1>
        <nav className="nav">
          <Link to="/" className="nav-btn">Форум</Link>
          <Link to="/weather" className="nav-btn">Погода</Link>
        </nav>
      </div>
    </header>
  );
}