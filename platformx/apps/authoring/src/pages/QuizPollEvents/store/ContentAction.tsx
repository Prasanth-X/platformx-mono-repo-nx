export const updateInitialState = (updatedState: any) => {
  return {
    type: 'UPDATE_INITIAL_STATE',
    payload: updatedState,
  };
};
export const updateContentList = (contentList: any) => {
  return {
    type: 'UPDATE_CONTENT_LIST',
    payload: contentList,
  };
};
export const previewContent = (content) => {
  return {
    type: 'PREVIEW_CONTENT',
    content: content,
  };
};
export const contentProp = (content) => {
  return {
    type: 'CONTENT_PROP',
    content: content,
  };
};
