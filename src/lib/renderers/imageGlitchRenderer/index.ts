import { alladin } from './alladin';
// import TwoByThree from './twoby4'

interface ISizedEventTarget extends EventTarget {
  width: number;
  height: number;
}
interface ISizedEvent extends Event {
  target: ISizedEventTarget
}

interface IDotArray { x: number, y: number, r: number, g: number, b: number, a: number, size: number, orig: number }


// const defaultData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAIAAABga0e4AAAFR2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjEwMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjgwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMTAwIgogICB0aWZmOkltYWdlTGVuZ3RoPSI4MCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0xMS0wMlQxMDoyMjozNFoiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTEtMDJUMTA6MjI6MzRaIj4KICAgPGRjOnRpdGxlPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5waXhlbFRlc3RJbWFnZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMS4xMC40IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTExLTAyVDEwOjIyOjM0WiIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+MjyDvQAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHfK4NRGMc/24hsmuLChYslXG2akbhRtoRaWjNluNle+6G2eXvfLS23yq2ixI1fF/wF3CrXShEpuVOuiRvW63k3tSU7p3Oez/me53l6znPAGskoWb3BC9lcXgtP+l3z0QVX0wt2rLTIHIopujoeCgWpOz7vsZj21mPmqu/377AvJ3QFLM3CY4qq5YWnhINredXkHeEOJR1bFj4TdmtSoPCdqccr/GpyqsLfJmuRcACsbcKuVA3Ha1hJa1lheTk92UxB+a3HfIkjkZubFdstqwudMJP4cTHNBAGGGWBU9mE8+OiXE3XiveX4GVYlVpFdpYjGCinS5HGLWpDsCbFJ0RMyMxTN/v/tq54c9FWyO/zQ+GwY773QtA2lLcP4OjKM0jHYnuAyV41fPYSRD9G3qlrPATg34PyqqsV34WITOh/VmBYrSzZZ1mQS3k6hNQrtN9CyWOnZ7z0nDxBZl6+6hr196BN/59IPMFBnzVr5XvYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAE2SURBVHic7dbBDUFBFEDReaIDG3rQgDWJHqiPKqhCD9jY2Y8G5H3Xz2Tyk3u2E3+em7eYqEW/mvUeYEqMBRgLMBZgLMBYgLEAYwHGAqK0e8JHetrs3pp+OgbGyrhZgLEAYwHGAowFGAswFmAswFhANHxKD1+dyKaq6cjx/xN9gJsFGAswFmAswFiAsQBjAcYCjAVE3b56z/BFXBfJaa+Z3SzAWICxAGMBxgKMBRgLMBZgLGBeyr3PzZd1clh3t+R06H2f/XYMNwswFmAswFiAsQBjAcYCjAUYC4hHOTT69LKektNnHBvduyrn5HTM/3WzAGMBxgKMBRgLMBZgLMBYgLGAePeeYELcLMBYgLEAYwHGAowFGAswFmAsIPZl03uGyXCzAGMBxgKMBRgLMBZgLMBYgLGAD5CyHUfl4XLiAAAAAElFTkSuQmCC"

export const getRelativeSize = (pixelValue: number, size: number): number => {
  const pc = pixelValue / 255;
  const retSize = size * pc;
  return retSize;
}

const makeDotArray = (imageData: ImageData, size = 10): IDotArray[][] => {
  const { data, width } = imageData;
  const rowLength = width * 4;
  const numCols = Math.ceil(width / size);
  const array3d: Uint8ClampedArray[] = [];
  const gridArray: IDotArray[][] = [];

  for (let n = 0; n < data.length; n += rowLength) {
    const start = n;
    const end = n + rowLength;
    array3d.push(data.slice(start, end))
  }

  for (let i = 0, j = 0; i < array3d.length; i += size) {
    gridArray[j] = [];
    for (let ii = 0; ii < numCols; ii++) {
      const rowCount = i;
      const colCount = ii * 4 * size;
      gridArray[j].push({ size, r: array3d[rowCount][colCount], g: array3d[rowCount][colCount + 1], b: array3d[rowCount][colCount + 2], a: array3d[rowCount][colCount + 3], x: ii * size, y: i, orig: colCount });
    }
    j++
  }
  return gridArray
}

// const getRows = <T>(arr: T[][], start: number, length: number): T[][] => arr.slice(start, start + length)

const initialConfig = {
  x: 100,
  y: 100,
  width: 100,
  height: 10,
  dotSize: 30,
  color: { r: 255, g: 0, b: 255, a: 255 },
  rotation: 45,
  red: 0,
  col: "#ff00ff",
  imageUrl: alladin
};

