import { GameObject } from "./GameObject";

export class Sprite {
  private image: HTMLImageElement;
  private isLoaded: boolean;
  private gameObject: GameObject;

  constructor(config: { src: string; gameObject: GameObject }) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x: number = this.gameObject.x;
    const y: number = this.gameObject.y;

    this.isLoaded && ctx.drawImage(
      this.image,
      x,
      y
    );
  }
}