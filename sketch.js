// defining sprites, dimensions, groups, state, animation
var grid = 50;
var width = 1366;
var carGroup1, logGroup1;
var player;
var grassHeight = 100;
var gameState = "play";
var carAnimation1, carAnimation2, logAnimation, playerAnimation, cityAnimation;
var school;
var city;
var gameState = "play";
var gameStae = "win";

function preload(){
  carAnimation1 = loadAnimation ("images/car1.png"); 
  carAnimation2 = loadAnimation ("images/car2.png");
  playerAnimation = loadAnimation ("images/Player-03.png");
  logAnimation = loadAnimation ("images/log2.png");
  cityAnimation = loadAnimation ("images/city1.png");
}

function setup() {

  // creating canavas 
  createCanvas(1366,700);

  // defining groups
  carGroup1 = new Group();
  logGroup1 = new Group();

  // creating city
  city = createSprite (width/2,-1500);  
  city.addAnimation ("city",cityAnimation);

  // making grasses
  for(var i = 0; i < 6; i++){
   var bottomGrass1 = createSprite(683,height-50-(i*400),width,grassHeight);
   if(i % 2 === 0) {

   // adding road
   var road = createSprite(683,height-150-(i*400)-grassHeight,width,300);
   road.shapeColor = "black";
   }
   bottomGrass1.shapeColor = "green";
  }
  
  // to create rows of car
  for(var i = 0; i < 40; i++){
    cars = new Car(2);
    carGroup1.add(cars.spt);
  }

  // to create rows of Logs
  for(var i = 0; i < 40; i++){
    log = new Log(-3);
    logGroup1.add(log.spt);  
  }

  // creating player class
  player = new Player (width/2,height-25);

}

function draw() {
  
// giving background color
background("skyblue");

// to move the canavas with the player
translate(0,-player.spt.y+height-150);

// making logs reappear
for(i = 1; i < logGroup1.length; i++){
  if(logGroup1[i].x < 0){
    logGroup1[i].x = width;
  }
}

// making cars reappear
 for(i = 1; i < carGroup1.length; i++){

  if(carGroup1[i].x < 0){
    carGroup1[i].x = width;
  }
  if(carGroup1[i].x > width){
    carGroup1[i].x = 0;
}
}

// resetting the position of player afer getting coliided by car
if (carGroup1.isTouching(player.spt)){
  player.spt.x = width/2;
  player.spt.y = height-75;
}

// resetting the position of player after getting over the river
if (logGroup1.isTouching(player.spt)){
player.spt.x = player.spt.x-3;
}
else if ((player.spt.y > height-1550 && player.spt.y < height-1300) ||
(player.spt.y < height-500 && player.spt.y > height-850) ||
(player.spt.y > height) ||
(player.spt.x < 0) ||
(player.spt.x > width)){
player.spt.x = width/2;
player.spt.y = height-75;
}

// changing state to win
if (city.isTouching(player.spt)){
  gameState = "win";
}

// properties of win state 
if (gameState === "win"){
  stroke ("Green");
  fill ("Green");
  textSize (40); 
  text ("Congratulations! You made it!", width/2-250, -1700);
  carGroup1.destroyEach();
  logGroup1.destroyEach();
}
// displaying sprites
drawSprites();

}

// keyPressed function is not required to be called, its called by default
function keyPressed (){ 

  if (keyCode == UP_ARROW){
    player.move(0,-2);
  }

  else if (keyCode == DOWN_ARROW){
    player.move(0,2);
  }

  else if (keyCode == LEFT_ARROW){
    player.move(-2,0);
  }

  else if (keyCode == RIGHT_ARROW){
    player.move(2,0);
  }
}