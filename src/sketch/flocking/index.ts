import * as p5 from 'p5';
import flockingAlgo from 'lib/algos/flockingAlgo';
import { defaultConfig as defaultBoidConfig } from 'lib/algos/flockingAlgo/boidFactory';
import { Vector } from 'p5';
import { IBoidAttractor, IBoidConfig } from 'lib/interfaces';

import * as dat from 'dat.gui';


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
const fps = 60;



const defaultConfig = {
    width: 1000,
    height: 1000,
    depth: 10,
    numBoids: 100,
    fullscreen: true,
    fill: 'rgba(95,95,95,1)',
    stroke: 'rgba(65,65,85,1)',
    backgroundfill: 'rgba(0,0,0,.02)',
    strokeWeight: 1
};

// export const createAttractorGrid = (width = 100, height = 100, xDivs = 10, yDivs = 10): { x: number, y: number }[][] => {
//     const xstep = width / (xDivs + 1);
//     const ystep = height / (yDivs + 1);
//     const _grid = [];
//     for (let i = 0; i < yDivs; i++) {
//         const _rowX = []
//         for (let ii = 0; ii < xDivs; ii++) {
//             const xp: number = xstep + (xstep * i);
//             const yp: number = ystep + (xstep * ii);
//             const rep: number = (0.1 + Math.random() * .009);
//             _rowX.push({ x: xp, y: yp });
//             //this.addAttractor(xp, yp, { repulsion: rep, excusionZone: Math.random() * 80 });
//         }
//         _grid.push(_rowX)
//     }
//     return _grid
// }

export default (overrides = {}, boidConfig: IBoidConfig = defaultBoidConfig) => (s: p5): void => {

    const props = { ...defaultConfig, ...overrides, ...boidConfig };
    const { width, height, depth, numBoids, fullscreen } = props;
    const flock = flockingAlgo(width, height, depth, numBoids, boidConfig);
    flock.addAttractor({ xPos: 300, yPos: 300, excusionZone: 40, attraction: -4 });
    const positiveMouseAttraction = 0.5;
    const negativeMouseAttraction = -15;
    const mouseTracker: IBoidAttractor = flock.addAttractor({ xPos: 300, yPos: 300, excusionZone: 50, attraction: positiveMouseAttraction });

    const setSize = (s: p5): void => {
        const canvWidth = fullscreen ? window.innerWidth : width;
        const canvHeight = fullscreen ? window.innerHeight : height;
        s.resizeCanvas(canvWidth, canvHeight);
        flock.setWidth(canvWidth)
        flock.setHeight(canvHeight)
    }

    const onMouseMove = (e: MouseEvent): void => {
        const { clientX, clientY, target } = e;
        const t = target as HTMLCanvasElement;
        const rect = t.getBoundingClientRect();
        const elementX = clientX - rect.left; //x position within the element.
        const elementY = clientY - rect.top;  //y position within the element.
        const vec = new Vector();
        vec.set(elementX, elementY, 0)
        mouseTracker.setPosition(vec);
    }

    const onMouseDown = (): void => {
        mouseTracker.setAttraction(negativeMouseAttraction);
    }

    const onMouseUp = (): void => {
        mouseTracker.setAttraction(positiveMouseAttraction);
    }

    s.setup = (): void => {
        const canvWidth = fullscreen ? window.innerWidth : width;
        const canvHeight = fullscreen ? window.innerHeight : height;
        const canv = s.createCanvas(canvWidth, canvHeight);
        window.addEventListener('resize', () => setSize(s));

        canv.mouseMoved(onMouseMove);
        canv.mousePressed(onMouseDown);
        canv.mouseReleased(onMouseUp);
        s.frameRate(fps);
        //--DAT gui
        const gui = new dat.GUI({ name: 'Flocking GUI' });
        gui.add(props, 'width', 100, 1000, 10)
            .name('canvas width')
            .onChange(() => {
                setSize(s)
                // fullscreen
                //     ? s.resizeCanvas(window.innerWidth, window.innerHeight)
                //     : s.resizeCanvas(props.width, props.height);
                // flock.setWidth(fullscreen ? window.innerWidth : props.width);
            });
        gui.add(props, 'height', 100, 1000, 10)
            .name('canvas height')
            .onChange(() => flock.setHeight(props.height));
        gui.add(props, 'depth', 0, 300, 10)
            .name('canvas depth')
            .onChange(() => flock.setDepth(props.depth));
        gui.add(props, 'coheisionDistance', 1, 1500, 1)
            .name('coheision distance')
            .onChange(() => flock.setBoidCohesionDistance(props.coheisionDistance));
        gui.add(props, 'maxspeed', 0.1, 10, .1)
            .name('Max Speed')
            .onChange(() => flock.setBoidMaxSpeed(props.maxspeed));
        gui.add(props, 'maxforce', 0.01, 1, .01)
            .name('Max Force')
            .onChange(() => flock.setBoidMaxForce(props.maxforce));
        gui.addColor(props, 'fill')
            .name('Fill colour')
        gui.addColor(props, 'stroke')
            .name('stroke colour')
        gui.add(props, 'strokeWeight', 1, 10, 1)
            .name('stroke weight')

        //.onChange(() => flock.setBoidMaxForce(props.maxforce));

        ///
        setSize(s)

    };

    s.draw = () => {
        flock.run();
        //s.clear()
        s.background(props.backgroundfill);


        flock.getPositions().forEach(p => {
            s.stroke(props.stroke);
            s.strokeWeight(props.strokeWeight);
            s.fill(props.fill);
            s.ellipse(p.x, p.y, defaultConfig.depth / 2 - (p.z * -1), defaultConfig.depth / 2 - (p.z * -1));
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

