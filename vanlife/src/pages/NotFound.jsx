import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Sorry, the page you are looking for does not exist.</h1>
      <Link to="/" className="link-button">Go back to Home</Link>
    </div>
  )
}
