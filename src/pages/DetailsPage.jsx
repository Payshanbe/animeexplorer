import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Loader from '../components/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import useFavorites from '../hooks/useFavorites.js'
import { fetchAnimeDetails, getImageUrl } from '../services/jikanApi.js'

function formatDate(date) {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString()
}

export default function DetailsPage() {
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data: anime, isLoading, error } = useFetch((signal) => fetchAnimeDetails(id, signal), [id])

  const favoriteAnime = useMemo(() => {
    if (!anime) return null

    return {
      id: anime.id,
      title: anime.title,
      overview: anime.overview,
      posterPath: anime.posterPath,
      rating: anime.rating,
      releaseDate: anime.releaseDate,
      genres: anime.genres,
    }
  }, [anime])

  if (isLoading) {
    return <Loader text="Loading anime details..." center />
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>
  }

  if (!anime) {
    return <p className="state-message">Anime not found.</p>
  }

  return (
    <section className="details">
      <Link to="/" className="details__back">
        Back to Home
      </Link>

      <div className="details__layout">
        {anime.posterPath ? (
          <img src={getImageUrl(anime.posterPath)} alt={anime.title} className="details__poster" />
        ) : (
          <div className="details__placeholder">No Poster Available</div>
        )}

        <div>
          <h1 className="details__title">{anime.title}</h1>
          <p className="details__meta">
            Score: {anime.rating?.toFixed(1) ?? 'N/A'} | Release date: {formatDate(anime.releaseDate)}
          </p>

          <div className="tag-row">
            {(anime.genres || []).map((genre) => (
              <span className="tag" key={genre.mal_id ?? genre.name}>
                {genre.name}
              </span>
            ))}
          </div>

          <p className="details__description">{anime.overview || 'No description available.'}</p>

          <Button variant="primary" onClick={() => toggleFavorite(favoriteAnime)}>
            {isFavorite(anime.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </div>
    </section>
  )
}
