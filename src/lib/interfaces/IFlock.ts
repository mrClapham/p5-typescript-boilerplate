import { Vector } from "p5";
import { IBoid } from 'lib/interfaces';

interface IFlock {
    boids: IBoid[],
    getPositions(): IPoint3d[],
    setTarget(value: Vector): void,
    getTarget(): Vector,
    run(): void
}

export { IFlock }