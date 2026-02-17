import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'
import { getImageUrl } from '../services/jikanApi.js'
import Button from './Button.jsx'

function formatDate(date) {
  if (!date) return 'Unknown date'
  return new Date(date).toLocaleDateString()
}

export default function Card({ anime }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(anime.id)

  return (
    <article className="card">
      <Link to={`/anime/${anime.id}`} className="card__link">
        {anime.posterPath ? (
          <img src={getImageUrl(anime.posterPath)} alt={anime.title} className="card__image" loading="lazy" />
        ) : (
          <div className="card__placeholder">No Poster</div>
        )}
      </Link>

      <div className="card__content">
        <h3 className="card__title">{anime.title}</h3>
        <p className="card__meta">
          {formatDate(anime.releaseDate)} | Score: {anime.rating?.toFixed(1) ?? 'N/A'}
        </p>
        <p className="card__description">{anime.overview || 'No description available.'}</p>
        <div className="card__actions">
          <Link to={`/anime/${anime.id}`} className="btn btn--primary">
            View Details
          </Link>
          <Button variant="ghost" onClick={() => toggleFavorite(anime)}>
            {favorite ? 'Remove Favorite' : 'Add Favorite'}
          </Button>
        </div>
      </div>
    </article>
  )
}
