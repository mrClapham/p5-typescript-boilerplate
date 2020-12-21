import { createCanvas } from "lib/createCanvas";
import { draw } from "lib/draw";

const renderFactory = (renderer: Function) => (
  target: HTMLElement,
  width: number = 200,
  height: number = 200,
  sizeToParent: boolean = true,
  optClassName: string | null = null
) => {
  const canvas: HTMLCanvasElement = createCanvas(
    target,
    width,
    height,
    sizeToParent,
    optClassName
  );
  console.log("TARGET :: ", target);

  return draw(renderer(canvas));
};

export { renderFactory };
