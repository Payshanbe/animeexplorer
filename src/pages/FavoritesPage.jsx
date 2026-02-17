import Card from '../components/Card.jsx'
import useFavorites from '../hooks/useFavorites.js'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section>
      <div className="page-heading">
        <h1>Your Favorites</h1>
        <p>Saved anime titles are stored locally in your browser.</p>
      </div>

      {!favorites.length ? (
        <p className="state-message">No favorites yet. Add some from Home or Search.</p>
      ) : (
        <div className="grid">
          {favorites.map((anime) => (
            <Card key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </section>
  )
}
