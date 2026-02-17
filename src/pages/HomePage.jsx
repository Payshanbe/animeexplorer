import { useState } from 'react'
import Card from '../components/Card.jsx'
import Loader from '../components/Loader.jsx'
import Pagination from '../components/Pagination.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import useFetch from '../hooks/useFetch.js'
import { fetchTrendingAnime } from '../services/jikanApi.js'

export default function HomePage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useFetch((signal) => fetchTrendingAnime(page, signal), [page])

  const animes = data?.results || []
  const totalPages = Math.min(data?.totalPages || 1, 500)

  return (
    <section>
      <div className="page-heading">
        <h1>Top Anime</h1>
        <p>Discover the most popular anime right now.</p>
      </div>

      {error ? <p className="state-message state-message--error">{error}</p> : null}

      {isLoading ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid">
            {animes.map((anime) => (
              <Card key={anime.id} anime={anime} />
            ))}
          </div>

          {!animes.length && !error ? <Loader text="No anime found." center /> : null}

          {!!animes.length && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </section>
  )
}
