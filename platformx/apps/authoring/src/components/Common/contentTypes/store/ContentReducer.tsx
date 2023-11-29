interface ContentInstance {
  name?: string;
  page: string;
  parent_page_url?: string;
  page_state?: string;
  current_page_url: string;
  title?: string;
  tags?: [];
  description?: string;
  modificationDate: string;
  lastModifiedBy?: string;
  page_publishedby?: string;
  path: string;
  questions: [];
  display_scores: string;
  background_content?: {
    Url?: string;
    Thumbnail: string;
  };
  result_range_1: string;
  result_range_2: string;
  result_range_3: string;
  result_range_4: string;
  analytics_enable: boolean;
  category: string;
  createdBy: string;
  creationDate: string;
  is_edit: boolean;
  others: string;
  page_lastmodifiedby: string;
  robot_txt: string;
  seo_enable: boolean;
  settingsProperties: string;
  short_description: string;
  site_name: string;
  sitemap: string;
  structure_data: string;
}

interface InitialStateInstance {
  contentArray: ContentInstance[] | [];
  //new list props
  contentList: [];
  startIndex: number;
  loading: boolean;
  contentType: string;
  clearStatus: boolean;
  currentContent: ContentInstance | any;
  isUnsavedVod: boolean;
  contentProp: string;
  apiState: boolean;
}

export const contentInitialState: InitialStateInstance = {
  contentArray: [],
  //new list props
  contentList: [],
  startIndex: 0,
  loading: true,
  contentType: '',
  clearStatus: false,
  currentContent: {},
  isUnsavedVod: false,
  contentProp: '',
  apiState: false,
};

const updateInitialState = (state, payload) => {
  return { ...(state || {}), contentArray: payload };
};
const updateContentList = (state, payload) => {
  return {
    ...(state || {}),
    contentArray: [...(state?.contentArray || {}), ...(payload || {})],
  };
};
const previewContent = (state, content) => {
  const newContentArray: ContentInstance[] = [...state.contentArray];
  return {
    ...(state || {}),
    contentArray: newContentArray,
    currentContent: content,
  };
};
const contentProp = (state, content) => {
  return { ...state, contentProp: content };
};

const updateContentItems = (state, content, newDataSize, contentType) => {
  return {
    ...state,
    contentList: content,
    startIndex: content.length + 1,
    loading: newDataSize < 20 ? false : true,
    contentType: contentType,
    apiState: true
  };
};
export const contentReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INITIAL_STATE':
      return updateInitialState(state, action.payload);
    case 'UPDATE_CONTENT_LIST':
      return updateContentList(state, action.payload);
    case 'PREVIEW_CONTENT':
      return previewContent(state, action.content);
    case 'CONTENT_PROP':
      return contentProp(state, action.content);
    case 'CLEAR_CONTENT':
      return {
        ...state,
        contentList: [],
        startIndex: 0,
        loading: true,
        contentType: '',
        clearStatus: true
      };
    case 'CLEAR_CONTENT_STATUS':
      return {
        ...state,
        clearStatus: false
      };
    case 'UPDATE_CONTENT':
      return updateContentItems(
        state,
        action.content,
        action.newDataSize,
        action.contentType
      );
    case 'UPDATE_LOADER_FOR_CONTENT':
      return { ...state, loading: action.loading };
    case 'UPDATE_API_STATE':
      return { ...state, apiState: false};
    default:
      return state;
  }
};
