//déclaration des variables
var wST;
var hST;
var size;
var mouseX;
var mouseY;
var cursor;
var gridPos = [[0.1,0.75],[0.5,0.75],[0.9,0.75],[0.2,0.5],[0.5,0.5],[0.8,0.5],[0.3,0.3],[0.5,0.3],[0.7,0.3]];
var gridMole = new Array;

function Main () {
    
    
    PIXI.Container.call(this);
    
    //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;
    //console.log(wST, hST);
    
    console.log("Main is OK");
    
    //TERRAIN
    if (size == 360) {
//        var terrain = new PIXI.TilingSprite(resources.terrain360.texture);
        var texture_terrain = new PIXI.Texture.fromImage("assets/terrain360.png");
        var terrain = new PIXI.Sprite(texture_terrain);
    } else {
        var texture_terrain = new PIXI.Texture.fromImage("assets/terrain480.png");
        var terrain = new PIXI.Sprite(texture_terrain); 
    }
    stage.addChild(terrain);
    
    console.log("Main is OK");
    //CURSOR
    
//    var texture_cursor = new PIXI.Texture.fromImage("assets/cursor.png");
//    var cursor = new PIXI.Sprite(texture_cursor);
    
    stage.interactive = true;
    
    stage.on('mousemove', function(mouseData){
        mouseX = mouseData.data.originalEvent.x
        mouseY = mouseData.data.originalEvent.y;    
    });
    
//    texture_cursor.interactive = true;
//    texture_cursor.buttonMode = true;
    
//    texture_cursor.defaultCursor = "cursor.png";
    
    
    //CURSOR
    var texture_cursor = new PIXI.Texture.fromImage("assets/cursor.png");
    
    cursor = new PIXI.Sprite(texture_cursor);
    cursor.anchor.set(0, 1);
    
    stage.addChild(cursor);
    
    console.log("Main is OK");


    for (var i = 0; i<0; i++) {
        console.log("test");
        var mole = new Mole(i);
        stage.addChild(mole);
        console.log(mole.x);
        
        gridMole[i] = mole;
        
        console.log(gridMole[i].x);
    }
    
//    cir0 = new Mole(0);
//    stage.addChild(cir0);
//    cir1 = new Mole(1);
//    stage.addChild(cir1);
//    cir2 = new Mole(2);
//    stage.addChild(cir2);
//    cir3 = new Mole(3);
//    stage.addChild(cir3);
//    cir4 = new Mole(4);
//    stage.addChild(cir4);
//    cir5 = new Mole(5);
//    stage.addChild(cir5);
//    cir6 = new Mole(6);
//    stage.addChild(cir6);
//    cir7 = new Mole(7);
//    stage.addChild(cir7);
//    cir8 = new Mole(8);
//    stage.addChild(cir8);
    
    
    
    
    
//    cir0 = new Mole(0);
    
    
    
}

    
Main.prototype = Object.create(PIXI.Container.prototype);//Main hérite de PIXI.container   

// =============================================== CALLBACKS ===========================================


Main.prototype.update = function () {
//    console.log("updated");
//    console.log(mouseX);
//    console.log(mouseY);
    cursor.x = mouseX;
    cursor.y = mouseY;
//    console.log(cursor.x);
//    cursor.x += 1;
    
    
    var timeout = Math.random()*100;
    
    
    
    
};


Main.prototype.draw = function(i) {
    this.beginFill(0xe74c3c, 1);
    this.drawCircle(0, 0, 15);
    this.endFill();
    this.x = grid[i][0]
    this.y = grid[i][1]
    stage.addChild(this);
};
