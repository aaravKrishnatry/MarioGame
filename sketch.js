var back, backs, mario;
var ground, cloudIMG;
var gameState="play";
var obsGroup,cloudsGroup;
var brickGroup;
var score=0;
var high=0
var check, jump, die;
function preload()

{
  back=loadImage("3739446.jpg") ; 
  marioIMG=loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  groundIMG=loadImage("ground2.png");
  cloudIMG=loadImage("cloud.png");
  obs1=loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png");
  gameOverIMG=loadImage("gameOver.png");
  restartIMG=loadImage("restart.png");
  marioColl=loadAnimation("collided.png");
  brickIMG=loadImage("question.png");
  check=loadSound("checkPoint.mp3");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
}



function setup()

{
  createCanvas(600, 400);
  backs=createSprite(300,200,600,400);
  backs.addImage("back", back);
  backs.scale=0.3;
  mario=createSprite(50, 335, 10, 10);
  mario.addAnimation("mario", marioIMG);
  mario.addAnimation("collided", marioColl);
  mario.scale=1.3;
  //mario.debug=true;
  mario.setCollider("rectangle",0,0,30,30);
  ground=createSprite(300, 400, 600, 10);
  ground.addImage("ground", groundIMG);
  obsGroup=new Group();
  cloudsGroup=new Group();
  brickGroup=new Group();
  gameOver=createSprite(300,180);
  gameOver.addImage("gameOver", gameOverIMG);
  restart=createSprite(300,240);
  restart.addImage("restart", restartIMG);
  gameOver.visible=false;
  restart.visible=false;
}

function draw() {
  background("white");
 
  if(gameState==="play")
  {
    if(keyDown("space")&&mario.y>300){
      mario.velocityY=-15;
      jump.play();
    }
    mario.velocityY=mario.velocityY+0.8;
    ground.velocityX=-4;
    //console.log(mario.y)
    if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
    spawnObstalces();
    spawnClouds();
    spawnBricks();
if(mario.isTouching(brickGroup)){
  for(var i=0;i<brickGroup.length;i++)
    {
      if(mario.isTouching(brickGroup[i]))
        {
          brickGroup[i].destroy();
          score++;
          check.play();
        }
    }
}
    if(mario.isTouching(obsGroup)){
      die.play();
      gameState="end";
       
    }
  }
  else if(gameState==="end")
  {
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);
        brickGroup.setVelocityXEach(0);
    brickGroup.setLifetimeEach(-1);
 cloudsGroup.setLifetimeEach(-1);
    obsGroup.setLifetimeEach(-1);
      mario.changeAnimation("collided", marioColl);
    mario.velocityY=0;
    if (mousePressedOver(restart)){
      reset();  
}
    

  }
  
  mario.collide(ground);
  drawSprites() ;
  textSize(25);
 text("Score : "+score,450,50);
  text("High Score: "+high,50,50);
}

function reset()
{
  gameState="play";
  obsGroup.destroyEach();
  cloudsGroup.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  mario.changeAnimation("mario", marioIMG);
   brickGroup.destroyEach();
  if (score>high){
    high=score;
  }
  score=0;
  
}

function spawnClouds()
{
  if(frameCount%100===0)
  {
    var clouds=createSprite(600, 100, 10, 10);
    clouds.addImage(cloudIMG);
    clouds.y=Math.round(random (70, 200));
    clouds.velocityX=-3;
    cloudsGroup.add(clouds);
    clouds.lifetime=300;
    mario.depth=clouds.depth+1;
  }
}

function spawnObstalces()
{
  if(frameCount%100===0)
  {
    var obstacle=createSprite(600, 340, 10, 10);
    obstacle.addAnimation("obstacle", obs1);
    obstacle.velocityX=-2.5;
    obsGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,30,40);
    obstacle.lifetime=300;
    //obstacle.debug=true;
  }
}
function spawnBricks()
{
  if(frameCount%120===0)
  {
    var brick=createSprite(600, 340, 10, 10);
    brick.addAnimation("brick", brickIMG);
    brick.y=Math.round(random(180, 230));
    brick.velocityX=-4;
    brickGroup.add(brick);
    brick.lifetime=300;
    brick.scale=0.2;
    
  }
}
