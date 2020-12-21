import p5 from "p5";
import particleCirc from "./particle-circ";

export default (s) => {
  let x = 20;
  let pc;

  s.setup = () => {
    let pVector = p5.createVector(10, 20);
    console.log(pVector);

    s.createCanvas(600, 600);
    pc = particleCirc(createVector(10, 20));
  };

  s.draw = () => {
    x++;
    s.background(0);
    s.circle(x, 100, 100);
    pc.display();
  };
};
