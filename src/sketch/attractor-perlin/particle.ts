export interface IParticle {
    update(): void,
    display(): void
}

import * as p5 from 'p5'

const create = (position: p5.Vector, s: p5): IParticle => {
    // set initial values
    // const velocity = p5.Vector.random2D().mult(1.5)
    const acceleration = p5.Vector.random2D().mult(1.5)

    const update = (): void => {
        position.add(acceleration)
    }

    const display = (): void => {
        s.fill(255, 0, 255);
        s.circle(position.x, position.y, 10)
        update()
    }

    return {
        ...{ update },
        ...{ display }
    }
}

export { create }
