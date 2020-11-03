var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, background, gameOverImg, gameOver, restart;
var banana ,bananaImage, obstacle, obstacleImage, restartImg;

var FoodGroup, obstacleGroup;

var jungleSound, defeatSound;

var survivalTime = 0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 backgroundImg = loadImage("jungle.png");
  jungleSound = loadSound("jungle.mp3");
  defeatSound = loadSound("defeat.mp3");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(600, 600);
  
  background = createSprite(300,200,800,600);
  background.addImage("background", backgroundImg);
  background.scale = 2.5;

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-(4 + 9*survivalTime/5);
  ground.x=ground.width/2;
  ground.visible = false;
  
  console.log(ground.x);
  
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
    
  restart = createSprite(300,140);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
  
}

function draw() {
  
  
  if(gameState === PLAY){

   
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) ;
  text("Survival Time: "+ survivalTime, 250,100); 
   ground.velocityX=-(4 + 9*survivalTime/5);
    
    if(keyDown("space")) {
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
  if(ground.x<0) {
    ground.x=ground.width/2;
   
  }
    
    
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    jungleSound.play();
    
  }
  
    
    if(obstaclesGroup.isTouching(monkey)){
      defeatSound.play();
      gameState = END;
  }
  }
  else if (gameState === END){
 
    
  gameOver.visible = true;
  restart.visible = true;
  monkey.vsible = false;
    
  ground.velocityX = 0;
  monkey.velocityY = 0;  
  FoodGroup.setVelocityEach(0);
  obstaclesGroup.setVelocityEach(0);
    
      background = createSprite(300,200,800,600);
  background.addImage("background", backgroundImg);
  background.scale = 2.5;
    
    gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = true;
  
    
  restart = createSprite(300,140);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = true;

  if(mousePressedOver(restart) || keyDown("r") || keyDown("enter")){
    reset();
  }
  }
   drawSprites();
}



function spawnFood() {
  if (frameCount % 200 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -(3 + survivalTime/4);
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if(frameCount % 500 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -(6 + survivalTime/10);
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
         
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  
  survivalTime = 0;
  
}







