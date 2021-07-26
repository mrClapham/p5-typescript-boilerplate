import { IDraw } from "lib/interfaces/IDraw";
/**
 * A function which runs another function in a loop
 * @param render the render function to be run in a loop. It may be paused and re-started with the 'play' and 'pause' methods.
 */
const draw = (render: Function): IDraw => {
  let request: number;
  const _render = render;
  const performAnimation = (): void => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    _render && _render();
  };
  requestAnimationFrame(performAnimation);

  const play: Function = (): void => {
    requestAnimationFrame(performAnimation);
  };

  const pause: Function = (): void => {
    window.cancelAnimationFrame(request);
  };

  return { play, pause };
};

export { draw };
