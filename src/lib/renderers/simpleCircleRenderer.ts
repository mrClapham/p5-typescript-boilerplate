import circle from "lib/shapes/circle";
import { IShape } from "lib/interfaces";

const xPos = 0;
const yPos = 0;
const xStep = 1;
const yStep = 1;
const rotate = 1;

const simpleCircleRenderer = (canvas: HTMLCanvasElement): () => void => {
  const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
  const initialConfig = {
    x: 100,
    y: 100,
    width: 100,
    height: 10,
    color: { r: 255, g: 165, b: 255, a: 0.1 },
    rotation: 45,
    red: 0,
  };

  return () => {
    console.log('RENDER ')

    const { clientWidth, clientHeight } = canvas;
    //context.clearRect(0, 0, clientWidth, clientHeight);
    context.rect(100, 100, 1001, 100);
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
    context.fillRect(200, 200, 200, 200);

    // xPos += xStep;
    // yPos += yStep;
    // rotate += 1;
    // if (xPos > clientWidth || xPos < 0) {
    //   xStep = -xStep;
    // }
    // if (yPos > clientHeight || yPos < 0) {
    //   yStep = -yStep;
    // }
  };
};

// const simpleCircleRenderer = (canv: HTMLCanvasElement): () => void => {
//   return (): void => {
//     console.log('rendering')
//   }
// }

export { simpleCircleRenderer };
