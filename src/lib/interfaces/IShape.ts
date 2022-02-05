import { IColor } from ".";

export interface IShape {
  width: number;
  height: number;
  x: number;
  y: number;
  color: IColor;
  rotation: number;
  render: () => void;
}

