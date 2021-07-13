import { createCanvas } from "lib/createCanvas";
import { draw } from "lib/draw";

const renderFactory = (renderer: Function) => (
  target: string,
  width = 200,
  height = 200,
  sizeToParent = true,
  optClassName: string | null = null
) => {
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
