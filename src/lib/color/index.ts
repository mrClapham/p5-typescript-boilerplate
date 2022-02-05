import { IColor } from "lib/interfaces";
export interface IColorRampElement extends IColor {
  rgba: string
}

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


const createColoursArray = (start: IColor, end: IColor, steps: number): IColorRampElement[] => {
  let s_r = start.r;
  let s_g = start.g;
  let s_b = start.b;
  let s_a = start.a;

  const e_r = end.r;
  const e_g = end.g;
  const e_b = end.b;
  const e_a = end.a;

  const returnArray: IColorRampElement[] = [];

  const _rstep = calculateSteps(s_r, e_r, steps)
  const _gstep = calculateSteps(s_g, e_g, steps)
  const _bstep = calculateSteps(s_b, e_b, steps)
  const _astep = calculateSteps(s_a, e_a, steps)

  for (let i = 0; i < steps; i++) {
    s_r = Math.round(start.r + _rstep + (_rstep * i));
    s_g = Math.round(start.g + _gstep + (_gstep * i));
    s_b = Math.round(start.b + _bstep + (_bstep * i));
    s_a = start.a + _astep + (_astep * i);

    const o: IColorRampElement = { r: s_r, g: s_g, b: s_b, a: s_a, rgba: `rgba(${s_r},${s_g},${s_b},${s_a.toFixed(3)})` };
    returnArray.push(o);
  }
  return returnArray;
}

const calculateSteps = (start: number, end: number, steps: number): number => {
  return (end - start) / steps
}




export { rgbaColor, createColoursArray, calculateSteps };
