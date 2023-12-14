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

export const updatePollList = (pollList: any) => {
  return {
    type: 'UPDATE_POLL_LIST',
    payload: pollList,
  };
};
export const getPollById = (pollData: any) => {
  return {
    type: 'GET_POLL_BY_ID',
    payload: pollData,
  };
};
export const checkIfUnsavedChanges = (isUnsaved: boolean) => {
  return {
    type: 'UPDATE_POLLSAVE',
    payload: isUnsaved,
  };
};
export const previewPoll = (newpoll) => {
  return {
    type: 'PREVIEW_POLL',
    poll: newpoll,
  };
};
