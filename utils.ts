import { constants } from "./constants";

export const utils = {

  ToScreen(x: number, y: number): { screenX: number, screenY: number } {
    const screenX = (constants.origin.x * constants.tileSize.x) + (x - y) * (16 / 2);
    const screenY = (constants.origin.y *  constants.tileSize.y) + (x + y) * (8 / 2);
    return {screenX, screenY};
  },

  CartesianToIsometric(xpos: number, ypos: number): { x: number, y: number } {
    return {x: xpos-ypos, y: (xpos + ypos) / 2};
  },

  NextTilePosition(initialX: number, initialY: number, direction: string): [number, number] {
    let x = initialX;
    let y = initialY;
    if (direction === "left") {
      x -= 1;
    } else if (direction === "right") {
      x += 1;
    } else if (direction === "up") {
      y -= 1;
    } else if (direction === "down") {
      y += 1;
    }

    return [x, y];
  },

  NextTileDirection(tileX: number, tileY: number, nextX: number, nextY: number): string {
    const coordX = nextX - tileX;
    const coordY = nextY - tileY;
    if ( coordX === 1 && coordY == 0) 
      return "right";
    if (coordX === -1 && coordY == 0)
      return "left"
    if ((coordX === 0 && coordY == 1))
      return "down"
    if ((coordX === 0 && coordY == -1))
      return "up"
    console.log(tileX, tileY, nextX, nextY)
    console.log(coordX, coordY)
    return "stand"     
  },

  SameDirectionArray(a: any[], b: any[]): boolean {
    return JSON.stringify(a) == JSON.stringify(b);
  },
}