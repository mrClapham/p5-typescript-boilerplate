import { createCanvas } from "lib/createCanvas";
import { draw } from "lib/draw";
import { IDraw } from 'lib/interfaces';

const renderFactory = (renderer: Function) => (
  target: string,
  width = 200,
  height = 200,
  sizeToParent = true,
  optClassName: string | null = null
): IDraw => {
  const canvas: HTMLCanvasElement = createCanvas(
    target,
    width,
    height,
    sizeToParent,
    optClassName
  );

  return draw(renderer(canvas));
};

export { renderFactory };
