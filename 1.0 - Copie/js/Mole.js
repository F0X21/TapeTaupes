function Mole(i) {
    
    PIXI.Graphics.call(this);
    
        this.beginFill(0xffffff, 1);
        this.drawCircle(0, 0, 15);
        this.endFill();
        this.x = grid[i][0] * 480;
        this.y = grid[i][1] * 680;
        
        this.on('click', function () {
            this.x += 50;
        });
    
}

Mole.prototype = Object.create(PIXI.Graphics.prototype);

