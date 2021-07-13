import { Vector } from "p5";

interface IBoidConfig {
    r: number,
    maxspeed: number,  // Maximum speed
    maxforce: number
}

interface IRunConfig { width: number, height: number, target: Vector }

interface IBoid extends IBoidConfig {
    acceleration: Vector,
    run(boids: IBoid[], runConfig: IRunConfig): void,
    applyForce(force: Vector): void,
    separate(boids: IBoid[]): Vector;
    align(boids: IBoid[]): Vector,
    cohesion(boids: IBoid[]): Vector,
    flock(boids: IBoid[]): void,
    seek(target: Vector): Vector,
    borders(): void,
    update(): void,
    getPosition(): Vector,
    setPosition(value: Vector): void,
    velocity: Vector
}

export { IBoid, IBoidConfig, IRunConfig }