const imageGlitchRenderer = (canvas: HTMLCanvasElement): (() => void) => {

  const context: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  let currentImage = initialConfig.imageUrl;
  let img: CanvasImageSource | null = null;


  let imHeight = 0;
  let imWidth = 0;

  let imgData: ImageData | null;
  let dotArray: IDotArray[][] = [];
  let currentDotSize = 20;



  const loadImage = (i: string) => {
    console.log("loading image")
    img = new Image();
    img.setAttribute("crossOrigin", "");
    img.src = i //+ "?" + new Date().getTime();

    img.addEventListener("load", (e: Event) => {
      console.log("Image loaded ", canvas);
      if (e) {
        const { target } = e as ISizedEvent
        imHeight = target.height;
        imWidth = target.width;
        canvas.width = imWidth
        canvas.height = imHeight

        // console.log("imWidth: ", imWidth)
        // console.log("imHeight: ", imHeight)
        // console.log(canvas);

        // console.log('sizeToParent ', config)
        // canvas.width = imWidth;
        // canvas.height = imHeight

        context.clearRect(0, 0, imWidth, imHeight);
        img && context.drawImage(img, 0, 0, imWidth, imHeight);
        imgData = context.getImageData(0, 0, imWidth, imHeight);
        imgData ? dotArray = makeDotArray(imgData, currentDotSize) : dotArray = [];
        console.log(" dotArray ", dotArray)
      }
    });
    currentImage = i;
  };

  //loadImage(initialConfig.imageUrl);
  // loadImage(alladin);

  return (config = initialConfig): void => {
    const props = { ...initialConfig, ...config };
    const { imageUrl, dotSize } = props;
    currentDotSize = dotSize;
    if (imageUrl !== currentImage) {
      context.clearRect(0, 0, 10000, 10000);
      loadImage(imageUrl);
    } else {
      //console.log('IMAGE NOT CHANGED')
      //console.log(props.imageUrl)
      // img && context.drawImage(img, 0, 0, imWidth, imHeight);
    }

    try {
      context.clearRect(0, 0, 10000, 10000);
      const offset = 60;
      // img && context.drawImage(img, 0, 0, imWidth, imHeight);
      if (imgData) {


        const redOffset = Math.random() * 14
        const greenOffset = Math.random() * 4
        const bluenOffset = Math.random() * 4
        dotArray.forEach((d: IDotArray[]) => {


          d.forEach((dd: IDotArray) => {
            const { x, y, r, g, b, size } = dd;

            context.imageSmoothingEnabled = true;
            context.globalCompositeOperation = 'screen';

            // RED
            const circleR = new Path2D();
            circleR.arc(x + size + redOffset, y + offset, size / 2, 0, 2 * Math.PI, false);
            context.fillStyle = `rgba(255, 0, 0, ${r / 255})` // `rgba(${r},${g},${b},1)`;
            context.fill(circleR);

            // Green
            const circleG = new Path2D();

            circleG.arc(x + size + greenOffset, y + offset, size / 2, 0, 2 * Math.PI, false);
            context.fillStyle = `rgba(0, 255, 0, ${g / 255})` // `rgba(${r},${g},${b},1)`;
            context.fill(circleG);

            // Blue
            const circleB = new Path2D();
            circleB.arc(x + size + bluenOffset, y + offset, size / 2, 0, 2 * Math.PI, false);
            context.fillStyle = `rgba(0, 0, 255, ${b / 255})` // `rgba(${r},${g},${b},1)`;
            context.fill(circleB);
          })

          // ------ const glitch1 = getRows(dotArray, Math.ceil(Math.random() * dotArray.length), Math.ceil(Math.random() * 4))
          context.globalCompositeOperation = 'multiply';

          const colors = [`rgba(255, 0, 0, .25)`, `rgba(0, 0, 255, .25)`, `rgba(0, 255, 0, .25)`]

          context.fillStyle = colors[Math.floor(Math.random() * 3)] //`rgba(0, 0, 255, .05)` // `rgba(${r},${g},${b},1)`;
          ////////
          // glitch1.map((d: IDotArray[]) => {
          //   d.map((dd: IDotArray) => {
          //     const { x, y, r, g, b, a, size } = dd;
          //     // Blue
          //     const circleB = new Path2D();
          //     circleB.arc(Math.random() * 1 + x + size / 2.75, y + offset, size / 2, 0, 2 * Math.PI, false);
          //     // context.fillStyle = `rgba(0, 0, 255, .05)` // `rgba(${r},${g},${b},1)`;
          //     context.fill(circleB);

          //   })
          // })

          /////////////
        })
      }
    } catch (e) {
      ///
      console.log(e)
    }
  };
};
export { imageGlitchRenderer };
