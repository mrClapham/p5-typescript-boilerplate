//import p5 from "p5";
// import attractorsBasic from './sketch/attractors-basic'
// import attractorPerlin from './sketch/attractor-perlin'
// import { flockingSketch } from 'sketch/flockingSketch/index'
// import { noiseOrbitSketch } from "./sketch/noiseOrbitSketch/index";
import imageGlitchSketch from "./sketch/imageGlitch";

document.addEventListener("DOMContentLoaded", () => {
  //const sketchInstance = new p5(circlesDemo, "root");
  //const attractorsInstance = new p5(attractorsBasic, "root");
  // const perlinInstance = new p5(attractorPerlin({ width: 900, height: 600, gridX: 20, gridY: 20 }), "root");


  // const attractors: HTMLElement = document.querySelector(
  //   "#attractors"
  // ) as HTMLElement;



  const root: HTMLElement = document.querySelector("#root") as HTMLElement;
  if (root) {
    const config = { width: 1000, dotSize: 50, imageUrl: 'https://i2-prod.mirror.co.uk/incoming/article25556419.ece/ALTERNATES/s1200d/1_Portrait-of-British-Short-hair-blue-cat-with-yellow-eyes.jpg' }
    const ss = imageGlitchSketch(config, 'root');
    console.log(ss);
    // setTimeout(
    //   () =>
    //     ss.update({
    //       imageUrl:
    //         //"https://nas-national-prod.s3.amazonaws.com/styles/article_hero_inline/s3/_2922260053_7abf7bb195_o.jpg?itok=PHVNg_0S"
    //         // "https://i.imgur.com/bJPvpYZ.jpeg"
    //         "https://i.imgur.com/jahcCUd_d.webp?maxwidth=520&shape=thumb&fidelity=high"
    //     }),
    //   1000
    // );

    // setTimeout(
    //   () =>
    //     ss.update({
    //       imageUrl:
    //         "https://i.guim.co.uk/img/media/5cbefc6ca39ec6e2aed5123400507980425652bf/0_0_7117_4268/master/7117.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0cb827433607dd6ca9309a1eae086cf9"
    //     }),
    //   8000
    // );
    setTimeout(
      () =>
        ss.update({
          imageUrl:
            "https://nas-national-prod.s3.amazonaws.com/styles/article_hero_inline/s3/_2922260053_7abf7bb195_o.jpg?itok=PHVNg_0S"
        }),
      4000
    );

    // const noiseOrbitSketchInstance = new p5(noiseOrbitSketch({ width: 1000, height: 1000 }), root);
  }
});
