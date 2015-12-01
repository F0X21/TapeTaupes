

function SuperMole() {

    Mole.call(this);

    this.texture_mole = new PIXI.Sprite.fromImage("assets/zombie-4.png");
    this.texture_mole.anchor.set(0.5, 1);
    this.addChild(this.texture_mole);

    this.texture_mole.interactive = true;
    this.texture_mole.addListener('click', _clickCallback);

    this.normalValue = 20;
    this.totalLife = 2;
    
    this.value = this.normalValue;
    this.life = this.totalLife;

}

SuperMole.prototype = Object.create(Mole.prototype);

SuperMole.prototype.constructor = SuperMole;


////Lance l'animation de descente de la taupe
//SuperMole.prototype.respawn = function () {
//    this.up = false;
//    this.life = totalLife;
//    this.down = true;
//}
//
////Fonction a exécuter quand on tape sur une taupe
//SuperMole.prototype.tap = function () {
//
//    this.life -= 1;
//
////    console.log("Mole Tapped " + this.life);
//
//    if (this.life == 0) {
//
////        console.log("OUI "+this);
//
//        this.alpha = 0.1;
//        
//        this.life = totalLife;
//
//        explode(this.currentCell);
//        this.down = false;
//        this.up = false;
//
//        this.spawn();
//        clearInterval(this.timer);
//        var me = this;
//        this.timer = setInterval(function(){
//            me.respawn();
//        }, 5000);
//
//    }
//}