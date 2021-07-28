import { Vector } from "p5";

export interface IBoidConfig {
    r: number,
    maxspeed: number,  // Maximum speed
    maxforce: number,
    coheisionDistance: number,
}

export interface IRunConfig {
    width: number,
    height: number,
    depth: number
}

export interface IBoid extends IBoidConfig {
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
    velocity: Vector,
    setCohesionDistance(value: number): void,
    getCohesionDistance(): number,
    setMaxSpeed(value: number): void,
    getMaxSpeed(): number,
    setMaxForce(value: number): void,
    getMaxForce(): number,

}