//déclaration des variables
//Largeur et hauteur du stage
var wST;
var hST;
//Largeur et hauteur du terrain (fichier image)
var wTR;
var hTR;
var size;
var mouseX;
var mouseY;
var cursor;
var grid = [[0.19,0.67],[0.5,0.67],[0.81,0.67],[0.27,0.53],[0.5,0.53],[0.73,0.53],[0.33,0.41],[0.5,0.41],[0.66,0.41]];
var gridMole = new Array;

function Main () {
    
    
    PIXI.Container.call(this);
    
    //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;
    //console.log(wST, hST);
    
    
    
    
    
    PIXI.loader
        //Ajoute de la ressoucres à charger
        .add('assets/terrain360.png')
        .add('assets/terrain480.png')
        .add('assets/cursor.png')
        .add('assets/shadow.png')
        //Ecoutes (progression, complete, error)
        .on('progress', onProgressCallback)
        .once('complete', onCompleteCallback)
        .once('error', onErrorCallback)
        //Lance le (télé)chargement des ressources
        .load();
    
    console.log("Main is OK");
    
    }

Main.prototype = Object.create(PIXI.Container.prototype);//Main hérite de PIXI.container   
    


// =============================================== FONCTIONS ===========================================

function onProgressCallback() {
    console.log("progress : ", this.progress, "%");
}

function onErrorCallback() {
    console.log("error", this);
}

function onCompleteCallback() {
    console.log("complete", this);

    //TERRAIN
    if (size == 360) {
//        var terrain = new PIXI.TilingSprite(resources.terrain360.texture);
        var terrain = new PIXI.Sprite.fromImage("assets/terrain360.png");
    } else {
//        var texture_terrain = new PIXI.Texture.fromImage("assets/terrain480.png");
//        var terrain = new PIXI.Sprite(texture_terrain);
        var terrain = new PIXI.Sprite.fromImage("assets/terrain480.png");
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
//    var texture_cursor = new PIXI.Texture.fromImage("assets/cursor.png");
//    
//    cursor = new PIXI.Sprite(texture_cursor);
//    cursor.anchor.set(0, 1);
//    
//    stage.addChild(cursor);
//    
//    console.log("Main is OK");

    cursor = new Hammer();
    stage.addChild(cursor);
    
//TESTS
    for (var i = 0; i<0; i++) {
        console.log("test");
        var mole = new Mole(i);
        stage.addChild(mole);
        console.log(mole.x);
        
        gridMole[i] = mole;
        
        console.log(gridMole[i].x);
    }
    
    pos0 = new Position(0);
    stage.addChild(pos0);
    pos1 = new Position(1);
    stage.addChild(pos1);
    pos2 = new Position(2);
    stage.addChild(pos2);
    pos3 = new Position(3);
    stage.addChild(pos3);
    pos4 = new Position(4);
    stage.addChild(pos4);
    pos5 = new Position(5);
    stage.addChild(pos5);
    pos6 = new Position(6);
    stage.addChild(pos6);
    pos7 = new Position(7);
    stage.addChild(pos7);
    pos8 = new Position(8);
    stage.addChild(pos8);
    
    var mole1 = new Mole(1);
    stage.addChild(mole1);
    var mole2 = new Mole(2);
    stage.addChild(mole2);
    
    
    
//    cir0 = new Mole(0);
    
    window.addEventListener('click', function() {
//        cursor.tap();
//        console.log("Clicked!");
    });
    
    window.addEventListener('mouseup', function() {
        cursor.hammerUp();
    });
    window.addEventListener('mousedown', function() {
        cursor.hammerDown();
    });
    
    
    update();
}


// =============================================== FONCTIONS ===========================================


//Main.prototype.update = function () {
function update() {
//    console.log("updated");
//    console.log(mouseX);
//    console.log(mouseY);
    
    cursor.update();
    
//    cursor.x = mouseX;
//    cursor.y = mouseY;
//    console.log(cursor.x);
//    cursor.x += 1;
    
    
    var timeout = Math.random()*100;
    
    renderer.render(stage);
    requestAnimationFrame(update);
}


Main.prototype.draw = function(i) {
    this.beginFill(0xe74c3c, 1);
    this.drawCircle(0, 0, 15);
    this.endFill();
    this.x = grid[i][0]
    this.y = grid[i][1]
    stage.addChild(this);
};




