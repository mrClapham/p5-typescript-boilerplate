import * as p5 from 'p5'
import { create as createNode } from './attractor-node'
import { create as creatAttractor } from './attractor'
const nodes = []
let att1 = null
let att2 = null
let att1Vector = null
let att2Vector = null

export default (s: p5) => {
  const { createVector } = s
  // for (let i = 0; i < 4; i++) {
  //   att1Vector = createVector(200, 100)
  //   att2Vector = createVector(400, 100)
  //   att1 = creatAttractor(att1Vector, s)
  //   att2 = creatAttractor(att2Vector, s)
  // }
  s.setup = () => {
    s.createCanvas(600, 600)
    for(let i:number = 0; i< 6; i++){
      const origin =  Math.random() * 100
      const middle = s.createVector( s.width/2, s.height/2 ) 
      console.log(`orogin: ${origin}`)
      const vec = p5.Vector.random2D().mult(origin).add(middle)
          nodes.push(createNode(vec, s))
    }
  }

  s.draw = () => {
    // s.clear()
    s.fill(255, 0, 255, 100)

    const mouse = s.createVector(s.mouseX, s.mouseY)
    nodes.forEach((n) => {
      //att1.applyForce(n)
      n.setDestination(mouse)
      //n.display()
    })
    // att1.display()
    //att2.display()
  }
}
