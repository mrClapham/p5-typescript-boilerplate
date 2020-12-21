import p5 from "p5";
import circlesDemo from "./sketch/circle-demo";

document.addEventListener("DOMContentLoaded", () => {
  const sketchInstance = new p5(circlesDemo, "root");
});
