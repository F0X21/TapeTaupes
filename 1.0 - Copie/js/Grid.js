var grid = new Array();
var coord = new Array();


function Grid() {
    
//    PIXI.Texture.call(this);
     
    
    for (var i = 0, i<9, i++) {
        for (var j = 0, j<2, j++) {            
            if (i < 3) {
                if (j == 0) {
                    grid[i][j] = 0.2+i*0.3;
                } else {
                    grid[i][j] = 0.75;
                }
            } 
            if (i >= 3 && i < 6) {
                if (j == 0) {
                    grid[i][j] = 0.25+i*0.25;
                } else {
                    grid[i][j] = 0.75;
                }
            }  
            if (i >= 6) {
                if (j == 0) {
                    grid[i][j] = 0.3+i*0.2;
                } else {
                    grid[i][j] = 0.75;
                }
            }
        }
    }
        
    
    var grid = [[0.2,0.75],[0.5,0.75],[0.8,0.75],[0.25,0.5],[0.5,0.5],[0.75,0.5],[0.3,0.25],[0.5,0.25],[0.7,0.25]];
    
    
    var cir0,
        cir1,
        cir2,
        cir3,
        cir4,
        cir5,
        cir6,
        cir7,
        cir8;
    
    for (var i = 0, i<9, i++) {
        
        cir = "cir"+i;
        cir.beginFill(0xe74c3c, 1);
        cir.drawCircle(0, 0, 15);
        cir.endFill();
        cir.x = grid[i][0]
        cir.y = grid[i][1]
        stage.addChild(cir);
    }
    

    
}

//Grid.prototype = Object.create(PIXI.Texture.prototype);

