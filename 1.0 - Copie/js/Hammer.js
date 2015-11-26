function Hammer() {
    
//    PIXI.Texture.call(this);
    PIXI.Sprite.call(this);
    PIXI.Graphics.call(this);

    this.texture_hammer = new PIXI.Sprite.fromImage("assets/cursor.png");
    
    this.texture_hammer.anchor.set(1, 1);
    
    this.addChild(this.texture_hammer);
    
//    this.texture_hammer.anchor.set(0, 1);
    
    this.texture_hammer.x = this.texture_hammer.width;
//    console.log(this.texture_hammer.width);
    
    this.texture_shadow = new PIXI.Sprite.fromImage("assets/shadow.png");
    this.texture_shadow.anchor.set(0.5, 0.5);
    this.addChild(this.texture_shadow);
    
    
    console.log("Hammer is OK");
    
    
}

Hammer.prototype = Object.create(PIXI.Sprite.prototype);

Hammer.prototype.update = function() {
    this.x = mouseX;
    this.y = mouseY;
};

Hammer.prototype.hammerDown = function () {
    console.log("Hammer of justice crushes you");
    this.texture_hammer.rotation -= 0.9;
};

Hammer.prototype.hammerUp = function () {
    console.log("Overpower!");
    this.texture_hammer.rotation += 0.9;
};
