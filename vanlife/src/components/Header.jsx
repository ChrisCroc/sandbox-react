import { NavLink, Link } from "react-router-dom"

export default function Header() {


  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#720026"
  }

  return (
    <header>
      <Link className="site-logo" to="/">#VANLIFE</Link>
      <nav>
        <NavLink
          to="/host"
          style={({isActive}) => isActive ? activeStyle : null}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          style={({isActive}) => isActive ? activeStyle : null}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({isActive}) => isActive ? activeStyle : null}
        >
          Vans
        </NavLink>
      </nav>
    </header>
  )
}
