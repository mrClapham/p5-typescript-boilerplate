import circle from "lib/shapes/circle";
import { IShape } from "lib/interfaces";

let xPos: number = 0;
let yPos: number = 0;
let xStep: number = 1;
let yStep: number = 1;
let rotate: number = 1;

const simpleCircleRenderer = (canvas: HTMLCanvasElement): Function => {
  const context: CanvasRenderingContext2D = canvas.getContext("2d");
  const initialConfig = {
    x: 100,
    y: 100,
    width: 100,
    height: 10,
    color: { r: 255, g: 165, b: 255, a: 0.1 },
    rotation: 45,
    red: 0,
  };

  const circ: IShape = circle(context)(initialConfig);
  return () => {
    const { clientWidth, clientHeight } = canvas;
    context.clearRect(0, 0, clientWidth, clientHeight);
    circ.render({ x: xPos, rotation: rotate });

    xPos += xStep;
    yPos += yStep;
    rotate += 1;
    if (xPos > clientWidth || xPos < 0) {
      xStep = -xStep;
    }
    if (yPos > clientHeight || yPos < 0) {
      yStep = -yStep;
    }
  };
};

export { simpleCircleRenderer };
