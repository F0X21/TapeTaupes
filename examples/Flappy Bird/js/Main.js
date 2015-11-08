// Symboles BirdMC=movieclip avec toutes les images de l'oiseau
var birdMC, bg, ground, tuyaux, getReady, txtGameOver;
// Rectangles Collisions
var b1, b2, b3, b4;
// Champ texte score
var scorePlayer;

// Dimensions scène
var wST, hST;

// Phase de jeu
var phaseJeu = false;
// Phase GameOver
var phaseGameOver = false;
// Tableaux pour stocker les Symboles pour les vies
var birdsVie = [];
// nombre de vies
var nbVies = 5;
// nombre de points
var nbPts = 0;
// Savoir si il est possible d'ajouter un point ou non
var addPt = true;

// Phase Cos pour mouvement sinusoïdale de l'oiseau
var phase = 0;
// Amplitude déplacement bird avec cos
var amplitude = 40;
// Vitesse X déplacement arrière-plan
var vX_bg = 1;
// Vitesse X déplacement sol et tuyaux
var vX_ground = 3;
// Vitesse Y déplacement bird
var vY = 0.0;
// Vitesse Y maxi autorisée
var vYMax = 10;
// Impulsion de l'oiseau
var impulsionY = -5;
// Accélaration (gravité) appliquée à chaque image
var accelY = 0.2;

// Cadence de lecture 'frameRate'
var fps = 100;

function Main() {
    PIXI.Container.call(this);
    
    //stockage des dimensions de la scène
    wST = renderer.width;
    hST = renderer.height;
    //console.log(wST, hST);
    
    //Mise en place du loader
    PIXI.loader
        //Ajoute de la ressoucres à charger
        .add('stylesheet', 'assets/flappy_bird.json')
        //Ecoutes (progression, complete, error)
        .on('progress', onProgressCallback)
        .once('complete', onCompleteCallback)
        .once('error', onErrorCallback)
        //Lance le (télé)chargement des ressources
        .load();
}


Main.prototype = Object.create(PIXI.Container.prototype);
    
    
// =============================================== CALLBACKS ===========================================

function onProgressCallback() {
    console.log("progress : ", this.progress, "%");
}

function onCompleteCallback() {
    console.log("complete", this);
    
//BACKGROUND
    bg = new PIXI.Sprite(PIXI.Texture.fromFrame("background.png"));
    //Ajout du sprite sur la scène
    stage.addChild(bg);
   
//TUYAUX
    tuyaux = new PIXI.Sprite(PIXI.Texture.fromFrame("pipe.png"));
    //Position
    tuyaux.position.set(wST + tuyaux.width * 0.6, hST * 0.5);
    //Point d'ancrage
    tuyaux.anchor.set(0.5);
    //Ajout du sprite sur la scène
    stage.addChild(tuyaux);
    
//Box des tuyaux    
    b1 = new PIXI.Graphics();
    b1.x = -46;
    b1.y = 85;
    b1.beginFill(0, 0.5);
    b1.drawRect(0, 0, 92, 43);
    b1.endFill();
    tuyaux.addChild(b1);
    
    b2 = new PIXI.Graphics();
    b2.x = -46;
    b2.y = -128;
    b2.beginFill(0, 0.5);
    b2.drawRect(0, 0, 92, 43);
    b2.endFill();
    tuyaux.addChild(b2);
    
    b3 = new PIXI.Graphics();
    b3.x = -42;
    b3.y = -571;
    b3.beginFill(0, 0.5);
    b3.drawRect(0, 0, 83, 443);
    b3.endFill();
    tuyaux.addChild(b3);
    
    b4 = new PIXI.Graphics();
    b4.x = -42;
    b4.y = 128;
    b4.beginFill(0, 0.5);
    b4.drawRect(0, 0, 83, 443);
    b4.endFill();
    tuyaux.addChild(b4);

//SOL
    ground = new PIXI.Sprite(PIXI.Texture.fromFrame("ground.png"));
    //Position
    ground.position.set(0, hST - ground.height * 0.65);
    //Ajout du sprite sur la scène
    stage.addChild(ground);
    
//OISEAU
    var frames = [];
    for (var i = 0; i < 4; i++) {
        frames.push(PIXI.Texture.fromFrame("bird" + i + ".png"));
    }
    birdMC = new PIXI.extras.MovieClip(frames);
    stage.addChild(birdMC);
    birdMC.position.set(wST * 0.3, hST * 0.5);
    birdMC.anchor.set(0.5);
    //Regle la vitesse de lecture
    birdMC.animationSpeed = 0.15;
    //Lance la lecture
    birdMC.play();
    
//VIES    
    for (var i = 0; i < nbVies; i++) {
        birdsVie[i] = new PIXI.Sprite(PIXI.Texture.fromFrame("bird1.png"));
        stage.addChild(birdsVie[i]);
        birdsVie[i].width /= 2;
        birdsVie[i].height /= 2;
        birdsVie[i].position.set(wST - (i+1)*birdsVie[i].width , hST - 2*birdsVie[i].height);
    }
    
//SCORE
    scorePlayer = new PIXI.Text(nbPts);
    stage.addChild(scorePlayer);
    
//GAME OVER
    txtGameOver = new PIXI.Sprite(PIXI.Texture.fromFrame("game_over.png"));

    
    
    window.onclick = onDown;
    window.addEventListener('ontouchstart', onDown, false);
    
    
    //actualise le render du stage
//    renderer.render(stage);
    updateGame();
}

