/**
 *
 * @param target The Dom element to attach the canvas element to.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 * @param sizeToParent When true the canvas element will fill the dom element it is attached to.
 * @param optClassName An optional class name to append to the canvas element.
 */
const createCanvas = (
  target: string,
  width = 300,
  height = 300,
  sizeToParent = true,
  optClassName: string | null = null
): HTMLCanvasElement | null => {
  let canvas: HTMLCanvasElement;
  const d: HTMLDivElement = document.querySelector(`#${target}`);
  const parentWidth = d.getBoundingClientRect().width;
  const parentHeight = d.getBoundingClientRect().height;
  if (d) {
    canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = sizeToParent ? parentWidth : width;
    canvas.height = sizeToParent ? parentHeight : height;
    canvas.style.position = "relative";
    canvas.style.top = "0";
    canvas.style.left = "0";
    if (optClassName) {
      canvas.className = optClassName;
    }
    d.appendChild(canvas);

    const onResize = (e: Event): void => {
      console.log(e);
      const parentWidth = d.getBoundingClientRect().width;
      const parentHeight = d.getBoundingClientRect().height;
      canvas.width = parentWidth;
      canvas.height = parentHeight;
    };
    console.log(sizeToParent);
    if (sizeToParent) {
      window.addEventListener("resize", onResize, true);
    }
  }
  return canvas ? canvas : null;
};

export { createCanvas };
