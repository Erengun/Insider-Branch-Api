import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"

export const store = configureStore({
  reducer:{
    dataSlice : dataSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>