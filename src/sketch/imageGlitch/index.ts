import { renderFactory } from "lib/factories/renderFactory";
import { imageGlitchRenderer } from "lib/renderers/imageGlitchRenderer";

export default (config = {}) =>
  renderFactory(imageGlitchRenderer, "root", 100, 100, true, "glitch", config);
