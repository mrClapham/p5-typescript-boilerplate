import * as p5 from 'p5'
import { IForcable } from './attractor-node'

const create = (position, s: p5): Object => {
  let force: p5.Vector | null
  let sketch: p5 | null = null
  const strength = 0.25

  let velocity: p5.Vector | null
  let accelleration: p5.Vector | null

  const applyForce = (node: IForcable): void => {
    const nodePos = node.getPosition()
    // sketch.stroke('rgba(255,0,255,0.05)')
    // sketch.strokeWeight(2)
    sketch.fill(127, 1)
    sketch.ellipse(position.x, position.y, 10, 10)
    const mouse = sketch.createVector(sketch.mouseX, sketch.mouseY)
    const normalMouse = p5.Vector.sub(mouse, position).add(position) //

    force = p5.Vector.sub(nodePos, position) // .setMag(4)

    //sketch.line(nodePos.x, nodePos.y, force.x, force.y)
    // node.setForce(force)
  }

  const display = (s: p5): void => {
    // sketch.translate(sketch.width / 2, sketch.height / 2)
    //const dest =
  }

  sketch = s
  force = sketch.createVector(3, 3)
  //   newPos = position.copy()
  //   velocity = s.createVector(s.random(-1, 1), s.random(-1, 0))
  //   acceleration = s.createVector(1.25, 0.05)
  return { ...{ applyForce }, ...{ display } }
}

export { create }
