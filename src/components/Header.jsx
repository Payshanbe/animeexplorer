import { Link, NavLink } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'
import ThemeToggle from './ThemeToggle.jsx'

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}>
      {children}
    </NavLink>
  )
}

export default function Header() {
  const { favorites } = useFavorites()

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          StreamScope
        </Link>
        <nav className="nav">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/search">Search</NavItem>
          <NavItem to="/favorites">Favorites ({favorites.length})</NavItem>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