function onErrorCallback() {
    console.log("error", this);
}

function updateGame () {
    
    if(!phaseJeu){
        //Animation de l'oiseau
        birdMC.y = Math.sin(phase) * amplitude*2 + hST/2;
        phase += 0.05;
    } else if (!phaseGameOver){
        //Deplace le sol
        ground.x -= vX_ground;
        //le sol doit boucler tout les 121 pixels
        ground.x %= 121;
        
        //Deplace les tuyaux
        tuyaux.x -= vX_ground;
        
        if(tuyaux.x <= -tuyaux.width){
            tuyaux.x = wST + tuyaux.width;
            tuyaux.y = Math.random() * 400 - 250 + hST/2;
            addPt = true;
        }
        
    //Deplace l'oiseau
        //Ajoute à la propriété y a la vitesse vY
        birdMC.y += vY;
        
        //Applique l'accélération 'accelY' à la vitess vY
        //force la valeur de vY a ne pas passer vYMax
        vY = Math.min(vYMax, vY + accelY);

        //Applique une rotation en fonction de la vitesse vY
        birdMC.rotation = vY * 0.05 ;
        
        //Force l'oiseau a ne pas sortir par le haut
        if (birdMC.y <= birdMC.height/2){
            birdMC.y = birdMC.height/2 + 1;
            //réinitialise la vitesse Vy
            vY = 0;
        }
        
        //Vérifie si l'oiseau touche le sol
        if (birdMC. y >= hST - birdMC.height/2 - ground.height*0.65) {
            //recentre l'oiseau
            birdMC.y = hST/2;
            //réinit vY à 0
            vY = 0;
            //perd une vie
            nbVies--;
            birdsVie[nbVies].alpha = 0.5;
            //Réinit le tube
            tuyaux.x = wST + tuyaux.width;
            tuyaux.y = Math.random() * 400 - 250 + hST/2;
        }
    
    //Détecte les collisions
        if (collision(birdMC, b1) || collision(birdMC, b2) || collision(birdMC, b3) || collision(birdMC, b4)) {
           //recentre l'oiseau
            birdMC.y = hST/2;
            //réinit vY à 0
            vY = 0;
            //perd une vie
            nbVies--;
            birdsVie[nbVies].alpha = 0.5;
            //Réinit le tube
            tuyaux.x = wST + tuyaux.width;
            tuyaux.y = Math.random() * 400 - 250 + hST/2;
        }
    //Ajoute les points    
        if (birdMC.x > tuyaux.x  && addPt) {
            nbPts++;
            scorePlayer.text = nbPts;
            addPt = false
        }
        
    //
        if (nbVies === 0) {
            phaseGameOver = true;
            stage.addChild(txtGameOver);
            txtGameOver.position.set((wST - txtGameOver.width)/2, (hST - 2*txtGameOver.height)/2);
            stage.removeChild(birdMC);
//            stage.removeChild(birdsVie);
        }
        
    } else {
        
        
//        console.log("gameOver");
        
            
    }
    
    
    //Actualise le rendu
    renderer.render(stage);
    //boucle sur la fonction updateGame (auto appel optimisé)
    requestAnimationFrame(updateGame);
}



function onDown() {
    if(!phaseJeu){
        phaseJeu = true;
    } else if(phaseGameOver) {
        location.reload();
    } else {
        vY = impulsionY;
    }
}

function collision(r1, r2) {
    return !((r2.x + tuyaux.x) > (r1.x + r1.width * .5) ||
             (r2.x + tuyaux.x + r2.width) < (r1.x - r1.width * .5) || 
             (r2.y + tuyaux.y) > (r1.y + r1.height * .5) || 
             (r2.y + tuyaux.y + r2.height) < (r1.y - r1.height * .5));
}