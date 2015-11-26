function Position(i) {
    
    PIXI.Graphics.call(this);
    
        this.beginFill(0x000000, 1);
        this.drawCircle(0, 0, 15);
        this.endFill();
        this.x = grid[i][0] * 480;
        this.y = grid[i][1] * 640;
    
            
}

Position.prototype = Object.create(PIXI.Graphics.prototype);

