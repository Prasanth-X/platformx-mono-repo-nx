import { createContext, useReducer } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { articleInitialState, articleReducer } from '../articles/Reducer';
import { NavTreeReducer, navTreeInitialState } from '../pages/NavTree/Reducer';
import { initialState, reducer } from './Reducer';

import {
  contentInitialState,
  contentReducer,
} from '../components/Common/contentTypes/store/ContentReducer';
import {
  pollInitialState,
  pollReducer,
} from '../components/Polls/store/Reducer';
import {
  quizInitialState,
  quizReducer,
} from '../components/Quiz/store/Reducer';

import { vodInitialState, vodReducer } from '../pages/vod/store/Reducer';
export const Store = createContext<any>(initialState);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    page: useReducer(reducer, initialState),
    article: useReducer(articleReducer, articleInitialState),
    navTree: useReducer(NavTreeReducer, navTreeInitialState),
    vod: useReducer(vodReducer, vodInitialState),
    quiz: useReducer(quizReducer, quizInitialState),
    content: useReducer(contentReducer, contentInitialState),
    poll: useReducer(pollReducer, pollInitialState),
  });
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
