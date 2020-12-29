import p5 from "p5";
import circlesDemo from "./sketch/circle-demo";
import attractorsBasic from './sketch/attractors-basic'

document.addEventListener("DOMContentLoaded", () => {
  const sketchInstance = new p5(circlesDemo, "root");
  const attractorsInstance = new p5(attractorsBasic, "attractors");
});
