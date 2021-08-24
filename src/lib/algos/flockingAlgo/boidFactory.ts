import { IBoid, IBoidConfig, IRunConfig } from 'lib/interfaces';
import * as p5 from "p5";
import { Vector } from "p5";

export const defaultConfig: IBoidConfig = {
    r: 1.0,
    maxspeed: 1.2,
    maxforce: 0.25,
    coheisionDistance: 50,
}

const defaultRunConfig: IRunConfig = {
    width: 100,
    height: 100,
    depth: 50
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
    const { width, height, depth } = runConfig
    let _width = width;
    let _height = height;
    let _depth = depth;

    const _config: IBoidConfig = { ...defaultConfig, ...config };

    const { r,
        maxspeed,
        maxforce,
        coheisionDistance
    } = _config;

    let _coheisionDistance = coheisionDistance;
    let _maxspeed = maxspeed;
    let _maxforce = maxforce;

    return {
        acceleration,
        ...{ defaultConfig, ...config },
        //// RUN
        run(boids: IBoid[], runConfig: IRunConfig): void {
            const { width, height, depth } = runConfig;
            _width = width;
            _height = height;
            _depth = depth;
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
                steer.mult(_maxspeed);
                steer.sub(_velocity);
                steer.limit(_maxforce);
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
                sum.mult(_maxspeed);
                const steer: Vector = Vector.sub(sum, this.velocity);
                steer.limit(_maxforce);
                return steer;
            } else {
                const steer = new Vector();
                steer.set(0, 0, 0,)
                return steer;
            }
        },

        //// COHEASON
        cohesion(boids: IBoid[]): Vector {
            const sum = new Vector();
            sum.set(0, 0, 0);
            // Start with empty vector to accumulate all locations
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
                const d = _pos.dist(boids[i].getPosition());
                if ((d > 0) && (d < _coheisionDistance)) {
                    sum.add(boids[i].getPosition()); // Add location
                    count++;
                }
            }
            if (count > 0) {
                sum.div(count);
                const seeker = this.seek(sum);
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

            // Normalize desired and scale to maximum speed
            desired.normalize();
            desired.mult(_maxspeed);
            // Steering = Desired minus Velocity
            const steer = Vector.sub(desired, _velocity);
            steer.limit(_maxforce);  // Limit to maximum steering force
            return steer;
        },
        /// BORDERS
        borders(): void {
            if (_bounceBorders) {
                if (_pos.x < -r) {
                    _pos.x = r;
                    _velocity.x *= -1
                }
                if (_pos.y < -r) {
                    _pos.y = r;
                    _velocity.y *= -1
                }
                /////////
                if (_pos.z < -r) {
                    _pos.z = r;
                    _velocity.z *= -1
                }
                //////// ------------- ////////
                //////// ------------- ////////
                if (_pos.x > _width + r) {
                    _pos.x = _width - r;
                    _velocity.x *= -1
                }
                if (_pos.y > _height + r) {
                    _pos.y = _height - r;
                    _velocity.y *= -1
                }
                ////////
                if (_pos.z > _depth + r) {
                    _pos.z = _depth - r;
                    _velocity.z *= -1
                }
            } else {
                if (_pos.x < -r) _pos.x = _width + r;
                if (_pos.y < -r) _pos.y = _height + r;
                if (_pos.z < -r) _pos.z = _depth + r;

                if (_pos.x > _width + r) _pos.x = -r;
                if (_pos.y > _height + r) _pos.y = -r;
                if (_pos.z > _depth + r) _pos.z = -r;

            }
        },
        /// UPDATE
        update(): void {
            // Update velocity
            _velocity.add(this.acceleration);
            // Limit speed
            _velocity.limit(_maxspeed);
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
        },
        //=== PUBLIC API ====

        setCohesionDistance(value: number): void {
            _coheisionDistance = value;
        },
        getCohesionDistance(): number {
            return _coheisionDistance;
        },
        setMaxSpeed(value: number): void {
            _maxspeed = value
        },
        getMaxSpeed(): number {
            return _maxspeed;
        },
        setMaxForce(value: number): void {
            _maxforce = value
        },
        getMaxForce(): number {
            return _maxforce;
        }
    }
}

export const create = (pos: [number, number, number] = [10, 10, 0], config: Partial<IBoidConfig> = {}): IBoid => {
    const [x, y, z] = pos
    const startPos: p5.Vector = new p5.Vector();
    startPos.set(x, y, z);
    const vel: p5.Vector = p5.Vector.random3D();
    const acc: p5.Vector = p5.Vector.random3D();
    const boidConfig: IBoidConfig = { ...defaultConfig, ...config }

    return makeBoid(
        startPos, vel, acc, boidConfig
    );
}