var ball;
var database;
var posicion;

function setup(){
    database = firebase.database();
    console.log(database)
    
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    var posicion_pelota = database.ref('pelota/posicion');
    posicion_pelota.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if (posicion !== undefined){

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writePosition(x,y) {
     database.ref('pelota/posicion').set({
         'x': posicion.x + x,
         'y': posicion.y + y
     })

}

function showError(){
    
    
}

function readPosition(data){
    posicion = data.val ()
    ball.x = posicion.x;
    ball.y = posicion.y;

}