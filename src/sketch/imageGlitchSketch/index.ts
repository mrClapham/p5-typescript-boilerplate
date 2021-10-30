import { renderFactory } from "lib/factories/renderFactory";
import { simpleCircleRenderer } from "lib/renderers/simpleCircleRenderer";
import { IDraw } from '../../lib/interfaces/IDraw';

const simpleCircle = (): IDraw => renderFactory(simpleCircleRenderer, 'root', 200, 200, true, 'circle-example');

export { simpleCircle }

