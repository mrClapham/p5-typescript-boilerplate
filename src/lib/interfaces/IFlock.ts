import { Vector } from "p5";
import { IBoid, IPoint3d } from 'lib/interfaces';
import { IBoidAttractorConfig, IBoidAttractor } from 'lib/interfaces'

interface IFlock {
    boids: IBoid[],
    getPositions(): IPoint3d[],
    setTarget(value: Vector): void,
    getTarget(): Vector,
    addAttractor(config: Partial<IBoidAttractorConfig>): void,
    removeAttractor(value: IBoidAttractor): void,
    getAttractors(): IBoidAttractor[],
    run(): void
}

export { IFlock }