import { Vector } from "p5";
import { IPoints3d } from 'lib/interfaces/IPoints3d';
import { IBoid } from './IBoid';
import { IBoidAttractor } from './IBoidAttractor';
import { IBoidAttractorConfig } from './IBoidAttractorConfig';

export interface IFlock {
    boids: IBoid[],
    getPositions(): IPoints3d[],
    setTarget(value: Vector): void,
    getTarget(): Vector,
    setHeight(value: number): void,
    getHeight(): number,
    setWidth(value: number): void,
    getWidth(): number,
    setDepth(value: number): void,
    getDepth(): number,
    addAttractor(config: Partial<IBoidAttractorConfig>): IBoidAttractor,
    removeAttractor(value: IBoidAttractor): void,
    getAttractors(): IBoidAttractor[],
    setBoidCohesionDistance(value: number): void,
    getBoidCohesionDistance(): number,
    setBoidMaxSpeed(value: number): void,
    getBoidMaxSpeed(): number,
    setBoidMaxForce(value: number): void,
    getBoidMaxForce(): number,
    run(): void
}