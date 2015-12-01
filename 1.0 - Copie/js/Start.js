function Start () {

    PIXI.Container.call(this);


    var text = new PIXI.Text("clickhere", {fill : "black"});
    stage.addChild(text);
    
    window.addEventListener('click', startGame);

    renderer.render(stage);
    //    updateStart();
}

Start.prototype = Object.create(PIXI.Container.prototype);

function startGame() {

    stage.removeChild(start);

    var main = new Main();
    stage.addChild(main);

    console.log("Switching to main");

    window.removeEventListener('click', startGame);


}


//function updateStart() {
//    renderer.render(stage);
//    requestAnimationFrame(updateStart);
//}