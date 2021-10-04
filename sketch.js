//declaring variables
var bg, backgroundImg;
var player,playerImg;
var edge;
var stone, stone_img,stonegroup;
var diamond_img, diamondgroup, diamond;
var diamondScore=0;
var spike, spike_img, spikegroup;
var game_state="play";
var reset, resetimg;
var ground;

//loading our images
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  playerImg = loadImage("images/iron.png");
  stone_img=loadImage("images/stone.png");
  diamond_img=loadImage("images/diamond.png");
  spike_img=loadImage("images/spikes.png");
  resetimg=loadImage("images/restart.png")
}
 
//creating our Sprites and groups
function setup() {
  createCanvas(1000, 600);
  edge=createEdgeSprites();
  bg = createSprite(580,300);
  bg.velocityY = 3;
  player = createSprite(200,500,90,30)
  reset = createSprite(500,300)
  reset.addImage(resetimg);
  reset.visible=false;
  ground= createSprite(200,650, 1000, 15);
  ground.visible=false;
  bg.addImage(backgroundImg);
  player.addImage(playerImg);
  player.scale=0.2;
  stonegroup = new Group();
  diamondgroup = new Group();
  spikegroup = new Group();
 
}


function draw() {
  
 if(game_state==="play"){
  //stopping Iron Man from disappearing from the top, right, and left edges.
  player.bounceOff(edge[0]);
  player.bounceOff(edge[1]);
  player.bounceOff(edge[2]);
 
  //resetting the bg
  if(bg.y>370){
    bg.y=bg.height/3.5;
  } 

  //controls
  if(keyDown("up")){
    player.y=player.y-12
  }
  if(keyDown("right")){
    player.x=player.x+3
  }
  if(keyDown("left")){
    player.x=player.x-3
  }
  player.velocityY=player.velocityY+0.05;
 
 
    
  // calling functions
  generateStone();
  generateDiamond();
  generateSpike();

  // For when Iron Man touches a stone
  for(i=0;i<(stonegroup).length;i++){
    var temp=stonegroup.get(i);
    if(temp.isTouching(player)){
        player.collide(temp); 
    }
    
  }


  // For when Iron Man touches a diamond
  for(i=0;i<(diamondgroup).length;i++){
    var temp2=diamondgroup.get(i);
   if(player.isTouching(temp2)){
     diamondScore++;  
     temp2.destroy();
     temp2=null;
   }
  }

  // For when Iron Man touches a spike
  for(i=0;i<(spikegroup).length;i++){
     var temp3=spikegroup.get(i);
     if(player.isTouching(temp3)){
       diamondScore=diamondScore-5;
        temp3.destroy();
       temp3=null;
  }}
  
  if(diamondScore<-9){ //if Iron-man's points are low
    game_state="end";
  }
  if(player.y>725){  //if Iron-man falls off the map
    game_state="end";
  }

  
  }  //end of start state if statement

  else if(game_state==="end"){ //stopping everything when the game is over
    bg.velocityY=0;
    player.velocityX=0;
    player.velocityY=0;
    stonegroup.setVelocityXEach(0);
    diamondgroup.setVelocityXEach(0);
    spikegroup.setVelocityXEach(0);
    stonegroup.setLifetimeEach(-1);
    diamondgroup.setLifetimeEach(-1);
    spikegroup.setLifetimeEach(-1);
    player.scale=0.2;
    stone.velocityY=0;
    diamond.velocity=0;
    spike.velocity=0;
    reset.visible=true;
    if(mousePressedOver(reset)){
      restartGame();
      
      
  }

  

}

 //drawing the sprites and displaying the score.
  drawSprites();
  textSize(20);
  fill("aqua");
  text("Diamonds Collected:"+diamondScore, 700,60);
   
}

 

//Stone function
function generateStone(){
   
    if(frameCount%70==0){

    
    stone=createSprite(random(0,600), 0,40,10);
    stone.addImage(stone_img);
    stone.scale=0.7;
    stone.velocityY=2;

    stonegroup.add(stone);


    }

}

//Diamond function
function generateDiamond(){

  if(frameCount%80==0){

    diamond=createSprite(random(0,600),0,10,10);
    diamond.addImage(diamond_img);
    diamond.scale=0.5;
    diamond.velocityY=2;
    diamond.lifetime=1200;

    diamondgroup.add(diamond);
  }

}

//Spike function
function generateSpike(){

  if(frameCount%90==0){
 
    spike=createSprite(random(0,600),0,15,15);
    spike.addImage(spike_img);
    spike.scale=0.5;
    spike.velocityY=2.2;
    spike.lifetime=1201;
 
 
 
   spikegroup.add(spike);
 
  }
 
 }


 function restartGame(){
   game_state="play";
   spikegroup.destroyEach();
   diamondgroup.destroyEach();
   stonegroup.destroyEach();
   reset.visible="false";
   diamondScore=0;


 }