import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from './slices/Article/ArticleSlice';
import { commentSlice } from './slices/Comment/CommentSlice';
import { contentSlice } from './slices/Content/ContentSlice';

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    article: articleSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
