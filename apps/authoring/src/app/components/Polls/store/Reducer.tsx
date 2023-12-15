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
interface PollInstance {
  page: string;
  title: string;
  parentPageURL: string;
  currentPageURL: string;
  page_State: string;
  description: string;
  short_description: string;
  banner: string;
  tags: string[];
  contentType: string;
  pollContent?: {
    images: ImageProps[] | null;
    videos: ImageProps[] | null;
  };
  links?: '';
  linkTags?: string[];
  creationDate?: string;
  modificationDate?: string;
  createdby?: string;
  modifiedby?: string;
  page_LastModifiedBy?: string;
  imagevideoURL?: string;
  socialShareImgURL?: string;
}

interface InitialStateInstance {
  pollArray: PollInstance[] | [];
  currentPoll: PollInstance | any;
  isUnsavedPoll: boolean;
}

export const pollInitialState: InitialStateInstance = {
  pollArray: [],
  currentPoll: {},
  isUnsavedPoll: false,
};

const updateInitialState = (state, payload) => {
  return { ...state || {}, pollArray: payload };
};
const updatePOLLList = (state, payload) => {
  return {
    ...state || {},
    pollArray: [...state?.pollArray || {}, ...payload || {}],
  };
};
const getVideoByID = (state, payload) => {
  return { ...state || {}, currentPoll: payload || {} };
};
const previewPoll = (state, newPoll) => {
  const newpollArray: PollInstance[] = [...state.pollArray];
  return {
    ...state || {},
    pollArray: newpollArray || {},
    currentPoll: newPoll,
  };
};
const updatePollStatus = (state, savedStatus) => {
  return { ...state || {}, isUnsavedPoll: savedStatus };
};

export const pollReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INITIAL_STATE':
      return updateInitialState(state, action.payload);
    case 'UPDATE_POLL_LIST':
      return updatePOLLList(state, action.payload);
    case 'GET_POLL_BY_ID':
      return getVideoByID(state, action.payload);
    case 'PREVIEW_POLL':
      return previewPoll(state, action.poll);
    case 'UPDATE_POLLSAVE':
      return updatePollStatus(state, action.payload);
    default:
      return state;
  }
};
