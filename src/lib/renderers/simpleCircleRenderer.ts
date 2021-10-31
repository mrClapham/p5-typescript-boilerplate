import circle from "lib/shapes/circle";
import { IShape } from "lib/interfaces";

interface IImageEvent { 


const xPos = 0;
const yPos = 0;
const xStep = 1;
const yStep = 1;
const rotate = 1;

const simpleCircleRenderer = (canvas: HTMLCanvasElement): (() => void) => {
  const context: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  const initialConfig = {
    x: 100,
    y: 100,
    width: 100,
    height: 10,
    color: { r: 255, g: 0, b: 255, a: 255 },
    rotation: 45,
    red: 0,
    col: "#ff00ff",
    imageUrl : "https://www.rspb.org.uk/globalassets/images/birds-and-wildlife/bird-species-illustrations/raven_1200x675.jpg?preset=largelandscape_mobile";
  };

  let currentImage = initialConfig.imageUrl;
  let img: CanvasImageSource | null = null;

  let imHeight = 0;
  let imWidth = 0;

  const loadImage = (i:string) => {

    img = new Image();
    img.src = i;

   img.addEventListener("load", (e) => {
      imHeight = e.target.height;
      imWidth = e.target.width;
    });
    currentImage = i
  }



  loadImage(initialConfig.imageUrl)


  return (config = initialConfig): void => {
    const props = { ...initialConfig, ...config };
    const { col, imageUrl } = props;
    if(imageUrl !== currentImage){
      loadImage(imageUrl)
    }
   
    const { clientWidth, clientHeight } = canvas;
    context.clearRect(0, 0, clientWidth, clientHeight);
    context.rect(100, 100, 1001, 100);
    context.fillStyle = col;
    context.fillRect(0, 0, 150, 75);
    context.fillRect(200, 200, 200, 200);
    try{
      img && context.drawImage(img, 0,0, imWidth, imHeight));
      const scannedImageData = context.getImageData(0,0, imWidth, imHeight)
    }catch(e){
      //
    }

      
 
    // xPos += xStep;
    // yPos += yStep;
    // rotate += 1;
    // if (xPos > clientWidth || xPos < 0) {
    //   xStep = -xStep;
    // }
    // if (yPos > clientHeight || yPos < 0) {
    //   yStep = -yStep;
    // }
  };
};

// const simpleCircleRenderer = (canv: HTMLCanvasElement): () => void => {
//   return (): void => {
//     console.log('rendering')
//   }
// }

const create = ()

export { simpleCircleRenderer };
