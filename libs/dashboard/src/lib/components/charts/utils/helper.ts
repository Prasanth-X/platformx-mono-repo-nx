export const addEllipsis = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength - 3)}...`;
  }
  return text;
};
