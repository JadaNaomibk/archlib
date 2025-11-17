// topicsSlice manages:
// - selected architecture theme
// - free-text search term
// - Wikipedia results
// - studio board favorites
// It also defines fetchResults, an async thunk that calls the Wikipedia search API.

import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

// Wikipedia search API (CORS-friendly with origin=*)
const BASE_URL = 'https://en.wikipedia.org/w/api.php'

// Async thunk: perform an AJAX call to the Wikipedia search API.
// - Builds a query string using URLSearchParams
// - Sends a GET request with fetch
// - Normalizes the response into simple card objects for the UI
export const fetchResults = createAsyncThunk(
  'topics/fetchResults',
  async ({ topic, searchTerm }) => {
    const effectiveQuery =
      (searchTerm && searchTerm.trim()) ||
      topic ||
      'contemporary architecture'

    // Use URLSearchParams so the query string is constructed safely and clearly
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: effectiveQuery,
      srlimit: '20',
      origin: '*',
    })

    const url = `${BASE_URL}?${params.toString()}`

    // Send the HTTP request to Wikipedia. origin=* is required for browser CORS.
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Failed to load architecture topics')
    }

    const data = await res.json()

    const results = (data.query?.search || []).map((item) => ({
      id: item.pageid,
      title: item.title,
      snippetHtml: item.snippet, // HTML from Wikipedia
      pageUrl: `https://en.wikipedia.org/?curid=${item.pageid}`,
    }))

    return {
      query: effectiveQuery,
      results,
    }
  },
)

const initialTopics = [
  'Brutalist architecture',
  'High-tech architecture',
  'Parametric design',
  'Deconstructivism',
  'Minimalist architecture',
  'Sustainable architecture',
]

const initialState = {
  availableTopics: initialTopics,
  selectedTopic: initialTopics[0],
  searchTerm: '',
  lastQuery: '',
  results: [],
  favorites: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // Change the currently selected architecture theme
    setSelectedTopic(state, action) {
      state.selectedTopic = action.payload
    },

    // Keep the free-text search term in Redux so multiple components can read it
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },

    // Add/remove a card from the favorites board
    toggleFavorite(state, action) {
      const id = action.payload
      const exists = state.favorites.find((card) => card.id === id)

      if (exists) {
        state.favorites = state.favorites.filter((card) => card.id !== id)
      } else {
        const card = state.results.find((card) => card.id === id)
        if (card) {
          state.favorites.push({ ...card, savedKey: nanoid() })
        }
      }
    },

    // Clear the entire favorites board
    clearFavorites(state) {
      state.favorites = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.results = action.payload.results
        state.lastQuery = action.payload.query
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const {
  setSelectedTopic,
  setSearchTerm,
  toggleFavorite,
  clearFavorites,
} = topicsSlice.actions

export default topicsSlice.reducer
