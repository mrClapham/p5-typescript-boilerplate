import { IColor } from "lib/interfaces";

const rgbaColor = (values: IColor): string => {
  const { r, g, b, a } = values;

  if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
    throw new Error("rgb values must be between 0 and 255");
  }
  if (a > 1 || a < 0) {
    throw new Error("Alpha value must be between 0 and 1");
  }

  return `rgba(${r},${g},${b},${a})`;
};

export { rgbaColor };
