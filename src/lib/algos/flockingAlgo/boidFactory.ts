import { IBoid } from "lib/interfaces";
import * as p5 from "p5";
import { Vector } from "p5";
import { IBoidConfig, IRunConfig } from "lib/interfaces";

const defaultConfig: IBoidConfig = {
    r: 3.0,
    maxspeed: 4,
    maxforce: 0.25
}

const targVector = new Vector();
targVector.set(0, 0, 0)
const defaultRunConfig: IRunConfig = {
    width: 100,
    height: 100,
    depth: 50,
    target: targVector
}

export const makeBoid = (
    pos: Vector,
    velocity: Vector,
    acceleration: Vector,
    config: IBoidConfig = defaultConfig,
    runConfig: IRunConfig = defaultRunConfig
): IBoid => {
    /////////////////////////////////////// function begins ///////////////
    let _pos = pos;
    let _velocity = velocity;
    const _bounceBorders = true;
    // run config
    const { width, height, depth, target } = runConfig
    let _width = width;
    let _height = height;
    const _depth = depth
    let _target = target;

    const { r,
        maxspeed,
        maxforce } = config;

    return {
        acceleration,
        ...{ defaultConfig, ...config },
        //// RUN
        run(boids: IBoid[], runConfig: IRunConfig): void {
            const { width, height, target } = runConfig;
            _width = width;
            _height = height;
            _target = target;
            this.flock(boids);
            this.borders();
            this.update();
        },
        applyForce(force: Vector): void {
            this.acceleration.add(force);
        },
        ///// SEPERATE
        separate(boids: IBoid[]): Vector {
            const desiredseparation = 25.0;
            const steer = new Vector();
            steer.set(0, 0, 0);
            let count = 0;
            // For every boid in the system, check if it's too close
            for (let i = 0; i < boids.length; i++) {
                const d = new Vector();
                d.set(0, 0, 0);
                const distance = _pos.dist(boids[i].getPosition());

                // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
                if ((distance > 0) && (distance < desiredseparation)) {
                    // Calculate vector pointing away from neighbor
                    const diff = Vector.sub(_pos, boids[i].getPosition());
                    diff.normalize();
                    diff.div(distance);        // Weight by distance
                    steer.add(diff);
                    count++;            // Keep track of how many
                }
            }
            // Average -- divide by how many
            if (count > 0) {
                steer.div(count);
            }

            // As long as the vector is greater than 0
            if (steer.mag() > 0) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.normalize();
                steer.mult(maxspeed);
                steer.sub(_velocity);
                steer.limit(maxforce);
            }
            return steer;
        },
        //// ALIGN
        align(boids: IBoid[]): Vector {
            const neighbordist = 150;
            const sum = new Vector();
            sum.set(0, 0, 0)
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
                const d = _pos.dist(boids[i].getPosition());
                if ((d > 0) && (d < neighbordist)) {
                    sum.add(boids[i].velocity);
                    count++;
                }
            }
            if (count > 0) {
                sum.div(count);
                sum.normalize();
                sum.mult(maxspeed);
                const steer: Vector = Vector.sub(sum, this.velocity);
                steer.limit(this.maxforce);
                return steer;
            } else {
                const steer = new Vector();
                steer.set(0, 0, 0,)
                return steer;
            }
        },

        //// COHEASON
        cohesion(boids: IBoid[]): Vector {
            const neighbordist = 50;
            const sum = new Vector();
            sum.set(0, 0, 0);
            // Start with empty vector to accumulate all locations
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
                const d = _pos.dist(boids[i].getPosition());
                if ((d > 0) && (d < neighbordist)) {
                    sum.add(boids[i].getPosition()); // Add location
                    count++;
                }
            }
            if (count > 0) {
                sum.div(count);

                const seeker = this.seek(sum);
                console.log(" seeker :: ", seeker);
                return seeker;  // Steer towards the location

            } else {
                const sum = new Vector();
                sum.set(0, 0, 0,)
                return sum;
            }
        },
        //// FLOCK
        flock(boids: IBoid[]): void {
            const sep = this.separate(boids);   // Separation
            const ali = this.align(boids);      // Alignment
            const coh = this.cohesion(boids);   // Cohesion


            // Arbitrarily weight these forces
            sep.mult(1.5);
            ali.mult(1.0);
            coh.mult(1.0);

            // Add the force vectors to acceleration
            this.applyForce(sep);
            this.applyForce(ali);
            this.applyForce(coh);
        },
        ///// SEEK
        seek(targ: Vector): Vector {
            //
            const desired = Vector.sub(targ, _pos);  // A vector pointing from the location to the target

            //     console.log('DESIRED ', desired);
            // Normalize desired and scale to maximum speed
            desired.normalize();
            desired.mult(maxspeed);
            // Steering = Desired minus Velocity
            const steer = Vector.sub(desired, _velocity);
            steer.limit(maxforce);  // Limit to maximum steering force
            console.log('STEER ::: ', steer);
            return steer;
        },
        /// BORDERS
        borders(): void {
            if (_bounceBorders) {
                if (_pos.x < -this.r) {
                    _pos.x = this.r;
                    _velocity.x *= -1
                }
                if (_pos.y < -this.r) {
                    _pos.y = this.r;
                    _velocity.y *= -1
                }
                /////////
                if (_pos.z < -this.r) {
                    _pos.z = this.r;
                    _velocity.z *= -1
                }
                //////// ------------- ////////
                //////// ------------- ////////
                if (_pos.x > _width + this.r) {
                    _pos.x = _width - this.r;
                    this.velocity.x *= -1
                }
                if (_pos.y > _height + this.r) {
                    _pos.y = _height - this.r;
                    this.velocity.y *= -1
                }
                ////////
                if (_pos.z > _depth + this.r) {
                    _pos.z = _depth - this.r;
                    this.velocity.z *= -1
                }
            } else {
                if (_pos.x < -this.r) _pos.x = _width + this.r;
                if (_pos.y < -this.r) _pos.y = _height + this.r;
                if (_pos.x > _width + this.r) _pos.x = -this.r;
                if (_pos.y > _height + this.r) _pos.y = -this.r;
            }
        },
        /// UPDATE
        update(): void {
            // Update velocity
            _velocity.add(this.acceleration);
            // Limit speed
            _velocity.limit(this.maxspeed);
            _pos.add(_velocity);
            // Reset accelertion to 0 each cycle
            this.acceleration.mult(0);
            _pos = _pos.add(_velocity);
        },
        getPosition(): Vector {
            return _pos
        },
        setPosition(value: Vector) {
            _pos = value;
        },
        get velocity(): Vector {
            return _velocity;
        },
        set velocity(value: Vector) {
            _velocity = value;
        }
    }
}

export const create = (pos: [number, number, number] = [10, 10, 0]): IBoid => {
    const [x, y, z] = pos
    const startPos: p5.Vector = new p5.Vector();
    startPos.set(x, y, z);
    const vel: p5.Vector = p5.Vector.random3D();
    const acc: p5.Vector = p5.Vector.random3D();
    console.log('Creating startVel :: ', vel)

    return makeBoid(
        startPos, vel, acc
    );
}