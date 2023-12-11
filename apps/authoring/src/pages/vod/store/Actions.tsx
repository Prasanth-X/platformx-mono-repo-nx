export const updateInitialState = (updatedState: any) => {
  return {
    type: 'UPDATE_INITIAL_STATE',
    payload: updatedState,
  };
};

export const checkIfUnsavedChanges = (isUnsaved: boolean) => {
  return {
    type: 'UPDATE_VODSAVE',
    payload: isUnsaved,
  };
};
export const previewVod = (newvod) => {
  return {
    type: 'PREVIEW_VOD',
    vod: newvod,
  };
};
