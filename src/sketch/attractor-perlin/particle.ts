import * as p5 from 'p5'

const create = (position: p5.Vector, s: p5): Object => {
    let acceleration: p5.Vector
    let velocity: p5.Vector

    const update = (): void => {
        position.add(acceleration)
    }

    const display = (): void => {
        s.fill(255, 0, 255);
        s.circle(position.x, position.y, 10)
        update()
    }

    // set initial values
    velocity = p5.Vector.random2D().mult(1.5)
    acceleration = p5.Vector.random2D().mult(1.5)

    return {
        ...{ update },
        ...{ display }
    }
}

export { create }
