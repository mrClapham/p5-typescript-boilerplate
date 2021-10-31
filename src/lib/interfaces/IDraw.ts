import { IGenericConfig } from "lib/interfaces/IGenericConfig";

export interface IDraw {
  play: () => void;
  pause: () => void;
  update: (config: IGenericConfig) => void;
}

export interface IDrawConfig {
  width?: number;
  height?: number;
}
