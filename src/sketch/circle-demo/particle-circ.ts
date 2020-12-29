import * as p5 from 'p5';
const create  = (position, s: p5 ): Object => {

let acceleration: p5.Vector | null = null;
let lifespan = 255;
let velocity: p5.Vector | null = null;
let newPos: p5.Vector | null; 
let sketch: p5 | null  = null

  const update = (): void => {
    if(lifespan === 255){
      newPos =  sketch.createVector(sketch.random(400), sketch.random(400));
    }
    lifespan > 0 ? lifespan = lifespan - 1 : lifespan = 255;
  };

  const display = (s: p5): void => {
    newPos = newPos.add(velocity).add(acceleration);
    sketch.stroke(200, lifespan);
    sketch.strokeWeight(2);
    sketch.fill(127, lifespan);
    sketch.ellipse(newPos.x, newPos.y, 12, 12);
    update();
  };

  sketch = s
  newPos = position.copy();
  velocity = s.createVector(s.random(-1, 1), s.random(-1, 0));
  acceleration = s.createVector(1.25, 0.05);
  return {...{update}, ...{display}};

};



export { create }