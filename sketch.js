var bird,obstacle,birdImg,bgImg,obsImg,obs1Img,obstacle1,ground,groundImg,obsGroup,gameOverImg,gameOver,restartImg,restart,score,obsGroup1
var PLAY=1
var END=0
var START=2
var gameState=START
var score=0

function preload(){
  birdImg= loadImage("bird.png")
  bgImg= loadImage("bg.png")
  obsImg= loadImage("obs2.png")
  obs1Img= loadImage("obs1.png")
  groundImg= loadImage("ground.png")
  gameOverImg= loadImage("gameOver.png")
  restartImg= loadImage("restart.jpg")
}

function setup() {
  createCanvas(1200,600);
  bird= createSprite(100, 400, 50, 50);
  bird.addImage(birdImg)
  bird.scale=0.2

  bird.setCollider("rectangle",0,0,300, bird.height/2)

  ground= createSprite(width/2,height+70,width,20)
  ground.addImage(groundImg)
  ground.scale=0.5
  ground.velocityX=-(3+score/10)
  console.log(ground.velocityX)

  restart= createSprite(width/2,height/2+100)
  restart.addImage(restartImg)
  restart.visible=false

  gameOver= createSprite(width/2,height/2-100)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.3
  gameOver.visible=false
  
  obsGroup= new Group()
  obsGroup1= new Group()
}

function draw() {
  background(bgImg);
  drawSprites();
   if(gameState===PLAY){
    if(frameCount%100===0){
      spawnobstacle()
      }  
    
      if(frameCount%100===0){
        spawnobstacle1()
      }
    
      if(ground.x<500){
        ground.x=width/2
      }
    
      if(keyDown("space")){
        bird.velocityY=-3
      }
    
      bird.velocityY=bird.velocityY+0.3
    
      for(var i=0;i<obsGroup.length;i++){
        //console.log("bird"+bird.x)
        //console.log("obstacle"+obsGroup[i].x)
      if(obsGroup[i].x>98&&obsGroup[i].x<102){
        score=score+1
      }
      }
      textSize(20)
      fill("orange")
      text("SCORE "+score,width/2,height/2)
      if(bird.isTouching(obsGroup)||bird.isTouching(ground)||bird.isTouching(obsGroup1)){
        gameState=END
      }
  }
  else if(gameState===END){
    bird.y=400
    bird.velocityY=0
    ground.velocityX=0
    obsGroup.setVelocityXEach(0)
    obsGroup.setLifetimeEach(-1)
    obsGroup1.setVelocityXEach(0)
    obsGroup1.setLifetimeEach(-1)
    gameOver.visible=true
    restart.visible=true
    textSize(20)
    fill("orange")
    text("SCORE "+score,width/2-50,height/2+40)
    if(mousePressedOver(restart)){
      reset()
    }
    }
    if(keyWentDown("space")){
      gameState=PLAY
    }
    drawSprites();
    if(gameState===START){
      fill("black")
      textSize(20)
      text("PRESS SPACE TO START",width/2-100,height/2)
      if(ground.x<500){
        ground.x=width/2
      }
    }
    
    
  }
  
  

function spawnobstacle(){
  obstacle= createSprite(width,random(50,150))
  obstacle.addImage(obsImg)
  obstacle.velocityX=-(3+score/10)
  obstacle.lifetime=420
  obsGroup.add(obstacle)
  gameOver.depth=obstacle.depth
  gameOver.depth=gameOver.depth+1
  
}

function spawnobstacle1(){
  obstacle1= createSprite(width,random(height-80,height))
  obstacle1.addImage(obs1Img)
  obstacle1.velocityX=-(3+score/10)
  obstacle1.lifetime=420
  obsGroup1.add(obstacle1)
 
}

function reset(){
  gameState=START
  restart.visible=false
  gameOver.visible=false
  obsGroup1.destroyEach()
  obsGroup.destroyEach()
  ground.velocityX=-3
  score=0
}