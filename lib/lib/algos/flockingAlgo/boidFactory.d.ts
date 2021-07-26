import { IBoid, IBoidConfig, IRunConfig } from 'lib/interfaces';
import { Vector } from "p5";
export declare const defaultConfig: IBoidConfig;
export declare const makeBoid: (pos: Vector, velocity: Vector, acceleration: Vector, config?: IBoidConfig, runConfig?: IRunConfig) => IBoid;
export declare const create: (pos?: [number, number, number], config?: Partial<IBoidConfig>) => IBoid;
