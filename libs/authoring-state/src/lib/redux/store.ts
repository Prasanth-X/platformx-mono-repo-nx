import { configureStore } from '@reduxjs/toolkit'
import { contentSlice } from './slices/Content/ContentSlice'
import { articleSlice } from './slices/Article/ArticleSlice'

export const store = configureStore({
    reducer: {
        content: contentSlice.reducer,
        article: articleSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch