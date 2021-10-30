import createCanvas from "lib/createCanvas";
import { draw } from "lib/draw";
import { IDraw } from 'lib/interfaces';

const renderFactory = (
  renderer: (canvas: HTMLCanvasElement) => () => void,
  target: string,
  width = 200,
  height = 200,
  sizeToParent = true,
  optClassName: string | null = null
): IDraw => {
  console.log('Render factory')
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
