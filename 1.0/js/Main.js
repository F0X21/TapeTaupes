//déclaration des variables


function Main () {
   
    PIXI.Container.call(this);


     //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;
    //console.log(wST, hST);
    
    //Mise en place du loader
    PIXI.loader
        //Ajoute de la ressoucres à charger
//        .add('stylesheet', 'assets/test.json')
        //Ecoutes (progression, complete, error)
        .on('progress', onProgressCallback)
        .once('complete', onCompleteCallback)
        .once('error', onErrorCallback)
        //Lance le (télé)chargement des ressources
        .load();

    
   
    //Création des objets
    this.score = new PIXI.Text('0');
    this.score.x = ;
    this.score.y = ;
    this.addChild(this.score);
    
}

function onProgressCallback() {
    console.log("progress : ", this.progress, "%");
}

function onCompleteCallback() {
    console.log("complete", this);
}

function onErrorCallback() {
    console.log("error", this);
}




Main.prototype = Object.create(PIXI.Container.prototype); //Main hérite de PIXI.container

function updateGame () {

}

