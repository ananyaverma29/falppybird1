var coinImg, pipeImg, pipe2Img;
var cityImg, birdImg;
var background, coin, bird,pipes,pipes2, treasure=0, resetImg, gameOverImg, reset ,r=1;
var tpGroup, bpGroup, coinsGroup;
var gameState=1, gameOver, coinSound, gameOverSound;
function preload()
{
coinImg = loadImage("./assets/coin.png");
cityImg = loadImage("./assets/city.png");
pipeImg = loadImage("./assets/pipes.png");
pipe2Img = loadImage("./assets/pipes2.png");
birdImg = loadImage("./assets/bird.png");
resetImg = loadImage("./assets/reset.png");
gameOverImg = loadImage("./assets/gameOverBlue.png");
gameOverSound = loadSound("gameOver.mp3");
coinSound = loadSound("coinSound.wav");
}

function setup()
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
   // cityImg.resize(windowWidth,windowHeight);
   //gameOverImg.resize(windowWidth,windowHeight);
   // var canvas = createCanvas(windowWidth,windowHeight);
    //background = createSprite(width/2, height/2, width, height);
   // background.addImage(cityImg);
   // background.scale = 1;

    cityImg.resize(canW,canH);
    gameOverImg.resize(canW,canH);
    var canvas = createCanvas(canW,canH);
    background = createSprite(width/2, height/2, width, height);
    background.addImage(cityImg);
    background.scale = 1;

    bird = createSprite(200,200);
    bird.addImage(birdImg);
    bird.scale = 0.2;
    bird.setCollider("circle", 0,0,100);
    bird.debug=true;
 
    gameOver = createSprite(canW/2, canH/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1;
    gameOver.visible = false;
    bpGroup = createGroup();
    tpGroup = createGroup();
    coinsGroup = createGroup();

    reset = createSprite(200,200);
    reset.addImage(resetImg);
    reset.scale = 1;
    reset.visible=false;
}
    
function draw()
{
    if(World.frameCount%50 == 0)
  {
    if(r==1){
      topPipes();
      r=2;
    }
    else if(r==2){
      bottomPipes();
      r=1;
    }
    
  }
  if((touches.length > 0 || keyDown("space")) && bird.y>20) {
     
    bird.velocityY = -3;
     touches = [];
  }
 
  bird.velocityY = bird.velocityY + 0.8;
    /*
  if(keyDown("up")) 
  {
    bird.y = bird.y-4;
  }
   if(keyDown("down"))
   {
     bird.y= bird.y+4;
   }*/
   coins();
   if(bird.collide(tpGroup)|| bird.collide(bpGroup))
   {
     gameState=2;
     gameOverSound.play();
   }
  
   if(gameState == 2)
   {
  
      coinsGroup.setVelocityEach(false)
      
     bird.velocityY=0;
     bird.remove();
     tpGroup.setVisibleEach(false);
      bpGroup.setVisibleEach(false);
      tpGroup.setVelocityEach=0;
     bpGroup.setVeocityEach=0;
     coinsGroup.setVisibleEach(false);
    gameOver.visible=true;
    reset.visible = true;
  

if(touches.length>0 || mousePressedOver(reset)) {      
    location.reload();
   // reset();
    touches = [];
  }
   }
   if(bird.isTouching(coinsGroup))
   {
     
     coinSound.play();
     
   }
   bird.overlap(coinsGroup,removeCoin);
    drawSprites();
    textSize(30);
    fill("black");
   text("Total coins:"+ " " + treasure,width/2-700, height/2-300);
    
}

function topPipes(){
    var tp = createSprite(width, height-680);
    tp.addImage(pipeImg);
   
    var y = Math.round(random(1,5));
    switch(y)
    {
      case 1: tp.scale =1.5;
              //tp.height =200;
              
              tp.height = 700;
       break;
        case 2: tp.scale =1.5;
               // tp.height =200;
               tp.height = 650 ;
        break;
        case 3: tp.scale = 2;
               // tp.height = 100;
               tp.height =850;
      break;  
        case 4:tp.scale = 1.5;
               // tp.height =200;
               tp.height =800;
        break;
        case 5: tp.scale = 1.5;
                //tp.height =70;
                tp.height =700;
      break;
      
    }
    
       tp.velocityX = -5; 
   tpGroup.add(tp);
        
    }
    
    
    function bottomPipes()
    {
      var bp = createSprite(width,height-30);
      bp.addImage(pipe2Img);
      
      var x = Math.round(random(1,5));
      
      switch(x)
      {
        case 1: bp.scale =1.5;
               //bp.height =50;
                bp.height = 400;
             
        break;
        case 2: bp.scale =1.5;
               // bp.height =200;
                bp.height = 500;
        break;
        case 3: bp.scale = 1.5;
               // bp.height = 200;
                bp.height = 450;
        break;
        case 4:bp.scale = 1.5;
                //bp.height =100;
              bp.height = 600;
        break;
        case 5: bp.scale = 2;
                //bp.height =200;
              bp.height = 670;
        break;
    
    }
    bp.velocityX = -5; 
      bpGroup.add(bp);
      }

  
   function removeCoin(bird, coin){
    treasure+=10;
    coin.remove();
    coin.destroy();
    
  }
  function coins(){
    if(World.frameCount%50 == 0){
      var coin = createSprite(World.width+10, random(50,350),10,10);
      coin.addImage(coinImg);
      coin.scale = 0.35;
      coin.velocityX = -3;
      coinsGroup.add(coin);
    }
  }
 /* function Reset(){
    gameState = 1;
    gameOver.visible = false;
    reset.visible = false;
   treasure = 0;*/
  
  
