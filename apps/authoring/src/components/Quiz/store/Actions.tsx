export const updateSaveWarning = (status: boolean) => {
  return {
    type: 'SHOW_SAVE_WARNING',
    status,
  };
};
export const updateInitialState = (updatedState: any) => {
  return {
    type: 'UPDATE_INITIAL_STATE',
    payload: updatedState,
  };
};

export const updateQuizList = (quizList: any) => {
  return {
    type: 'UPDATE_QUIZ_LIST',
    payload: quizList,
  };
};
export const getQuizById = (quizData: any) => {
  return {
    type: 'GET_QUIZ_BY_ID',
    payload: quizData,
  };
};
export const checkIfUnsavedChanges = (isUnsaved: boolean) => {
  return {
    type: 'UPDATE_QUIZSAVE',
    payload: isUnsaved,
  };
};
export const previewQuiz = (newquiz) => {
  return {
    type: 'PREVIEW_QUIZ',
    quiz: newquiz,
  };
};
