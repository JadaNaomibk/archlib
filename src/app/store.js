// Global Redux store for the Contemporary Arch Icons app
//This app centralizes all app state related to architecture using Redux
// configureStore helper combines the topics slice reducer and produces store object that react componsnt access via redux provider
//Helper- small resueable function that does specific job
//State Object is a javascript object that represents current data 
//Component is a resunle ui block or function that takes props ad state and returns JSX
//Reducer is a pure function that takes curent state and action and returns

import { configureStore } from '@reduxjs/toolkit'
import topicsReducer from '../features/topics/topicsSlice.js'

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
  },
})
