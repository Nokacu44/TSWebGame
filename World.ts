class World {
  private element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cell: any;
  private selected: any;
  private map: any;
  private tileSelectionHandler: any;
  private pathfindingHandler: any;
  private directionInput: any;

  constructor(config: { element: HTMLElement }) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.cell = null;
    this.selected = null;
  }

  public startGameLoop(): void {
    const step = (): void => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // ===================== Updates =====================
      this.map.drawMap(this.ctx);
      Object.values(this.map.gameObjects).forEach((object: any) => {
        object.update({
          path: this.pathfindingHandler.path,
        });
      });

      // ===================== Draws =====================

      // Draw the selected tile (Over the ground but behind objects)
      this.tileSelectionHandler.drawSelectedTile(this.ctx);

      // Draw all the objects with Y-Sort
      Object.values(this.map.gameObjects)
        .sort((a: any, b: any) => {
          return a.y - b.y;
        })
        .forEach((object: any) => {
          object.sprite.draw(this.ctx);
        });

      this.pathfindingHandler.path.forEach((node: any) => {
        const tile = this.map.tileMap[`${node[0]},${node[1]}`];
        this.ctx.fillRect(tile.x, tile.y, 4, 4);
      });

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  public init(): void {
    console.log("Hello from overworld ", this);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.map = window.WorldMaps.DemoMap;

    this.tileSelectionHandler = new TileSelectionHandler();
    this.tileSelectionHandler.init(this.canvas);
    this.tileSelectionHandler.tileMap = this.map.tileMap;

    this.pathfindingHandler = new PathfindingHandler({
      map: this.map,
      selectionTileHandler: this.tileSelectionHandler,
    });
    this.pathfindingHandler.init();

    Object.values(this.map.gameObjects).forEach((object: any) => {
      if (object instanceof Person) {
        object.pathfinding = this.pathfindingHandler;
      }
    });

    this.startGameLoop();
  }
}
