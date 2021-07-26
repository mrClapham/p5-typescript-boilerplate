import { Vector } from "p5";
import { IBoid, IPoint3d } from 'lib/interfaces';
import { IBoidAttractorConfig, IBoidAttractor } from 'lib/interfaces';
interface IFlock {
    boids: IBoid[];
    getPositions(): IPoint3d[];
    setTarget(value: Vector): void;
    getTarget(): Vector;
    setHeight(value: number): void;
    getHeight(): number;
    setWidth(value: number): void;
    getWidth(): number;
    setDepth(value: number): void;
    getDepth(): number;
    addAttractor(config: Partial<IBoidAttractorConfig>): IBoidAttractor;
    removeAttractor(value: IBoidAttractor): void;
    getAttractors(): IBoidAttractor[];
    setBoidCohesionDistance(value: number): void;
    getBoidCohesionDistance(): number;
    setBoidMaxSpeed(value: number): void;
    getBoidMaxSpeed(): number;
    setBoidMaxForce(value: number): any;
    getBoidMaxForce(): number;
    run(): void;
}
export { IFlock };
