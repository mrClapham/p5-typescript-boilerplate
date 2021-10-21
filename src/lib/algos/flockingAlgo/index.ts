import { create as createBoid, defaultConfig as boidDefaultConfig } from './boidFactory';
import { create as createBoidAttractor } from './boidAttractorFactory';

import { IBoid, IBoidConfig, IBoidAttractor, IFlock, IBoidAttractorConfig, IPoints3d } from '../../interfaces';


import { Vector } from 'p5';

export default (width = 100,
    height = 100,
    depth = 10,
    numBoids = 20,
    boidsConfig: Partial<IBoidConfig> = boidDefaultConfig

): IFlock => {

    let _target = new Vector();
    let _width = width;
    let _height = height;
    let _depth = depth;
    const startPos: [number, number, number] = [width / 2, height / 2, depth]
    const _boidConfig = { ...boidDefaultConfig, ...boidsConfig }
    const boids: IBoid[] = [];
    /////------
    /////------
    /////------
    /////------
    /////------
    let attractors: IBoidAttractor[] = []
    for (let i = 0; i < numBoids; i++) {
        boids.push(createBoid(startPos, _boidConfig))
    }

    return {
        boids,
        getPositions(): IPoints3d[] {
            return boids.map(({ getPosition }) => {
                const { x, y, z } = getPosition();
                const rotation = getPosition().heading();
                return { x, y, z, rotation }
            });
        },
        setTarget(value: Vector): void {
            _target = value;
        },
        getTarget(): Vector {
            return _target;
        },
        setWidth(value: number): void {
            _width = value;
        },
        getWidth(): number {
            return _width;
        },
        setHeight(value: number): void {
            _height = value;
        },
        getHeight(): number {
            return _height;
        },
        setDepth(value: number): void {
            _depth = value;
        },
        getDepth(): number {
            return _depth;
        },
        addAttractor(config: Partial<IBoidAttractorConfig>): IBoidAttractor {
            const att = createBoidAttractor(config);
            attractors.push(att);
            return att;
        },
        removeAttractor(value: IBoidAttractor): void {
            attractors = attractors.filter(d => d !== value);
        },
        getAttractors() {
            return attractors
        },
        //// -- BOUD GETTERS AND SETTERS 
        setBoidCohesionDistance(value: number): void {
            boids.forEach(b => b.setCohesionDistance(value));
        },
        getBoidCohesionDistance(): number {
            return boids[0].getCohesionDistance()
        },
        setBoidMaxSpeed(value: number): void {
            boids.forEach(b => b.setMaxSpeed(value));
        },
        getBoidMaxSpeed(): number {
            return boids[0].getMaxSpeed();
        },
        setBoidMaxForce(value: number): void {
            boids.forEach(b => b.setMaxForce(value));
        },
        getBoidMaxForce(): number {
            return boids[0].getMaxForce();
        },

        run(): void {
            boids.forEach(b => b.run(boids, { width: _width, height: _height, depth: _depth }))
            attractors.forEach(a => a.run(boids));
        }
    }
}