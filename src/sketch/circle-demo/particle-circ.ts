import { createVector, random, stroke, strokeWeight, fill, ellipse } from "p5";

// let acceleration = createVector(0, 0.05);
// const velocity = createVector(random(-1, 1), random(-1, 0));
let lifespan = 255;

export default (position) => {
  let newPos = position.copy();
  update = () => {};
  display = () => {
    stroke(200, lifespan);
    strokeWeight(2);
    fill(127, lifespan);
    ellipse(position.x, position.y, 12, 12);
  };
};
