import { IDrawConfig } from "lib/interfaces/IDraw";

export interface IGenericConfig extends IDrawConfig {
  [key: string]: any;
}
