import { Sprite } from "./Sprite";

export class GameObject {
  x: number;
  y: number;
  direction: string;
  sprite: Sprite;
  currentTile: any;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;

    this.direction = config.direction || "down";
    
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "resources/actors/actor.png",
    });

    this.currentTile = null;
  }

  update(state: any): void {

  }
}

interface GameObjectConfig {
  x?: number;
  y?: number;
  direction?: string;
  src?: string;
}
