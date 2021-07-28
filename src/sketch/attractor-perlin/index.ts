import * as p5 from 'p5'
import { create, IParticle } from './particle';

interface IPerlinGridItem { angle: number, noiseValue: number, vec: p5.Vector, x: number, y: number }

const defaultConfig = { width: 800, height: 800, gridX: 6, gridY: 4 }
export default (overrides = {}) => (s: p5): void => {
  const config = { ...defaultConfig, ...overrides }
  const { width, height, gridX, gridY } = config
  const gridXsize = width / gridX
  const gridYsize = height / gridY
  const gridPositions: IPerlinGridItem[][] = []
  const incrementOffset = 0.01
  const particles: IParticle[] = [];
  let xOff = 0;
  let yOff = 0;

  s.setup = (): void => {
    for (let i = 0; i < 10; i++) {
      const v = new p5.Vector();
      particles[i] = create(v, s)
    }
    const { noise, TWO_PI } = s
    const { Vector } = p5;
    for (let i = 0; i < gridY; i++) {
      const _grid: IPerlinGridItem[] = []

      for (let ii = 0; ii < gridX; ii++) {
        xOff += incrementOffset;

        // const vecRand = Vector.random2D().mult(10)
        const noiseValue = noise(xOff, yOff)
        const angle = noiseValue * TWO_PI;

        //const vec = s.createVector(0, 2).mult(10)

        const vec = Vector.fromAngle(angle).mult(15)
        //vec.rotate(TWO_PI * noiseValue)
        console.log(noiseValue)
        _grid.push({ angle, noiseValue, vec, x: gridXsize / 2 + (gridXsize * ii), y: gridYsize / 2 + (gridYsize * i) })
      }
      yOff += incrementOffset;

      gridPositions.push(_grid)
    }
    s.createCanvas(width, height)
  }

  s.draw = (): void => {
    s.clear()
    particles.forEach(element => {
      element.display();
    });
    gridPositions.forEach((e) => {
      e.forEach((ee) => {
        s.push()
        s.fill(255, 0, 255, 100 / ee.noiseValue)
        //s.rotate(ee.vec.heading())
        s.translate(ee.x, ee.y)
        s.line(0, 0, ee.vec.x, ee.vec.y)
        s.circle(0, 0, 3)
        //s.rect(0,0, gridXsize, gridYsize)
        s.pop()
      });

    });
    //s.fill(255, 0, 255, 100)
    //s.rect(10,10,100,100)

    // const mouse = s.createVector(s.mouseX, s.mouseY)

  }
}
