import createCanvas from "lib/createCanvas";
import { draw } from "lib/draw";
import { IDraw } from "lib/interfaces";
import { mousePositionListener } from "lib/listeners";

/**
 *
 * @param context CanvasRenderingContext2D
 */
const render: Function = (canvas: HTMLCanvasElement) => {
  let mouseX = 0;
  let mouseY = 0;
  const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D; //as CanvasRenderingContext2D;
  const onMousePositionChanged = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    mouseY = offsetY;
    mouseX = offsetX;
  };
  mousePositionListener(canvas, onMousePositionChanged);
  return () => {
    const { clientWidth, clientHeight } = canvas;
    context.clearRect(0, 0, clientWidth, clientHeight);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, mouseX, mouseY);
  };
};

const simpleMouseTrack = (
  target: string,
  width = 900,
  height = 900
): IDraw => {
  const canvas: HTMLCanvasElement = createCanvas(target, width, height, true);

  const { pause, play } = draw(render(canvas));
  return { pause, play };
};

export { simpleMouseTrack };
