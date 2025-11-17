import { configureStore } from '@reduxjs/toolkit'
import topicsReducer from '../features/topics/topicsSlice.js'

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
  },
})
