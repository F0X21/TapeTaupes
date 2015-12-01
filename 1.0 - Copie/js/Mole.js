/*
Les variables :

this.currentCell 
this.ySpawnCoord 


Les fonctions : 

*/



function Mole() {

    PIXI.Sprite.call(this);
    PIXI.Graphics.call(this);

    this.texture_mole = new PIXI.Sprite.fromImage("assets/zombie-3.png");
    this.texture_mole.anchor.set(0.5, 1);
    this.addChild(this.texture_mole);

    this.up = false;
    this.down = false;
    var me = this;

    this.normalValue = 10;
    this.totalLife = 1

    this.value = this.normalValue;
    this.life = this.totalLife;

    this.valueText = new PIXI.Text ("");
    this.valueTextUp = false;

    //    this.currentCell = 0;


    this.texture_mole.interactive = true;
    this.texture_mole.addListener('click', _clickCallback);

    //    var interval = Math.floor(Math.random()*3000)+1000;

    this.spawn();
    this.spawnTimer = setInterval(function(){
        me.respawn();
    }, 5000);
}

Mole.prototype = Object.create(PIXI.Sprite.prototype);

//Assigne la prochaine cellule et renvoi la position XY
Mole.prototype.nextPosition = function () {
    gridMole[this.currentCell] = null;
    //    var newCell = Math.floor(Math.random()*9);
    //    while (newCell == 9 || gridMole[newCell] != null) {
    //        newCell = Math.floor(Math.random()*9);  }
    var newCell;
    do {
        newCell = Math.floor(Math.random()*9)
    } while (newCell == 9 || gridMole[newCell] != null);
    this.currentCell = newCell;
    gridMole[this.currentCell] = this;

    var newPos = new Array;
    newPos[0] = grid[newCell][0] * wTR;
    newPos[1] = grid[newCell][1] * hTR;
    return newPos;
}

//Fait apparaitre le taupe a la position calculé par this.nextPosition()
Mole.prototype.spawn = function () {

    stage.removeChild(this);

    this.up = true;
    this.alpha = 1;

    this.currentPosition = this.nextPosition();
    this.x = this.currentPosition[0];
    this.y = this.currentPosition[1]+spawnOffset;

    //    if (this.currentCell <= 2) {
    //        terrain2.addChild(this);
    //    } else if (2 < this.currentCell && this.currentCell <= 5) {
    //        terrain3.addChild(this);
    //    } else if (this.currentCell <=8) {
    //        terrain4.addChild(this);
    //    }

    var terrainUsedMole = getLine(this.currentCell)+1;
    //    console.log('terrain'+terrainUsedMole);
    window['terrain'+terrainUsedMole].addChild(this);

    this.ySpawnCoord = this.currentPosition[1]
    //    console.log("newPos = "+this.y+" and pos XY = "+this.currentPosition[1]); 
}

//Lance l'animation de descente de la taupe
Mole.prototype.respawn = function () {
    this.up = false;
    //    console.log("respawn with "+value+" points value");
    //    console.log(this.value)
    this.life = this.totalLife;
    this.value = this.normalValue;
    this.down = true;
}

//Fonction a exécuter quand on tape sur une taupe
Mole.prototype.tap = function () {
    //    console.log("Mole Tapped");

    this.life -= 1;

    if (this.life == 0) {


        this.showScore();

        //    console.log(this.value + "/" + value + " : " + score)
        score += Math.floor(this.value);
        //    addScore(score);
        scoreText.text = score;

        explode(this.currentCell);
        this.down = false;
        this.value = this.normalValue;
        this.life = this.totalLife;
        //    console.log("respawn with "+value+" points value");
        this.up = false;

        this.spawn();
        clearInterval(this.spawnTimer);
        var me = this;
        this.spawnTimer = setInterval(function(){
            me.respawn();
        }, 5000);
    }
}

//callback de click qui utilise Mole.tap()
function _clickCallback() {
    //    console.log(this);
    this.parent.tap();   
    //    console.log("tapped");
}

//Fonction d'update de la taupe pour gérer les animations d'entrée et de sortie
Mole.prototype.updateMole = function() {
    //    console.log(this.down);
    //    console.log(this.y + " / " + this.ySpawnCoord); 
    if (!this.up && !this.down) {
        //        console.log("idle") 
        step = this.normalValue/250;
        this.value -= step;
    }

    if (this.up) {
        this.y -= 2;
    }

    if (this.down) {
        this.y +=2;   
        //        console.log("moving down");
    }

    if (this.y <= this.ySpawnCoord && this.up) {
        this.up = false;
    }

    if (this.y >= this.ySpawnCoord + spawnOffset  && this.down) {
        this.down = false;
        this.spawn();
        //        console.log("Setting this.down to false");
    }

    if (this.valueTextUp) {
        this.valueText.y -= 1;
        this.valueText.alpha -= 0.02;
//        console.log("text is going up" + this.valueTextUp + " " + this.valueText.alpha);

    }

    if (this.valueText.alpha <= 0) {
        console.log("removing valueText");
        stage.removeChild(this.valueText);
        this.valueTextUp = false;
        this.valueText.alpha = 1;
    }
}

Mole.prototype.showScore = function () {
    //function showScore() {

    this.valueTextUp = false;
    this.valueText.alpha = 1;

    this.valueText.text = Math.floor(this.value);
    //    this.valueText.alpha = 1;
    this.valueText.x = this.currentPosition[0];
    this.valueText.y = this.currentPosition[1]-spawnOffset;

    stage.addChild(this.valueText);
    this.valueTextUp = true;

    //    console.log(this.valueTextUp);

}
