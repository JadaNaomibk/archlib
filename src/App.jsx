//Async thunk is A function that wraps some work so it can be done later, when it’s called... wil genrate a pending, fufilled and rejected action 
// App sets up the main layout and orchestrates:
// - Reading Redux state (selectedTopic, searchTerm)
// - Dispatching fetchResults when the user clicks Search
// - Rendering the search controls, results grid, and studio board

import { useDispatch, useSelector } from 'react-redux'
import { fetchResults } from './features/topics/topicsSlice.js'
import TopicSelector from './components/TopicSelector.jsx'
import SearchBar from './components/SearchBar.jsx'
import ResultsGrid from './components/ResultsGrid.jsx'
import FavoritesPanel from './components/FavoritesPanel.jsx'

//Root application layout: header, contro, , results and studio vboard
function App() {
  const dispatch = useDispatch()
  const { selectedTopic, searchTerm } = useSelector(
    (state) => state.topics,
  )

  //When the user clicks Search, dispatch an async thunk to load data :)

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
