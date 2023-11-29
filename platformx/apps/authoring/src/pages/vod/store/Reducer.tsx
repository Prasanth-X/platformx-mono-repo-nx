interface ImageProps {
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
}
interface VodInstance {
  Page: string;
  Title: string;
  ParentPageURL: string;
  CurrentPageURL: string;
  Page_State: string;
  Description: string;
  Banner: string;
  tags: string;
  contentType: string;
  articleContent?: {
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
}

interface InitialStateInstance {
  vodArray: VodInstance[] | [];
  currentVod: VodInstance | any;
  isUnsavedVod: boolean;
}

export const vodInitialState: InitialStateInstance = {
  vodArray: [],
  currentVod: {},
  isUnsavedVod: false,
};

const updateInitialState = (state, payload) => {
  return { ...state || {}, vodArray: payload };
};

const previewVod = (state, newVod) => {
  const newvodArray: VodInstance[] = [...state.vodArray];
  return { ...state || {}, vodArray: newvodArray, currentVod: newVod };
};


export const vodReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INITIAL_STATE':
      return updateInitialState(state, action.payload);
    case 'PREVIEW_VOD':
      return previewVod(state, action.vod);
    default:
      return state;
  }
};
