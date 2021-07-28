import { Vector } from 'p5';
import { IBoid } from 'lib/interfaces';
export interface IBoidAttractor {
    run(boids: IBoid[]): void,
    setExclusionZone(value: number): void,
    getExclusionZone(): number,
    setAttraction(value: number): void,
    getAttraction(): void,
    setPosition(value: Vector): void,
    getPosition(): Vector
}

