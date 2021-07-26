import * as p5 from 'p5';
export interface IForcable {
    setForce(value: p5.Vector): void;
    setDestination(value: p5.Vector): any;
    getPosition(): p5.Vector;
}
declare const create: (position: p5.Vector, s: p5) => Object;
export { create };
