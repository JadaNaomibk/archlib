import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../features/topics/topicsSlice.js'

function ResultsGrid() {
  const dispatch = useDispatch()
  const { results, status, error, lastQuery, favorites } = useSelector(
    (state) => state.topics,
  )

  const favoriteIds = new Set(favorites.map((card) => card.id))

  if (status === 'loading') {
    return (
      <div className="card">
        <h2>Results</h2>
        <p className="info">Loading precedents from Wikipedia…</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="card">
        <h2>Results</h2>
        <p className="error">Error: {error}</p>
        <p className="info">
          Check your connection or try a different search phrase.
        </p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="card">
        <h2>Results</h2>
        <p className="info">
          No results yet. Pick a theme and click &quot;Search&quot; to load
          contemporary precedents.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Results for: {lastQuery}</h2>
      <div className="grid">
        {results.map((card) => (
          <article key={card.id} className="result-card">
            <h3>{card.title}</h3>
            <p
              className="snippet"
              // snippetHtml is safe-ish from Wikipedia but still HTML; this is just for a school project
              dangerouslySetInnerHTML={{ __html: card.snippetHtml + '…' }}
            />
            <div className="result-actions">
              <a
                href={card.pageUrl}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                View on Wikipedia
              </a>
              <button
                type="button"
                onClick={() => dispatch(toggleFavorite(card.id))}
                className={
                  favoriteIds.has(card.id) ? 'btn-secondary' : 'btn-primary'
                }
              >
                {favoriteIds.has(card.id)
                  ? 'Remove from board'
                  : 'Save to studio board'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ResultsGrid
