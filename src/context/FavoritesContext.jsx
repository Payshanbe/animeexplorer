import { useEffect, useState } from 'react'
import FavoritesContext from './favoritesContextObject.js'

const STORAGE_KEY = 'anime_explorer_favorites'

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY)
    return savedFavorites ? JSON.parse(savedFavorites) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getInitialFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (animeId) => favorites.some((anime) => anime.id === animeId)

  const addFavorite = (anime) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((item) => item.id === anime.id)) {
        return currentFavorites
      }
      return [...currentFavorites, anime]
    })
  }

  const removeFavorite = (animeId) => {
    setFavorites((currentFavorites) => currentFavorites.filter((anime) => anime.id !== animeId))
  }

  const toggleFavorite = (anime) => {
    if (isFavorite(anime.id)) {
      removeFavorite(anime.id)
      return
    }

    addFavorite(anime)
  }

  const value = { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
