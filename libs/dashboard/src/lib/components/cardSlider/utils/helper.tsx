import { COLORS } from './constants';

export const getBgColorArray = (length: number) => {
  if (length) {
    const quotient = Math.floor(length / 3);
    const colorArray = Array.from(
      { length: quotient + 1 },
      () => COLORS
    ).flat();
    return colorArray;
  }
};
