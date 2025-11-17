import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTopic } from '../features/topics/topicsSlice.js'

function TopicSelector() {
  const dispatch = useDispatch()
  const { availableTopics, selectedTopic } = useSelector(
    (state) => state.topics,
  )

  return (
    <div className="card">
      <h2>Contemporary themes</h2>
      <p className="info">
        Pick a theme to explore precedents, then refine with your own search.
      </p>
      <div className="pill-row">
        {availableTopics.map((topic) => (
          <button
            key={topic}
            type="button"
            className={
              topic === selectedTopic ? 'pill pill--active' : 'pill'
            }
            onClick={() => dispatch(setSelectedTopic(topic))}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopicSelector
