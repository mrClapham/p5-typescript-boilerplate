import { renderFactory } from "lib/factories/renderFactory";

const initialConfig = {
  x: 100,
  y: 100,
  width: 100,
  height: 10,
  color: { r: 255, g: 0, b: 255, a: 255 },
  rotation: 45,
  red: 0,
  col: "#ff00ff",
  imageUrl:
    "https://nas-national-prod.s3.amazonaws.com/styles/article_hero_inline/s3/_2922260053_7abf7bb195_o.jpg?itok=PHVNg_0S"
};

const imageGlitchRenderer = (canvas: HTMLCanvasElement): (() => void) => {
  const context: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  let currentImage = initialConfig.imageUrl;
  let img: CanvasImageSource | null = null;
  let imgArray: ImageData | null = null;
  let imHeight = 0;
  let imWidth = 0;

  const loadImage = (i: string) => {
    img = new Image();
    img.setAttribute("crossOrigin", "");
    img.src = i + "?" + new Date().getTime();

    img.addEventListener("load", (e) => {
      imHeight = e.target.height;
      imWidth = e.target.width;
    });
    console.log(" imHeight ", imHeight);
    currentImage = i;
    try {
      img && context.drawImage(img, 0, 0, imWidth, imHeight);
      imgArray = context.getImageData(0, 0, imWidth, imHeight);
      console.log(imgArray);
    } catch (e) {
      //
      console.log(e);
    }
  };

  loadImage(initialConfig.imageUrl);

  return (config = initialConfig): void => {
    const props = { ...initialConfig, ...config };
    const { col, imageUrl } = props;
    const { clientWidth, clientHeight } = canvas;
    context.clearRect(0, 0, clientWidth, clientHeight);
    context.rect(100, 100, 1001, 100);
    context.fillStyle = col;
    context.fillRect(0, 0, 150, 75);
    context.fillRect(200, 200, 200, 200);
    // img && context.drawImage(img, 0,0, imWidth, imHeight);
    if (imageUrl !== currentImage) {
      loadImage(imageUrl);
    } else {
      img && context.drawImage(img, 0, 0, imWidth, imHeight);
    }
  };
};

export { imageGlitchRenderer };
