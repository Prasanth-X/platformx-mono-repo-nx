export const reorder = (list, startIndex, endIndex) => {
  const newList = [...list];
  [newList[startIndex], newList[endIndex]] = [
    newList[endIndex],
    newList[startIndex],
  ];

  return newList;
};
export const updateMainMenuScoreAndReorder = (list, startIndex, endIndex) => {
  const startIndexScore = list[startIndex].Score;

  const endIndexScore = list[endIndex].Score;

  const newList = JSON.parse(JSON.stringify(list));

  newList[startIndex] = { ...newList[startIndex], Score: endIndexScore };
  newList[endIndex] = { ...newList[endIndex], Score: startIndexScore };

  return reorder(newList, startIndex, endIndex);
};
