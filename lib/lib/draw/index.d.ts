import { IDraw } from "lib/interfaces/IDraw";
/**
 * A function which runs another function in a loop
 * @param render the render function to be run in a loop. It may be paused and re-started with the 'play' and 'pause' methods.
 */
declare const draw: (render: Function) => IDraw;
export { draw };
