import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from './slices/Article/ArticleSlice';
import { contentSlice } from './slices/Contetent/ContentSlice';
import { dialogSlice } from './slices/Dialog/DialogSlice';

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    article: articleSlice.reducer,
    dialog: dialogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
