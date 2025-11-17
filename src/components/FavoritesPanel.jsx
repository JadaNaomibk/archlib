import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../features/topics/topicsSlice.js'

function FavoritesPanel() {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.topics.favorites)

  if (favorites.length === 0) {
    return (
      <div className="card">
        <h2>Studio board</h2>
        <p className="info">
          Save precedents you like to build a small studio board for your
          next concept.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Studio board</h2>
      <ul className="favorites-list">
        {favorites.map((card) => (
          <li key={card.savedKey} className="favorite-item">
            <div>
              <p className="favorite-title">{card.title}</p>
              <a
                href={card.pageUrl}
                target="_blank"
                rel="noreferrer"
                className="favorite-link"
              >
                Open on Wikipedia
              </a>
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(card.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavoritesPanel
