function Hammer() {
    
    PIXI.Texture.call(this);
    
    var texture_cursor = new PIXI.Texture.fromImage("assets/cursor.png");
    var cursor = new PIXI.Sprite(texture_cursor);
    
    
}

Hammer.prototype = Object.create(PIXI.Texture.prototype);

Hammer.prototype.update = function() {
    cursor.x = mouseX;
    cursor.y = mouseY;
};