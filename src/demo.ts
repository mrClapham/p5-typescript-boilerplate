import p5 from "p5";
// import attractorsBasic from './sketch/attractors-basic'
// import attractorPerlin from './sketch/attractor-perlin'
// import { flockingSketch } from 'sketch/flockingSketch/index'
import { noiseOrbitSketch } from "./sketch/noiseOrbitSketch/index";
import imageGlitchSketch from "./sketch/imageGlitch";

document.addEventListener("DOMContentLoaded", () => {
  //const sketchInstance = new p5(circlesDemo, "root");
  //const attractorsInstance = new p5(attractorsBasic, "root");
  // const perlinInstance = new p5(attractorPerlin({ width: 900, height: 600, gridX: 20, gridY: 20 }), "root");
  const attractors: HTMLElement = document.querySelector(
    "#attractors"
  ) as HTMLElement;
  const root: HTMLElement = document.querySelector("#root") as HTMLElement;
  if (root) {
    const ss = imageGlitchSketch({ col: "#0033ff" });
    console.log(ss);
    setTimeout(
      () =>
        ss.update({
          imageUrl:
            "https://images.unsplash.com/photo-1604227878600-00157ecb7c74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFsbG93ZWVuJTIwcHVtcGtpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        }),
      4000
    );

    // const noiseOrbitSketchInstance = new p5(noiseOrbitSketch({ width: 1000, height: 1000 }), root);
  }
});
