
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var ship = new Image();
var bg = new Image();
var fg = new Image();
var stagNorth = new Image();
var stagSouth = new Image();

ship.src = "image/ship.png";
bg.src = "image/spacebg.png";
fg.src = "image/spacefg.png";
stagNorth.src = "image/stagnorth.png";
stagSouth.src = "image/stagsouth.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = .8;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();
var st = new Audio();

fly.src = "sounds/flight.wav";
scor.src = "sounds/score.mp3"
st.src = "sounds/stargliderst.mp3"

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(keycode){
    bY -= 20;
    fly.play();
}



// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


// draw images

function draw(){
    st.play();
        
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = stagNorth.height+gap;
        ctx.drawImage(stagNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(stagSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*stagNorth.height)-stagNorth.height
            }); 
        }

        // detect collision
        
        if( bX + ship.width >= pipe[i].x && bX <= pipe[i].x + stagNorth.width && (bY <= pipe[i].y + stagNorth.height || bY+ship.height >= pipe[i].y+constant) || bY + ship.height >=  cvs.height - fg.height){
            
            location.reload(); // reload the page
           
        }
        
        if(pipe[i].x == 5){
            score++;
            
             scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(ship,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























