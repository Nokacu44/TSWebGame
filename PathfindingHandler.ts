class PathfindingHandler {
  constructor(config) {
    this.map = config.map;

    this.matrix = this.map.tileMatrix;
    this.grid = new PF.Grid(this.matrix);
    this.finder = new PF.AStarFinder();
    this.directions = []
    this.selectionTileHandler = config.selectionTileHandler;

    this.path = []

    this.selectedTile = null

    this.active = true;
  }


  init() {
    document.addEventListener("click", e => {
      if (!this.active) return;

      const tileSelected = this.selectionTileHandler.selectedTile;
      if (tileSelected === this.selectedTile) return;
      this.selectedTile = tileSelected;

      if (this.selectedTile !== null) 
      {
        if (this.selectedTile.x >= 0 && this.selectedTile.x < this.matrix[0].length
          && this.selectedTile.y >= 0 && this.selectedTile.y < this.matrix.length)
        {
          this.gridBackup = this.grid.clone();
          this.path = this.finder.findPath(
            this.map.gameObjects["hero"].currentTile[0], this.map.gameObjects["hero"].currentTile[1], 
            this.selectedTile.x, this.selectedTile.y, 
            this.grid);
          this.path.shift();
          
          this.grid = this.gridBackup;
          
          this.directions = []

          this.path.forEach(node => {
            const currentTile = node;
            const nextIndex = this.path.indexOf(node) + 1
            if (nextIndex >= this.path.length) return;
            const nextTile = this.path[ nextIndex];
            
            const dir = utils.nextTileDirection(
              currentTile[0], currentTile[1],
              nextTile[0], nextTile[1]
            )

            this.directions.push(dir);
          });

        }
      }


    });
  }
}