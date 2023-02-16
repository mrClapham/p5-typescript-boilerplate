import { IDraw, IDrawConfig } from "lib/interfaces/IDraw";
import { IGenericConfig } from "lib/interfaces/IGenericConfig";

let _config: IDrawConfig = {
  width: 800,
  height: 800
};

/**
 * A function which runs another function in a loop
 * @param render the render function to be run in a loop. It may be paused and re-started with the 'play' and 'pause' methods.
 */
const draw = (
  render: (config?: IDrawConfig) => void,
  config: IGenericConfig ={}
): IDraw => {
  _config = { ..._config, ...config };
  let request: number;
  const performAnimation = (): void => {
    // console.log('Perform animation')
    request = requestAnimationFrame(performAnimation);
    //animate something
    render(_config);
  };
  requestAnimationFrame(performAnimation);

  const play: () => void = (): void => {
    requestAnimationFrame(performAnimation);
  };

  const pause: () => void = (): void => {
    window.cancelAnimationFrame(request);
  };

  const update: (newConfig: IGenericConfig) => void = (newConfig): void => {
    _config = { ..._config, ...newConfig };
  };

  performAnimation();
  return { play, pause, update };
};

export { draw };
