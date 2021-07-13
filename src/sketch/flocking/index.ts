import * as p5 from 'p5';
import flockingAlgo, { setAttractorGrid } from 'lib/algos/flockingAlgo';
import { Vector } from 'p5';
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
//// THIS IS THE P5 - NOT THE ALGO
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
const fps = 60
const defaultConfig = { width: 800, height: 800, depth: 0, numBoids: 10 }

export default (overrides = {}) => (s: p5): void => {
    const { width, height, depth, numBoids } = { ...defaultConfig, ...overrides }
    //let flockGrid: IPoint[][] = []
    const targ = new Vector();
    targ.set(100, 100, 100)
    const flock = flockingAlgo(width, height, depth, numBoids, targ)

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = e => {
        const { clientX, clientY } = e;
        mouseX = clientX;
        mouseY = clientY;
        console.log(mouseX);
    }

    s.setup = () => {
        //flockGrid = setAttractorGrid();
        const canv = s.createCanvas(width, height);
        canv.mouseMoved(onMouseMove)
        s.frameRate(fps);

    };

    s.draw = () => {
        flock.run();
        // s.clear()
        // flockGrid.forEach((element: IPoint[]): void => {
        //     element.forEach((element2: IPoint): void => {
        //         s.stroke(200, 255);
        //         s.strokeWeight(2);
        //         s.fill(127, 222, 222);
        //         s.ellipse(element2.x * 10, element2.y * 10, 12, 12);
        //     })
        // });
        flock.getPositions().forEach(p => {
            s.stroke(255, 0, 255);
            s.strokeWeight(1);
            s.fill(127, 222, 222);
            s.ellipse(p.x, p.y, .25 * p.z, .25 * p.z);
        })
        s.fill(255, 0, 255);
        const mouseVector = new Vector();
        mouseVector.set(mouseX, mouseY, 0);
        flock.setTarget(mouseVector);
        const { x, y } = flock.getTarget();
        s.ellipse(x, y, 20, 20);

        //console.log(flock.getPositions())

        //newPos = newPos.add(velocity).add(acceleration);


    };
};

