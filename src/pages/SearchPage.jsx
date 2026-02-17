import { useState } from 'react'
import Card from '../components/Card.jsx'
import Pagination from '../components/Pagination.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useFetch from '../hooks/useFetch.js'
import { searchAnime } from '../services/jikanApi.js'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebounce(query.trim(), 500)

  const { data, isLoading, error } = useFetch(
    (signal) => searchAnime(debouncedQuery, page, signal),
    [debouncedQuery, page],
  )

  const animes = data?.results || []
  const totalPages = Math.min(data?.totalPages || 1, 500)

  return (
    <section>
      <div className="page-heading">
        <h1>Search Anime</h1>
        <p>Find your next anime by title.</p>
      </div>

      <label htmlFor="anime-search" className="input-label">
        Anime title
      </label>
      <input
        id="anime-search"
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setPage(1)
        }}
        placeholder="Search for an anime..."
        className="input"
      />

      {error ? <p className="state-message state-message--error">{error}</p> : null}

      {!debouncedQuery ? (
        <p className="state-message">Start typing to search for anime.</p>
      ) : isLoading ? (
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

          {!animes.length && !error ? <p className="state-message">No results found.</p> : null}

          {!!animes.length && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </section>
  )
}
