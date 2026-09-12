import { Outlet, Navigate, useLocation } from 'react-router-dom'

export default function AuthRequired() {

  const isLoggedin = localStorage.getItem("loggedin")
  const location = useLocation()

  if (!isLoggedin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "You must log in first",
          from: location.pathname
        }} />
    )
  }
  return <Outlet />
}
