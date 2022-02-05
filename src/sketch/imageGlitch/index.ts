import { renderFactory } from "lib/factories/renderFactory";
import { imageGlitchRenderer } from "lib/renderers/imageGlitchRenderer";
import { IDraw } from 'lib/interfaces/IDraw';
//const imageUrl = "https://i2-prod.mirror.co.uk/incoming/article25556419.ece/ALTERNATES/s1200d/1_Portrait-of-British-Short-hair-blue-cat-with-yellow-eyes.jpg"
export default (config = {}, target: string): IDraw => renderFactory(imageGlitchRenderer, target, config, false, "glitchy");
