export const checkIfUnsavedChanges = (isUnsaved: boolean) => {
  return {
    type: "UPDATE_EVENTSAVE",
    payload: isUnsaved,
  };
};
