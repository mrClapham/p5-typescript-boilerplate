import * as p5 from 'p5';

const fps = 60;

const defaultConfig = {
    width: 800,
    height: 800,
    fullscreen: true,
    fill: 'rgba(9255,255,255,.5)',
    stroke: 'rgba(255,0,0,1)',
    backgroundfill: 'rgba(0,0,0,.02)',
    strokeWeight: 11
};

const radiansPerStep = (numSteps: number): number => (Math.PI * 2) / numSteps;

const makeCircle = (numSides: number, radius: number): number[][] => {
    console.log(numSides)
    const points = [];
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
    const { width, height } = props;
    const w = (val: number | null): number => {
        if (val == null) return width;
        return width * val;
    }

    const h = (val: number | null): number => {
        if (val == null) return height;
        return height * val;
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
        const canv = s.createCanvas(canvWidth, canvHeight);
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
        const distortPolygon = (polygon: number[][]): number[][] => {
            return polygon.map((point: number[]) => {
                const x = point[0];
                const y = point[1];
                const distance = s.dist(0.5, 0.5, x, y);

                const z = s.frameCount / 500;
                const z2 = s.frameCount / 200;

                const noiseFn = (x: number, y: number) => {
                    const noiseX = (x + 0.31) * distance * 2 + z2;
                    const noiseY = (y - 1.73) * distance * 2 + z2;
                    return s.noise(noiseX, noiseY, z);
                };

                const theta = noiseFn(x, y) * Math.PI * 2;

                const amountToNudge = 0.1;
                const newX = x + (amountToNudge * Math.cos(theta));
                const newY = y + (amountToNudge * Math.sin(theta));

                return [newX, newY];
            });
        }

        const { fill } = props;
        s.noFill()
        s.stroke(props.stroke)
        for (let radius = 0.1; radius < 0.4; radius += 0.005) {

            s.beginShape();
            const circle = makeCircle(150, radius);
            const distortedCircle = distortPolygon(circle);
            distortedCircle.forEach(point => {
                s.vertex(w(point[0]), h(point[1]));
            });
            s.endShape(s.CLOSE); // CLOSE because the last point is not the first point
        }
        s.stroke(fill)

    }
}