import { IColor } from ".";
interface IShape {
    width: number;
    height: number;
    x: number;
    y: number;
    color: IColor;
    rotation: number;
    render: Function;
}
export { IShape };
