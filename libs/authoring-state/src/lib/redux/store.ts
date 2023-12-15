import { configureStore } from '@reduxjs/toolkit'
import { contentSlice } from './slices/ContentSlice'

export const store = configureStore({
    reducer: {
        content: contentSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch