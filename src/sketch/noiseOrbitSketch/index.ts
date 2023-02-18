import * as p5 from 'p5';
import { createColoursArray } from 'lib';


const colorsArray = createColoursArray({ r: 255, g: 0, b: 255, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }, 40)
console.log(colorsArray.map(d => d.rgba))
const fps = 60;

const defaultConfig = {
    width: 800,
    height: 800,
    fullscreen: true,
    fill: 'rgba(9255,255,255,.5)',
    stroke: 'rgba(255,10,100,1)',
    backgroundfill: 'rgba(0,0,0,.02)',
    strokeWeight: 1,
    xDist: 0.5,
    yDist: 0.95,
    amountToNudge: 0.15
};

const radiansPerStep = (numSteps: number): number => (Math.PI * 2) / numSteps;

const makeCircle = (numSides: number, radius: number): [number, number][] => {
    const points: [number, number][] = [];
    const rads = radiansPerStep(numSides);
    for (let theta = 0; theta < Math.PI * 2; theta += rads) {
        const x = 0.5 + radius * Math.cos(theta);
        const y = 0.5 + radius * Math.sin(theta);

        points.push([x, y]);
    }
    return points;
}

export const noiseOrbitSketch = (overrides = {}) => (s: p5): void => {
    const props = { ...defaultConfig, ...overrides };
    const { width, height, fullscreen, xDist, yDist, amountToNudge } = props;

    const w = (val: number | null): number => {
        if (val == null) return fullscreen ? window.innerWidth : width;
        return fullscreen ? window.innerWidth * val : width * val;
    }

    const h = (val: number | null): number => {
        if (val == null) return fullscreen ? window.innerHeight : height;
        return fullscreen ? window.innerHeight * val : height * val;
    }


    const setSize = (width: number, height: number, s: p5): void => {
        const canvWidth = props.fullscreen ? window.innerWidth : width;
        const canvHeight = props.fullscreen ? window.innerHeight : height;
        s.resizeCanvas(canvWidth, canvHeight);
    }

    // const onMouseMove = (e: MouseEvent): void => {

    // }

    // const onMouseDown = (): void => {

    // }

    // const onMouseUp = (): void => {
    // }

    s.setup = (): void => {
        const canvWidth = props.fullscreen ? window.innerWidth : width;
        const canvHeight = props.fullscreen ? window.innerHeight : height;
        window.addEventListener('resize', () => {
            const canvWidth = props.fullscreen ? window.innerWidth : width;
            const canvHeight = props.fullscreen ? window.innerHeight : height;
            setSize(canvWidth, canvHeight, s)
        });

        // canv.mouseMoved(onMouseMove);
        // canv.mousePressed(onMouseDown);
        // canv.mouseReleased(onMouseUp);
        s.frameRate(fps);

        setSize(canvWidth, canvHeight, s);

    };

    s.draw = () => {
        s.background(props.backgroundfill)
        const distortPolygon = (polygon: [number, number][], amountToNudge = 0.1): [number, number][] => {
            return polygon.map((point: number[]) => {
                const x = point[0];
                const y = point[1];
                const distance = s.dist(xDist, yDist, x, y);

                const z = s.frameCount / 200;
                const z2 = s.frameCount / 400;

                const noiseFn = (x: number, y: number) => {
                    const noiseX = (x + 0.31) * distance * 2 + z2;
                    const noiseY = (y - 1.73) * distance * 2 + z2;
                    return s.noise(noiseX, noiseY, z);
                };

                const theta = noiseFn(x, y) * Math.PI * 2;

                //const amountToNudge = 0.1;
                const newX = x + (amountToNudge * Math.cos(theta));
                const newY = y + (amountToNudge * Math.sin(theta));

                return [newX, newY];
            });
        }

        function chaikin(arr: [number, number][], num = 4): [number, number][] {
            if (num === 0) return arr;
            const l = arr.length;
            const smooth = arr.map((c, i) => {
                return [[0.75 * c[0] + 0.25 * arr[(i + 1) % l][0],
                0.75 * c[1] + 0.25 * arr[(i + 1) % l][1]],
                [0.25 * c[0] + 0.75 * arr[(i + 1) % l][0],
                0.25 * c[1] + 0.75 * arr[(i + 1) % l][1]]];
            }).flat();
            return num === 1 ? smooth as [number, number][] : chaikin(smooth as [number, number][], num - 1)
        }

        s.noFill()
        s.stroke(props.stroke)
        let colCount = 0;
        for (let radius = 0.1; radius < 0.4; radius += 0.01) {
            colCount++
            s.beginShape();
            const circle = makeCircle(8, radius);
            const distortedCircle = distortPolygon(circle, amountToNudge);
            const smoothCircle = chaikin(distortedCircle, 4);
            smoothCircle.forEach(point => {
                s.vertex(w(point[0]), h(point[1]));
                s.stroke(colorsArray[colCount].rgba)
            });
            s.endShape(s.CLOSE); // CLOSE because the last point is not the first point
        }
        //s.stroke(fill)

    }
}