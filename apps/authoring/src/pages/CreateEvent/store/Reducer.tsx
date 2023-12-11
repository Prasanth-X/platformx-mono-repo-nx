const updateEventStatus = (state, savedStatus) => {
  return { ...state, isUnsavedPoll: savedStatus };
};

export const eventReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EVENTSAVE":
      return updateEventStatus(state, action.payload);
    default:
      return state;
  }
};
