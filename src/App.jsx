import { useDispatch, useSelector } from 'react-redux'
import { fetchResults } from './features/topics/topicsSlice.js'
import TopicSelector from './components/TopicSelector.jsx'
import SearchBar from './components/SearchBar.jsx'
import ResultsGrid from './components/ResultsGrid.jsx'
import FavoritesPanel from './components/FavoritesPanel.jsx'

function App() {
  const dispatch = useDispatch()
  const { selectedTopic, searchTerm } = useSelector(
    (state) => state.topics,
  )

  const handleSearch = () => {
    dispatch(fetchResults({ topic: selectedTopic, searchTerm }))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contemporary Arch Icons</h1>
        <p className="subtitle">
          Explore contemporary architecture themes and precedents using live
          Wikipedia data. Curate a mini studio board of references for your
          next project.
        </p>
      </header>

      <main className="app-main">
        <section className="left-column">
          <SearchBar />
          <TopicSelector />
          <div className="card inline-actions">
            <button type="button" className="btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <ResultsGrid />
        </section>
        <section className="right-column">
          <FavoritesPanel />
        </section>
      </main>
    </div>
  )
}

export default App
