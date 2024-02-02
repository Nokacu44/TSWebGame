import { utils } from "./utils";

class TileSelectionHandler {
  canvas: HTMLCanvasElement;
  fakeCtx: CanvasRenderingContext2D;
  fakeTile: HTMLImageElement;
  selectedTile: { x: number; y: number } | null;
  selectedTileImage: HTMLImageElement;
  selectedTileImageIsLoaded: boolean;
  tileMap: { [key: string]: any };

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 16;
    this.canvas.height = 8;

    this.fakeCtx = this.canvas.getContext('2d', { willReadFrequently: true })!;

    this.fakeTile = new Image();
    this.fakeTile.onload = () => {
      this.fakeCtx.drawImage(this.fakeTile, 0, 0);
    }
    this.fakeTile.src = "resources/fakeTile.png";

    this.selectedTile = null;

    this.selectedTileImage = new Image();
    this.selectedTileImageIsLoaded = false;
    this.selectedTileImage.onload = () => {
      this.selectedTileImageIsLoaded = true;
    }
    this.selectedTileImage.src = "resources/tiles/selectionTile.png";

    this.tileMap = {};
  }


  drawSelectedTile(ctx: CanvasRenderingContext2D) {
    if (this.selectedTile !== null) {
      const pos = utils.ToScreen(this.selectedTile.x, this.selectedTile.y);
      this.selectedTileImageIsLoaded && ctx.drawImage(
        this.selectedTileImage,
        pos.screenX, pos.screenY,
        16, 8
      );
    }

  }

  getPixel(x: number, y: number) {
    return this.fakeCtx.getImageData(x, y, 1, 1).data;
  }

  init(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", e => {
      this.selectedTile = null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      let mouseX = Math.floor((e.clientX - rect.left) * scaleX);
      let mouseY = Math.floor((e.clientY - rect.top) * scaleY);

      const constants = {
        tileSize: { x: 0, y: 0 },
        origin: { x: 0, y: 0 }
      };

      const cell = {
        x: Math.floor((mouseX / constants.tileSize.x)),
        y: Math.floor((mouseY / constants.tileSize.y)),
      };

      const selected = {
        x: (cell.y - constants.origin.y) + (cell.x - constants.origin.x),
        y: (cell.y - constants.origin.y) - (cell.x - constants.origin.x),
      };

      const offset = {
        x: mouseX % constants.tileSize.x,
        y: mouseY % constants.tileSize.y,
      };

      const data = this.getPixel(offset.x, offset.y);
      const color = {
        r: data[0],
        g: data[1],
        b: data[2],
      };

      if (color.r === 255 && color.g === 0 && color.b === 0) selected.x += -1;
      if (color.r === 0 && color.g === 0 && color.b === 255) selected.y += -1;
      if (color.r === 0 && color.g === 255 && color.b === 0) selected.y += 1;
      if (color.r === 255 && color.g === 255 && color.b === 0) selected.x += 1;

      this.selectedTile = selected;
    });
  }
}