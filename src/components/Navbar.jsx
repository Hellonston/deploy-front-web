import "./Navbar.css"
import LogoutButton from '../profile/Logout'
export default function Navbar() {
    return <nav className="nav">
      <ul>
        <li>
            <a href="/iniciar_sesion">Iniciar sesión</a>
          </li>
          <li>
            <a href="/signup">Registrarse</a>
          </li>
          <li>
            <a href="/board">Nueva partida</a>
          </li>
          <li>
            <a href="/leaderboards">Leaderboards</a>
          </li>
          <li>
            <a href="/about_us">Sobre nosotros</a>
          </li>
          <li>
            <a href="/reglas">Como se juega</a>
          </li>
          <LogoutButton></LogoutButton>
      </ul>
      <a href="/" className="site-title">Empires Ascendant</a>
    </nav>
  }