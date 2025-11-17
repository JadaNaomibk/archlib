// SearchBar controls a free-text refinement search on top of the selected theme

import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../features/topics/topicsSlice.js'

function SearchBar() {
  // useDispatch gives us the dispatch function so we can send actions to the Redux store.
  const dispatch = useDispatch()
  // useSelector reads the current searchTerm value from the topics slice in the Redux store.
  const searchTerm = useSelector((state) => state.topics.searchTerm)

   // This function runs every time the user types in the input box.
  // It dispatches setSearchTerm so the global searchTerm updates in Redux.
  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    // Simple card container to visually group the search label and input.
    <div className="card">
      <h2>Refine your search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Try: Zaha Hadid, museum, housing, tower, etc."
      />
    </div>
  )
}

export default SearchBar
