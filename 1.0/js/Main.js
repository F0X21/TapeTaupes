//déclaration des variables
var wST;
var hST;
var size;

function Main () {
    PIXI.Container.call(this);
    
    //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;
    //console.log(wST, hST);
    
    //Mise en place du loader
    PIXI.loader
        //Ajoute de la ressources à charger
//        .add('stylesheet', 'assets/test.json')
        //Ecoutes (progression, complete, error)
        .on('progress', onProgressCallback)
        .once('complete', onCompleteCallback)
        .once('error', onErrorCallback)
        //Lance le (télé)chargement des ressources
        .load();
}

    
  Main.prototype = Object.create(PIXI.Container.prototype);//Main hérite de PIXI.container   

// =============================================== CALLBACKS ===========================================

function onProgressCallback() {
    console.log("progress : ", this.progress, "%");
}

function onCompleteCallback() {
    
    console.log("complete", this);
    
    
//    if (size == 360) {
////        var terrain = new PIXI.TilingSprite(resources.terrain360.texture);
//        var texture_terrain = new PIXI.Texture.fromImage("assets/terrain360.png");
//        var terrain = new PIXI.Sprite(texture_terrain);
//    } else {
//        var texture_terrain = new PIXI.Texture.fromImage("assets/terrain480.png");
//        var terrain = new PIXI.Sprite(texture_terrain); 
//    }
//    stage.addChild(terrain);

    var texture_terrain = new PIXI.Texture.fromImage("assets/terrain360.png");
    var terrain = new PIXI.Sprite(texture_terrain);
    stage.addChild(terrain);
    
    console.log("OK");
    
//    renderer.render(stage);
    updateGame();
}

function onErrorCallback() {
    console.log("error", this);
}

function updateGame () {
    renderer.render(stage);
    //boucle sur la fonction updateGame (auto appel optimisé)
    requestAnimationFrame(updateGame);
}




//Main.prototype.update = function () {
//    
//};
