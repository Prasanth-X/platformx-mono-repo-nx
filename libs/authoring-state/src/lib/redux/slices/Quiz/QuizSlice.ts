import { createSlice } from '@reduxjs/toolkit';
import { QuizState, QuizInstance } from './Quiz.type';


export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quizArray: [],
        currentQuiz: {},
        isUnsavedQuiz: false,
    } as QuizState,
    reducers: {
        updateQuizInitialState: (state, action) => {
            state.quizArray = action.payload;
        },
        updateQuizList: (state, action) => {
            state.quizArray = [...state.quizArray, ...action.payload];
        },
        getVideoByID: (state, action) => {
            state.currentQuiz = action.payload;
        },
        previewQuiz: (state, action) => {
            const newquizArray: QuizInstance[] = [...state.quizArray];
            state.quizArray = newquizArray;
            state.currentQuiz = action.payload;
        },
        updateQuizStatus: (state, action) => {
            state.isUnsavedQuiz = action.payload;
        },
    },
});

export const {
    updateQuizInitialState,
    updateQuizList,
    getVideoByID,
    previewQuiz,
    updateQuizStatus,
} = quizSlice.actions;
export default quizSlice.reducer

