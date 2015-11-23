function Ball(playerLeft, playerRight) {
    
    PIXI.Graphics.call(this);
    
    this._VELOCITY_X = 10;
    this._VELOCITY_Y = 0;
    
//    this._movingToLeft = true;
    this._movingToLeft = Math.random() > 0.5;
    
    this._movingToTop = true; 
    
    this._playerLeft = playerLeft;
    this._playerRight = playerRight;
    
    this.beginFill(0xe74c3c, 1);
    this.drawCircle(0, 0, 15);
    this.endFill();
    
}

Ball.prototype = Object.create(PIXI.Graphics.prototype);

Ball.prototype.update = function() {
    
    this.x += this._movingToLeft ? -this._VELOCITY_X : this._VELOCITY_X;
    this.y += this._movingToTop ? this._VELOCITY_Y : -this._VELOCITY_Y;
    
    
    if (this._movingToLeft) {
        if (hitTest(this._playerLeft.x, this._playerLeft.y, this._playerLeft.width, this._playerLeft.height, this.x - this.width /2, this.y - this.height /2, this.width, this.height)) {
            this._movingToLeft = false;   
            this._chageYBall(this._playerLeft)
        }
    } else { 
        if (hitTest(this._playerRight.x, this._playerRight.y, this._playerRight.width, this._playerRight.height, this.x - this.width /2, this.y - this.height /2, this.width, this.height)) {
            this._movingToLeft = true;  
            this._chageYBall(this._playerRight)
        }
    }
    
    
    if (this._movingToTop && this.y > renderer.height) {
        this._movingToTop = false;
    } else if (!this._movingToTop && this.y < 0) {
        this._movingToTop = true;
    }
    
    
    
    if (this.x < 0) 
        this.emit('win', 2);
    else if (this.x > renderer.width)
        this.emit('win', 1);
    
};

function hitTest(x1, y1, w1, h1, x2, y2, w2, h2) {
  
    if (x1 + w1 > x2) 
        if (x1 < x2 + w2)
            if (y1 + h1 > y2)
                if (y1 < y2 + h2)
                    return true;
    return false;
          
};


Ball.prototype._chageYBall = function(player) {
    
    if (this.y > player.y + player.height * 0.75) {
        this._VELOCITY_Y = 10;
    } else if (this.y + player.height * 0.25) {
        this._VELOCITY_Y = 10;
        this._movingToTop = false;
    } else {
        this._VELOCITY_Y = 0;
    }
    
    
};
