/* eslint-disable no-debugger */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContentState } from './ContentSlice.types'
export const contentSlice = createSlice({
  name: 'Content',
  initialState: {
    contentArray: [],
    contentList: [],
    startIndex: 0,
    loading: true,
    contentType: '',
    clearStatus: false,
    currentContent: {},
    isUnsavedVod: false,
    contentProp: '',
    apiState: false,
  } as ContentState,
  reducers: {

    updateContentList: (state, action: PayloadAction<any>) => {
      state.contentArray = [...action.payload]
    },
    previewContent: (state, action: PayloadAction<any>) => {
      state.contentArray = [...state.contentArray]
      state.currentContent = action.payload
    },
    previewArticle: (state, action: PayloadAction<any>) => {
      state.contentArray = [...state.contentArray]
      state.currentContent = action.payload
    },
    contentProp: (state, action: PayloadAction<string>) => {
      state.contentProp = action.payload
    },
    contentList: (state, action: PayloadAction<any>) => {
      state.contentList = action.payload
    },
  },
})

export const {
  updateContentList,
  previewContent,
  contentProp,
  contentList,
} = contentSlice.actions

export default contentSlice.reducer
