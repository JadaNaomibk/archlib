import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../features/topics/topicsSlice.js'

function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.topics.searchTerm)

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
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
