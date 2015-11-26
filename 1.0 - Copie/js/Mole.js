function Mole() {
    
    PIXI.Graphics.call(this);
    
        this.beginFill(0xffffff, 1);
        this.drawCircle(0, 0, 15);
        this.endFill();
//        this.x = grid[i][0] * 480;
//        this.y = grid[i][1] * 680;
        
        this.spawn();
        
    
    
        this.interactive = true;
        this.addListener('click', _tapCallback);
        
        var me = this;
    
        setInterval(function(){
//            console.log("Entering Timeout");
//            me.alpha = 0;
            me.spawn();
        }, Math.floor(Math.random()*500)+500);
            
}

Mole.prototype = Object.create(PIXI.Graphics.prototype);

//function _spawn() {
Mole.prototype.spawn = function () {
    
    newPos = _nextHole();
    
    this.x = newPos[0]
    this.y = newPos[1];
   
    
}

Mole.prototype.despawn = function () {
    
}

//Calcule la prochaine position de la taupe
function _nextHole() {
    
    gridMole[this.pos] = false;
    var newCell; 
    
    do {
        i = Math.floor(Math.random()*10);
    } while (newCell == 10 && gridMole[newCell] != true);


    this.pos = i;
    gridMole[i] = true;
    
    var newPos = new Array;
    newPos[0] = grid[i][0] * 480;
    newPos[1] = grid[i][1] * 640;
    
    console.log(gridMole);
    
    return newPos;
}

//Fonction a exécuter quand on tape sur une taupe
function _tapCallback() {
    console.log("Mole Move");
    this.x += 50;
    setTimeout(function() {
            this.alpha = 0;
    }, 200); 
}