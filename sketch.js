var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running,ground
var banana,bananaImage,obstacle,obstacleImage
var foodGroup, obstacleGroup;

var score = 0

var survivalTime;
var invisibleground

function preload () {
monkey_running = loadAnimation ("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");

 
    
  
}


function setup (){
createCanvas(600,400);
 background ("lightblue");
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.11
  
  
  ground = createSprite(300,350,900,10);
  ground.velocityX = -6;
  ground.x = ground.width/2
  console.log(ground.x)
  
  obstacle = createSprite(350,326,40,40);
  obstacle.velocityX = -10;
  obstacle.addAnimation("obstacle",obstacleImage);
  obstacle.scale = 0.1
  obstacle.lifeTime = 100;
  
  banana = createSprite(200,180,30,20);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.12
  banana.velocityX = -3
  
  invisibleground = createSprite(300,350,900,10);
  invisibleground.visible = false
  
  obstacleGroup = new Group();
   foodGroup = new Group();

  score = 0;
}
  
function draw() {
background ("white");
  monkey.setCollider("circle",0,0,350);
  monkey.debug = true
if (ground.x<0) {
 ground.x = ground.width/2;
 ground.velocityX = -4;
}
  
var banana = Math.round(random(1,100));
console.log(banana);
  
  if (keyDown("space")&& monkey.y >= 200){
  monkey.velocityY = -6;
                
      }

   monkey.velocityY = monkey.velocityY+0.8;  
    monkey.collide(ground);  

  if (foodGroup.isTouching(monkey)){  
   score = score +4;
  foodGroup.destroyEach();
  }
  
  if (obstacleGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0;
monkey.velocityX = 0;

obstacleGroup.setVelocityXEach(0);
foodGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
//foodGroup.setlifetimeEach(-1);
  } 
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
stroke("blue");
textSize(50);
fill("red");
text("Game over",200,180);

    }
spawnObstacles();
  spawnbanana();
  

  
stroke("blue");
textSize(20);
fill("red");
text("Score : "+ score,400,50);
   
stroke("white");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime,50,50);
  
  drawSprites();
}

function spawnObstacles(){
   if (frameCount % 100 === 0){
   obstacle = createSprite(600,326,40,40);
  obstacle.velocityX = -10;
  obstacle.addAnimation("obstacle",obstacleImage);
  obstacle.scale = 0.1
  obstacle.lifeTime = 100;
      obstacleGroup.add(obstacle);
  }}

  function spawnbanana(){
    if (frameCount % 80 === 0){
   banana = createSprite(600,180,30,20);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.12
  banana.velocityX = -8;
     foodGroup.add(banana);
    }}
