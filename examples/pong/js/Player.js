function Player(isPlayerLeft) {
    
    PIXI.Graphics.call(this);
    
    this._isPlayerLeft = isPlayerLeft;
    
    this.beginFill(0xffffff, 1);
    this.drawRect(0, 0, 20, 150);
    this.endFill;
    
    this.x = this._isPlayerLeft ? 15 : renderer.width - this.width -15; //car x et y sont propriétés de Graphics
//    Equivalent a : 
//    if (this._isPlayerLeft) {
//        this.x = 15;
//    } else {
//        this.x = renderer.width - this.width -15;
//    }
    this.y = (renderer.height - this.height) /2;
    
    this._moveUp = false;
    this._moveDown = false;
    this._KEYBOARD_VELOCITY_Y = 30;
    
    if (this._isPlayerLeft) {
        this.interactive = true;
        this.addListener('mousemove', _mouseMoveCallback);
    } else {
        window.addEventListener('keydown', _keyCallback.bind(this));//need bind else JS perd contexte d'execution, le this devient window
        window.addEventListener('keyup', _keyCallback.bind(this));
        
    }
    
    
}



Player.prototype = Object.create(PIXI.Graphics.prototype);

function _mouseMoveCallback(mouseData) {
    mouseData.target.y = mouseData.data.global.y - (this.height/2);
    if (this.y <0){
        this.y=0;
    } else if (this. y + this.height > renderer.height) {
        this.y = renderer.height - this.height;
    }
};
    
function _keyCallback(keyData) {    
    if (keyData.keyCode == 38) {
        this._moveUp = keyData.type == 'keydown';
    } else if (keyData.keyCode == 40) {
        this._moveDown = keyData.type == 'keydown';
    }
};

Player.prototype.playerRightMovement = function () {
    this.y += this._moveUp ? -this._KEYBOARD_VELOCITY_Y : 
              this._moveDown ? this._KEYBOARD_VELOCITY_Y :
              0;
    if (this.y <0){
        this.y=0;
    } else if (this. y + this.height > renderer.height) {
        this.y = renderer.height - this.height;
    }
};