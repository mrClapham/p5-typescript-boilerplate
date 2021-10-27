import p5 from 'p5';

const element: HTMLDivElement = document.createElement('div')
const sketch = (s: p5) => {
    return {
        noise: s.noise
    }
}

export default (): void => {
    const s: p5 = new p5({}, element);
    const { noise } = s;
    const perlin = n
}