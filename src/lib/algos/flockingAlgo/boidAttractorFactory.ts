import { IBoid, IBoidAttractor, IBoidAttractorConfig } from 'lib/interfaces';
import { Vector } from 'p5';

const defaultConfig: IBoidAttractorConfig = {
    xPos: 0,
    yPos: 0,
    zPos: 0,
    excusionZone: 10,
    attraction: 1
}

export const create = (
    config: Partial<IBoidAttractorConfig> = {}): IBoidAttractor => {

    const {
        xPos,
        yPos,
        zPos,
        excusionZone,
        attraction
    } = { ...defaultConfig, ...config }

    let _attraction = 0 - attraction
    let _excusionZone = excusionZone
    let _position = new Vector();

    _position.set(xPos, yPos, zPos);
    return {
        run(boids: IBoid[]): void {
            for (let i = 0; i < boids.length; i++) {
                const boid = boids[i];
                const boidVec = new Vector();
                const { x, y } = boid.getPosition();
                boidVec.set(x, y);
                boidVec.sub(_position);
                if (boidVec.mag() < _excusionZone) {
                    boidVec.mult(_attraction)
                    boids[i].applyForce(boidVec);
                }
            }
        },
        setExclusionZone(value): void {
            _excusionZone = value;
        },
        getExclusionZone(): number {
            return _excusionZone
        },
        setAttraction(value): void {
            _attraction = 0 - value;
        },
        getAttraction(): number {
            return _attraction
        },
        setPosition(value: Vector): void {
            _position = value;
        },
        getPosition: function (): Vector {
            return _position
        }
    }
}

