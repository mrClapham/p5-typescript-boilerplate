import * as p5 from 'p5'

export interface IForcable {
  setForce(value: p5.Vector): void
  setDestination(value: p5.Vector)
  getPosition(): p5.Vector
}

const create = (position: p5.Vector, s: p5): Object => {
  console.log('POS ',position.y)
  let acceleration: p5.Vector | null = null
  let velocity: p5.Vector | null = null
  let force: p5.Vector | null = null
  let newPos: p5.Vector | null
  let sketch: p5 | null = null
  let destination: p5.Vector | null
  let direction: p5.Vector | null

  const update = (): void => {
    if (newPos.x < 0) {
      newPos.x = 0
      velocity.x = -velocity.x
    }

    if (newPos.x > s.width) {
      velocity.x = -velocity.x
    }

    if (newPos.y < 0) {
      velocity.y = -velocity.y
    }

    if (newPos.y > s.height) {
      velocity.y = -velocity.y
    }

    direction = p5.Vector.sub(newPos, destination)
    direction.setMag(.02)
    velocity.sub(direction)
    newPos.add(velocity) //.add(force) //.add(acceleration)

  }

  const display = (s: p5): void => {
    //force = sketch.createVector(0.001, 0.01)
    //sketch.clear()
    sketch.stroke(200, 255)
    sketch.strokeWeight(2)
    sketch.fill(127, 255)
    sketch.ellipse(newPos.x, newPos.y, 15, 15)
    sketch.fill(0, 255, 255)
    sketch.ellipse(destination.x, destination.y, 20, 20)
    sketch.stroke('rgba(100,100,100,.5)')
    sketch.line(0, 0, direction.x, direction.y)
    update()
  }

  const getPosition = (): p5.Vector => {
    return newPos
  }

  const setForce = (value: p5.Vector): void => {
    force = value
  }

  const setDestination = (value: p5.Vector): void => {
    destination = value
    //direction.setMag(100)
    display(sketch)
  }
  // set initial values
  sketch = s
  newPos = position.copy()
  console.log(newPos.y)
  velocity = p5.Vector.random2D().mult(1.5)
  acceleration = s.createVector(0, 0)
  force = s.createVector(0)
  destination = s.createVector(0, 0)
  direction = s.createVector(0, 0)
  return {
    ...{ update },
    ...{ display },
    ...{ setForce },
    ...{ getPosition },
    ...{ setDestination },
  }
}

export { create }
