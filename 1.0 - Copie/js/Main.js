//Music : Grim Grinning Ghost 8-bit

//déclaration des variables
//Largeur et hauteur du stage
var wST;
var hST;
//Largeur et hauteur du terrain (fichier image)
var wTR = 480;
var hTR = 640;
var size;
var mouseX;
var mouseY;
var cursor;
var grid = [[0.19,0.67],[0.5,0.67],[0.81,0.67],[0.27,0.53],[0.5,0.53],[0.73,0.53],[0.33,0.41],[0.5,0.41],[0.66,0.41]];
var gridMole = new Array;
var isUsingKeyboard;
var spawnOffset = 50;
var score = 0;
var scoreText = new PIXI.Text(score);
var timer = new PIXI.Text("00 : 00");

var explosion;

function Main () {

    PIXI.Container.call(this);

    //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;

    //Loader 
    PIXI.loader
    //Ajoute de la ressoucres à charger
        .add('assets/terrain360.png')
        .add('assets/terrain480.png')
        .add('assets/terrain480_1.png')
        .add('assets/terrain480_2.png')
        .add('assets/terrain480_3.png')
        .add('assets/terrain480_4.png')
        .add('assets/terrain_entier.png')
        .add('assets/zombie-3.png')
        .add('assets/zombie-4.png')
        .add('assets/cursor.png')
        .add('assets/shadow.png')
        .add('assets/explosion.png')
    //Ecoutes (progression, complete, error)
        .on('progress', onProgressCallback)
        .once('complete', onCompleteCallback)
        .once('error', onErrorCallback)
    //Lance le (télé)chargement des ressources
        .load();

    //    console.log("Main is OK");
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
    //    if (size == 360) {
    //        var terrain = new PIXI.Sprite.fromImage("assets/terrain360.png");
    //    } else {
    var terrain1_texture = new PIXI.Sprite.fromImage("assets/terrain480_1.png");
    var terrain2_texture = new PIXI.Sprite.fromImage("assets/terrain480_2.png");
    var terrain3_texture = new PIXI.Sprite.fromImage("assets/terrain480_3.png");
    var terrain4_texture = new PIXI.Sprite.fromImage("assets/terrain480_4.png");
    var terrain_entier = new PIXI.Sprite.fromImage("assets/terrain_entier.png");
    //    }

    terrain1_texture.y = 426;
    terrain2_texture.y = 341;
    terrain3_texture.y = 266;
    terrain4_texture.y = 0;

    terrain4.addChild(terrain4_texture);
    terrain3.addChild(terrain3_texture);
    terrain2.addChild(terrain2_texture);
    terrain1.addChild(terrain1_texture);

    stage.addChild(terrain4);
    stage.addChild(terrain3);
    stage.addChild(terrain2);
    stage.addChild(terrain1);


    //    this.score = 0;

    //    var timeStart = new Date();
    //    var timer = new Date();
    //
    ////    timer.setSeconds(0);
    ////    timer.setMinutes(0);
    //
    //    setInterval(function () {
    //        timer = new Date();
    //        console.log((timer.getMinutes() - timeStart.getMinutes()) + " : " + (timer.getSeconds() - timeStart.getSeconds()));
    //    }, 500);

    var minutes = 0;
    var seconds = 0;
    
    timer.x = wST-timer.width;
    stage.addChild(timer);

    setInterval(function () {
        seconds++;
        if ( seconds%60 == 0) {
            minutes++;
        }
        if (minutes < 10) {
            var textMinutes = "0"+minutes;
        } else {
            var textMinutes = minutes;
        }
        if ((seconds-60*minutes) < 10) {
            var textSeconds = "0"+(seconds-60*minutes);
        } else {
            var textSeconds = (seconds-60*minutes);
        }
//        console.log(textMinutes + " : " + textSeconds);
        
        timer.text = textMinutes + " : " + textSeconds
        
    }, 1000);



    //    this.scoreText.addListener('zombieKilled', _zombieKilledCallback.bind(this));

    stage.addChild(scoreText);





    //    this.scorePlayerLeft.text = parseInt(this.scorePlayerLeft.text) +1;


    //EXPLOSION
    explosion = new PIXI.Sprite.fromImage("assets/explosion.png");
    explosion.anchor.set(0.5, 1);
    //    console.log(explosion);

    //    console.log("Main is OK");


    stage.interactive = true;

    //Gestion de la souris 
    stage.on('mousemove', function(mouseData){
        mouseX = mouseData.data.originalEvent.x
        mouseY = mouseData.data.originalEvent.y;
        isUsingKeyboard = false;
        cursor.update();
    });

    //Marqueurs graphiques de position
    for (var i = 0; i<9; i++) {
        window['pos' + i] = new PIXI.Graphics();
        var pos = window['pos' + i];
        pos.beginFill(0x000000, 1);
        pos.drawCircle(0, 0, 15);
        pos.endFill();
        pos.x = grid[i][0] * wTR;
        pos.y = grid[i][1] * hTR;
        pos.alpha = 0.1;
        stage.addChild(pos);
    }

    cursor = new Hammer();
    stage.addChild(cursor);

    mole1 = new Mole();
    //    stage.addChild(mole1);
    mole2 = new SuperMole();
    //    stage.addChild(mole2);


    //    cir0 = new Mole(0);

    window.addEventListener('click', function() {
        //        console.log("Clicked!");
    });

    window.addEventListener('keypress', function(eventData) {
        //        console.log(eventData.which);
        isUsingKeyboard = true;
        //        console.log("test");
        keyboardCallback(eventData);
    });

    window.addEventListener('mouseup', function() {
        cursor.hammerUp();
    });
    window.addEventListener('mousedown', function() {
        cursor.hammerDown();
    });


//    console.log(stage.children);

    update();
}


