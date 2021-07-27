import p5 from "p5";
// import circlesDemo from "./sketch/circle-demo";
// import attractorsBasic from './sketch/attractors-basic'
// import attractorPerlin from './sketch/attractor-perlin'
import flocking from 'sketch/flocking/index'

document.addEventListener("DOMContentLoaded", () => {
  //const sketchInstance = new p5(circlesDemo, "root");
  //const attractorsInstance = new p5(attractorsBasic, "root");
  // const perlinInstance = new p5(attractorPerlin({ width: 900, height: 600, gridX: 20, gridY: 20 }), "root");
  const attractors: HTMLElement = document.querySelector('#attractors')
  const flockingInstance = new p5(flocking({ width: 900, height: 600 }), attractors);
});
