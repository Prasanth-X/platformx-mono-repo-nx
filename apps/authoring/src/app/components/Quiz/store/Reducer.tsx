interface ImageProps {
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
}
interface VideoDetails {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
  Transcript: boolean;
  CC: boolean;
}
interface VideoProps {
  Url: string;
  Thumbnail?: string;
  Title: string;
}
interface QuizInstance {
  Page: string;
  Title: string;
  ParentPageURL: string;
  CurrentPageURL: string;
  Page_State: string;
  Description: string;
  short_description: string;
  Banner: string;
  tags: string[];
  contentType: string;
  quizContent?: {
    images: ImageProps[] | null;
    videos: ImageProps[] | null;
  };
  links?: '';
  linkTags?: string[];
  creationDate?: string;
  modificationDate?: string;
  createdby?: string;
  modifiedby?: string;
  Page_LastModifiedBy?: string;
  imagevideoURL?: string;
  socialShareImgURL?: string;
}

interface InitialStateInstance {
  quizArray: QuizInstance[] | [];
  currentQuiz: QuizInstance | any;
  isUnsavedQuiz: boolean;
}

export const quizInitialState: InitialStateInstance = {
  quizArray: [],
  currentQuiz: {},
  isUnsavedQuiz: false,
};

const updateInitialState = (state, payload) => {
  return { ...state || {}, quizArray: payload };
};
const updateQUIZList = (state, payload) => {
  return {
    ...state,
    quizArray: [...state?.quizArray || {}, ...payload || {}],
  };
};
const getVideoByID = (state, payload) => {
  return { ...state, currentQuiz: payload };
};
const previewQuiz = (state, newQuiz) => {
  const newquizArray: QuizInstance[] = [...state.quizArray || {}];
  return { ...state || {}, quizArray: newquizArray, currentQuiz: newQuiz };
};
const updateQuizStatus = (state, savedStatus) => {
  return { ...state, isUnsavedQuiz: savedStatus };
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INITIAL_STATE':
      return updateInitialState(state, action.payload);
    case 'UPDATE_QUIZ_LIST':
      return updateQUIZList(state, action.payload);
    case 'GET_QUIZ_BY_ID':
      return getVideoByID(state, action.payload);
    case 'PREVIEW_QUIZ':
      return previewQuiz(state, action.quiz);
    case 'UPDATE_QUIZSAVE':
      return updateQuizStatus(state, action.payload);
    default:
      return state;
  }
};