// =============================================== FONCTIONS ===========================================


//Main.prototype.update = function () {
function update() {



    cursor.update();
    mole1.updateMole();
    mole2.updateMole();
    //    console
    //    mole2.updateMole();


    //    var timeout = Math.random()*100;

    renderer.render(stage);
    requestAnimationFrame(update);
}


function keyboardCallback(eventData) {
    //Main.keyboardCallback = function (eventData) {
    e = eventData;
    i = e.which - 49;
    //    console.log(i);
    cursor.x = grid[i][0] * wTR;
    cursor.y = grid[i][1] * hTR;
    //    window.dispatchEvent('click');
    //    window.click();
    eventFire(window, 'click');
    eventFire(window, 'mousedown');  

    setTimeout(function () {
        //        console.log("test");
        eventFire(window, 'mouseup');
    }, 100);
    var moleClicked = gridMole[i];
    //    console.log("click"+moleClicked);
    if (moleClicked != null) {
        //        eventFire(moleClicked, 'click');
        moleClicked.tap();
    }
}


function eventFire(el, etype){
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
}

//EventFire avec support IE?
//Source : http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
//function eventFire(el, etype){
//    if (el.fireEvent) {
//        el.fireEvent('on' + etype);
//    } else {
//        var evObj = document.createEvent('Events');
//        evObj.initEvent(etype, true, false);
//        el.dispatchEvent(evObj);
//    }
//}

function explode(cell) {

    explosion.x = grid[cell][0] * wTR;
    explosion.y = grid[cell][1] * hTR;

    var terrainUsed = getLine(cell);
    window['terrain'+terrainUsed].addChild(explosion);
    //    console.log('terrain'+terrainUsed);

    setTimeout(function() {
        window['terrain'+terrainUsed].removeChild(explosion);
    }, 200);  
}

function getLine(cell) {
    if (cell <= 2) {
        return 1;
    } else if (2 < cell && cell <= 5) {
        return 2;
    } else if (cell <=8) {
        return 3;
    }
}

