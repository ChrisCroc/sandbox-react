import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVans() {

  const [hostVans, setHostVans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadHostVans() {
      setLoading(true)
      try {
        const data = await getHostVans()
        setHostVans(data)
      } catch (err) {
          setError(err)
      } finally {
          setLoading(false)
      }
    }
    loadHostVans()
  }, [])

  const hostElements = hostVans.map(van => (
    <Link
      to={`/host/vans/${van.id}`}
      key={van.id}
      className="host-van-link-wrapper"
    >
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}<span>/day</span></p>
        </div>
      </div>
    </Link>
  ))

  if (loading) {
      return <h1>Loading...</h1>
  }

  if (error) {
      return <h1>There was an error: {error.message}</h1>
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {
          hostVans.length > 0 ? (
            <section>
              {hostElements}
            </section>
            ) : (
                  <h2>Loading...</h2>
                )
        }
      </div>
    </section>
  )
}
