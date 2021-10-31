import createCanvas from "lib/createCanvas";
import { draw } from "lib/draw";
import { IGenericConfig } from "lib/interfaces/IGenericConfig";
import { IDraw } from "lib/interfaces";

const renderFactory = (
  renderer: (canvas: HTMLCanvasElement) => () => void,
  target: string,
  width = 200,
  height = 200,
  sizeToParent = true,
  optClassName: string | null = null,
  config: IGenericConfig
): IDraw => {
  const canvas: HTMLCanvasElement = createCanvas(
    target,
    width,
    height,
    sizeToParent,
    optClassName
  );

  return draw(renderer(canvas), config);
};

export { renderFactory };
