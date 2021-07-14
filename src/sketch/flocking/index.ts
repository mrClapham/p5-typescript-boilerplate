import * as p5 from 'p5';
import flockingAlgo, { setAttractorGrid } from 'lib/algos/flockingAlgo';
import { Vector } from 'p5';
import { IBoidAttractor } from 'lib/interfaces';
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
const defaultConfig = { width: 1000, height: 1000, depth: 0, numBoids: 70 }

export default (overrides = {}) => (s: p5): void => {
    const { width, height, depth, numBoids } = { ...defaultConfig, ...overrides }
    //let flockGrid: IPoint[][] = []
    const targ = new Vector();
    targ.set(100, 100, 100)
    const flock = flockingAlgo(width, height, depth, numBoids, targ);
    flock.addAttractor({ xPos: 300, yPos: 300, excusionZone: 40, attraction: 4 });
    const mouseTracker: IBoidAttractor = flock.addAttractor({ xPos: 300, yPos: 300, excusionZone: 50, attraction: -.02 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = e => {
        const { clientX, clientY } = e;
        mouseX = clientX;
        mouseY = clientY;
        const vec = new Vector();
        vec.set(clientX, clientY, 0)
        mouseTracker.setPosition(vec);
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
        s.background('rgba(225,255,0, 0.005)');


        // flockGrid.forEach((element: IPoint[]): void => {
        //     element.forEach((element2: IPoint): void => {
        //         s.stroke(200, 255);
        //         s.strokeWeight(2);
        //         s.fill(127, 222, 222);
        //         s.ellipse(element2.x * 10, element2.y * 10, 12, 12);
        //     })
        // });
        flock.getPositions().forEach(p => {
            s.stroke(255, 0, 100);
            s.strokeWeight(1);
            s.fill(255, 0, 255);
            s.ellipse(p.x, p.y, .3 * -p.z, .3 * -p.z);
        })

        // flock.getAttractors().forEach(a => {
        //     const { x, y } = a.getPosition();
        //     const exclusionZone: number = a.getExclusionZone();
        //     s.stroke(255, 100, 100);
        //     s.strokeWeight(1);
        //     s.fill('rgba(255, 255, 255, .01)');
        //     s.ellipse(x, y, exclusionZone, exclusionZone);
        // })

        // s.fill(255, 0, 255);
        // const mouseVector = new Vector();
        // mouseVector.set(mouseX, mouseY, 0);
        // flock.setTarget(mouseVector);
        // const { x, y } = flock.getTarget();
        // s.ellipse(x, y, 20, 20);


    };
};

