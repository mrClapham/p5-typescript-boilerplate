import { IDraw } from "lib/interfaces/IDraw";

export interface IDrawConfig {
  width?: number,
  height?: number
}

let _config: IDrawConfig = {
  width: 800,
  height: 800
}

/**
 * A function which runs another function in a loop
 * @param render the render function to be run in a loop. It may be paused and re-started with the 'play' and 'pause' methods.
 */
const draw = (render: (config?: IDrawConfig) => void, config: Partial<IDrawConfig> = {}): IDraw => {
  _config = { ..._config, ...config }
  let request: number;
  const performAnimation = (): void => {
    // console.log('Perform animation')
    request = requestAnimationFrame(performAnimation);
    //animate something
    render(config);
  };
  requestAnimationFrame(performAnimation);

  const play: () => void = (): void => {
    requestAnimationFrame(performAnimation);
  };

  const pause: () => void = (): void => {
    window.cancelAnimationFrame(request);
  };
  performAnimation()
  return { play, pause };
};

export { draw };
