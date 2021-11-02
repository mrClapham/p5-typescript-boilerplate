import { renderFactory } from "lib/factories/renderFactory";
import { imageGlitchRenderer } from "lib/renderers/imageGlitchRenderer";
import { IDraw } from 'lib/interfaces/IDraw';

export default (config = {}): IDraw => renderFactory(imageGlitchRenderer, "root", 100, 100, true, "glitch", config);
