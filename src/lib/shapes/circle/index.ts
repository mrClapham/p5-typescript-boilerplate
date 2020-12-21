import { IShape } from "lib/interfaces";
import { rgbaColor } from "lib/color";

let width: number = 40;
let height: number = 40;

export default (ctx: CanvasRenderingContext2D): Function => (
  config: IShape = {
    x: 10,
    y: 10,
    width: 10,
    height: 10,
    color: { r: 0, g: 255, b: 255, a: 0.5 },
    rotation: 45,
    render: () => {},
  }
) => {
  //const { x, y, width, height, color, rotation } = config;
  const render = (data: Partial<IShape>): void => {
    const values = { ...config, ...data };
    const { x, y, width, height, color, rotation } = values;
    ctx.beginPath();
    //ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    ctx.ellipse(x, y, width, height, rotation, 0, 2 * Math.PI);
    ctx.fillStyle = rgbaColor(color);
    ctx.fill();
  };

  return { render };
};
