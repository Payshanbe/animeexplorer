const BASE_URL = 'https://api.jikan.moe/v4'

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  return url
}

async function request(path, params = {}, signal) {
  const response = await fetch(buildUrl(path, params), { signal })
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function getImageUrl(imageUrl) {
  return imageUrl || ''
}

function mapAnimeData(anime) {
  return {
    id: anime.mal_id,
    title: anime.title,
    overview: anime.synopsis || '',
    posterPath: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '',
    rating: anime.score || null,
    releaseDate: anime.aired?.from || anime.year || '',
    genres: anime.genres || [],
  }
}

export async function fetchTrendingAnime(page = 1, signal) {
  const data = await request('/top/anime', { page, filter: 'bypopularity' }, signal)
  return {
    page: data.pagination?.current_page || page,
    totalPages: data.pagination?.last_visible_page || 1,
    results: (data.data || []).map(mapAnimeData),
  }
}

export async function searchAnime(query, page = 1, signal) {
  if (!query) {
    return { page: 1, totalPages: 1, results: [] }
  }

  const data = await request('/anime', { q: query, page, order_by: 'score', sort: 'desc' }, signal)
  return {
    page: data.pagination?.current_page || page,
    totalPages: data.pagination?.last_visible_page || 1,
    results: (data.data || []).map(mapAnimeData),
  }
}

export async function fetchAnimeDetails(animeId, signal) {
  const data = await request(`/anime/${animeId}/full`, {}, signal)
  return mapAnimeData(data.data)
}
