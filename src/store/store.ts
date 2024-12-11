import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from "./TaskSlice"
export const store = configureStore({
    reducer: {
        tasks:TaskReducer
    },
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch