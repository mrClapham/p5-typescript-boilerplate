import * as p5 from 'p5'

const defaultConfig = {width: 800, height: 800, gridX: 6, gridY: 4}
export default (overrides = {}) => (s: p5 ) => {
    console.log('overrides:: ', overrides)
    const config = {...defaultConfig, ...overrides}
      const {width, height, gridX, gridY} = config
      const gridXsize = width/gridX
      const gridYsize = height/gridY
    const gridPositions = []

  s.setup = () => {
      for(let i = 0; i< gridY; i++){
          const _grid = []
          for(let ii = 0; ii< gridX; ii++){
              const vec = p5.Vector.random2D().mult(10)
            _grid.push({vec, x: gridXsize/2 + (gridXsize * ii), y: gridYsize/2 + (gridYsize * i)})
          }
          gridPositions.push(_grid)
      }
    s.createCanvas(width, height)
  }

  s.draw = () => {
    s.clear()
    gridPositions.forEach((e, i) => {
        e.forEach((ee,ii) => {
        s.push()
        s.fill(255, 0, 255, i * ii * 20 )
        s.translate(ee.x,ee.y)
        s.line(0,0,ee.vec.x, ee.vec.y)
        s.circle(0, 0, 6)
        //s.rect(0,0, gridXsize, gridYsize)
        s.pop()
        });

    });
    //s.fill(255, 0, 255, 100)
    //s.rect(10,10,100,100)

    const mouse = s.createVector(s.mouseX, s.mouseY)

  }
}
