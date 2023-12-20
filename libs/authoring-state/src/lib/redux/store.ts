import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from './slices/Article/ArticleSlice';
import { contentSlice } from './slices/Contetent/ContentSlice';

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    article: articleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
