import { Person } from "./Person";
import { utils } from "./utils";

class WorldMap {
  gameObjects: { [key: string]: any };
  tileMatrix: number[][];
  tileMap: { [key: string]: { image: HTMLImageElement, x: number, y: number } };

  constructor(config: { gameObjects?: { [key: string]: any }, tileMatrix?: number[][] }) {
    this.gameObjects = config.gameObjects || {};

    this.tileMatrix = config.tileMatrix || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.tileMap = {};

    for (let y = 0; y < this.tileMatrix.length; y++) {
      for (let x = 0; x < this.tileMatrix[0].length; x++) {
        const tile = this.tileMatrix[y][x];
        if (tile === 0) {
          const img = new Image();
          img.src = "resources/tiles/tile01.png";
          const gridPos = utils.ToScreen(x, y);
          this.tileMap[`${x},${y}`] = {
            image: img,
            x: gridPos.screenX,
            y: gridPos.screenY
          };
        }
      }
    }
  }

  drawMap(ctx: CanvasRenderingContext2D) {
    Object.values(this.tileMap).forEach(tile => {
      ctx.drawImage(tile.image, tile.x, tile.y);
    });
  }
}

(window as any).WorldMaps = {
  DemoMap: new WorldMap({
    gameObjects: {
      hero: new Person({
        x: utils.ToScreen(1, 0).screenX + 4,
        y: utils.ToScreen(1, 0).screenY - 4,
        isPlayerControlled: true,
      }),
    }
  }),
}