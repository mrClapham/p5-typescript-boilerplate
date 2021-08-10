// export * from "lib/createCanvas";
// export * from "lib/draw";
// export * from "lib/listeners";
// export * from "lib/factories";
// export * from "lib/algos";


// export * from "sketch";
export * from "./lib/algos";
export { flockingSketch } from './sketch/flockingSketch'

// export * from "./lib/simpleMouseTrack";

export const hello = 'Hello world';
export const testExport = (x: string): string => `Hello world ${x}`;

export default {
    hello, testExport
}