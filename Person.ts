import { GameObject } from './GameObject';
import { utils } from './utils';

export class Person extends GameObject {
  movementProgressRemainingX: number;
  movementProgressRemainingY: number;
  isPlayerControlled: boolean;
  speed: number;
  pathfinding: any;
  currentTile: [number, number];
  directionUpdate: {
    [key: string]: [string, string, { x: number, y: number }];
  };

  constructor(config: any) {
    super(config);
    this.movementProgressRemainingX = 0;
    this.movementProgressRemainingY = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.speed = 0.5;

    this.pathfinding = null;

    this.currentTile = [1, 0];

    this.directionUpdate = {
      up: ['x', 'y', utils.CartesianToIsometric(0, -this.speed)],
      down: ['x', 'y', utils.CartesianToIsometric(0, this.speed)],
      left: ['x', 'y', utils.CartesianToIsometric(-this.speed, 0)],
      right: ['x', 'y', utils.CartesianToIsometric(this.speed, 0)],
    };
  }

  override update(state: any) {
    if (this.movementProgressRemainingX > 0 || this.movementProgressRemainingY > 0) {
      this.updatePosition();
    } else {
      if (this.isPlayerControlled && state.path && state.path.length > 0) {
        const nextNode = this.pathfinding.path.shift();
        const nextDirection = utils.NextTileDirection(
          this.currentTile[0],
          this.currentTile[1],
          nextNode[0],
          nextNode[1]
        );
        /*
        if (nextDirection !== "stand") {
          this.startBehavior(state, {
            type: "walk",
            direction: nextDirection,
          });
        }*/
      }
      //this.updateSprite();
    }
  }

  startBehavior(state: any, behavior: any) {
    this.direction = behavior.direction;

    if (behavior.type === 'walk') {
      this.movementProgressRemainingX = 8;
      this.movementProgressRemainingY = 8;
    }
  }

  updatePosition() {
    const [x, y, change] = this.directionUpdate[this.direction];
    this[x] += change.x;
    this[y] += change.y;
    this.movementProgressRemainingX -= this.speed;
    this.movementProgressRemainingY -= this.speed;

    if (this.movementProgressRemainingX === 0 && this.movementProgressRemainingY === 0) {
      const nextTile = utils.NextTilePosition(this.currentTile[0], this.currentTile[1], this.direction);
      this.currentTile = nextTile;
    }
  }
}