var gameState = "play";
var back,character1,character1Image,backImage,coinGroup,invisibleGroup,jumpImage;
var score = 0;
var crow,crowImage,crowImage2,character1die,gameover,gameoverImage,restart,restartImage,eagleSound,dieSound,coinSound,jumpSound;
function preload(){
  
     backImage = loadImage("mountainBack.png");
     character1Image = loadAnimation("Tortoise1.png","Tortoise2.png","Tortoise3.png","Tortoise4.png","Tortoisem1.png","Tortoisem2.png","Tortoisem3.png","Tortoisem4.png"); 
     coinImage = loadAnimation("Ring1.png","Ring2.png","Ring3.png","Ring4.png");
     jumpImage = loadAnimation("shell1.png","shell2.png","shell3.png","shell4.png");
     crowImage = loadAnimation("crow1.png","crow2.png","crow3.png","crow4.png","crow5.png","crow6.png","crow7.png","crow8.png");
     crowImage2 = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png");
     character1die = loadAnimation("turtlea.png","turtleb.png","turtlec.png","turtled.png","turtlee.png","turtlee.png","turtlee.png","turtlee.png","turtlee.png","turtlee.png");
     gameoverImage = loadImage("gameover.png");
     restartImage = loadImage("restart.png");
     eagleSound = loadSound("eagle.wav");
     dieSound = loadSound("curse.wav");
     coinSound = loadSound("bonus.wav");
     jumpSound = loadSound("jump.wav");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  back = createSprite(width/2,height/2,10,10);
  back.addImage(backImage);
  back.scale = height*0.008;
 
  
  character1die.frameDelay =17;
  character1 = createSprite(100,height-50,10,10);
  character1.addAnimation("walk",character1Image);
  character1.addAnimation("jump",jumpImage);
  character1.addAnimation("die",character1die);
  character1.scale = width*0.003;
  character1.debug = false;
  
  invisibleGround = createSprite(width/2,height,width,10);
  invisibleGround.visible = false ;
  
  gameover = createSprite(width/2,height/2-50,30,30);
  gameover.addImage(gameoverImage);
  gameover.scale = width*0.003;
  gameover.visible = false;
  
  restart = createSprite(width/2,height/2+100,10,10);
  restart.addImage(restartImage);
  restart.scale = width*0.003;
  restart.visible = false;
  
  coinGroup = new Group();
  crowGroup = new Group();
}


function draw() {
  background(85,73,68);
  frameRate(30);
  if(back.x < 0){
      back.x = width/2;
  }
  if(gameState === "play"){
    back.velocityX = -2;
    
    if(character1.y > height-90){
      character1.changeAnimation("walk",character1Image);
    }

    if(touches.length > 0 || keyDown("space")){
      jumpSound.play();
      character1.velocityY = -10;
      character1.changeAnimation("jump",jumpImage);
    }
    character1.velocityY+=0.8;
    character1.collide(invisibleGround);
    coin();
    crows();
    if(coinGroup.isTouching(character1)){
      coinSound.play();
      coinGroup.destroyEach();
      score = score + 5;
      
    }
    if(crowGroup.isTouching(character1)){
      dieSound.play();
      gameState = "end";
    }
  
    
  }
  if(gameState === "end"){
    back.velocityX = 0;
    coinGroup.setVelocityXEach(0);
    crow.changeAnimation("pick",crowImage2);
    crowGroup.setVelocityEach(1,-5);
    character1.changeAnimation("die",character1die);
    character1.x = crow.x + 10;
    character1.y = crow.y + 60;
    gameover.visible = true;
    restart.visible = true;
    coinGroup.setLifetimeEach(-1);
    crowGroup.setLifetimeEach(-1);
    
    if(touches.length > 0 || mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
  for(i = 0; i < width; i = i+30){
    strokeWeight(5);
    stroke("#FFE4C4");
    line(i,50,i+20,50);
  }
   for(i = 0; i < width; i = i+30){
    strokeWeight(5);
    stroke("#FFE4C4");
    line(i,100,i+20,100);
  }
  fill("#DC143C");
  textSize(20);
  text("Score : "+score,width/2-50,80);
  
  //text(mouseX+" "+mouseY,mouseX,mouseY);
}
function reset(){
  gameState = "play";
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  crowGroup.destroyEach();
  coinGroup.destroyEach();
  character1.x = 100;
  character1.y = 550; 
  character1.changeAnimation("walk",character1Image);
}
function coin(){
  if(frameCount % 180 === 0){
    coins = createSprite(width,500,10,10);
    coins.addAnimation("spin",coinImage);
    coins.velocityX = -3;
    coins.lifetime = width/3;
    coins.scale = width*0.002;
    coins.y = Math.round(random(height-250,height-150));
    coinGroup.add(coins);
  }
}
function crows(){
  if(frameCount % 250 === 0){
    crow = createSprite(width,500,10,10);
    crow.addAnimation("fly",crowImage);
    crow.addAnimation("pick",crowImage2);
    crow.velocityX = Math.round(random(-3,-6));
    crow.scale = width*0.004;
    crow.y = Math.round(random(height-250,height-70));
    crow.debug =false;
    crow.lifetime = width/2;
    crow.setCollider("circle",0,0,20);
    eagleSound.play();
    crowGroup.add(crow);
  }
}
