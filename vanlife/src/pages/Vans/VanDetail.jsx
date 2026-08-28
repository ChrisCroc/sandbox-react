import React from "react"
import { useParams, Link } from "react-router-dom"

export default function VanDetail() {

  const params = useParams()
  const [van, setVan] = React.useState(null)

  React.useEffect(() => {

    let ignore = false
    fetch(`/api/vans/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setVan(data.vans)
        }
      })

    return () => { ignore = true }
  }, [params.id])

  return (
    <section>
      <Link
        to=".."
        relative="path"
        className="back-button"
      >&larr; <span>Back to all vans</span></Link>
      <div className="van-detail-container">
        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} alt={`photo of ${van.name}`} />
            <i className={`van-type ${van.type} selected`}>
              {van.type}
            </i>
            <h2>{van.name}</h2>
            <p className="van-price">${van.price}<span>/day</span></p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
          </div>
        ) : <h2>Loading...</h2>}
      </div>
    </section>
  )
}
