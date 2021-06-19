const SNAKE_SPEED = 5;
const SNAKE_GROW_ELEMENTS = 10;
const PLAYGROUND_SIZE = 25;
var snakesElements = [{ x: 13, y: 13 },];
var foodPosition = { x: 7, y: 5 };
var lastFoodPosition = null;
var portalPosition = [{x :3, y:3},{x:23,y:23}];
let teleport = true;

var movingDirection = {
  x: 0,
  y: -1,
};


var grow_elements_check = 2;
playground = document.getElementById("game_field");
var lastUpdateTime = 0;
var gameover = false;

function Game(CurrentTime) {
  window.requestAnimationFrame(Game);
  const secondsSinceLastUpdate = (CurrentTime - lastUpdateTime) / 1000;

  if (secondsSinceLastUpdate < 1 / SNAKE_SPEED) return;

  lastUpdateTime = CurrentTime;

  if (gameover) {
    if (confirm("you lose, press OK to play again")) {
        gameover = false;
      location.reload();
      return
    }
  }
  //console.log(lastRenderTime);
  if (gameover == false) {
    playground.innerHTML = "";
    
    drawSnake();
    generatefood();
    drawPortal();
    showScore();
    updateSnake();
    
  }
}

function generatefood() {
  var food = document.createElement("div");
  food.classList.add("food");
  food.style.gridColumnStart = foodPosition.x;
  food.style.gridRowStart = foodPosition.y;
  food.style.borderRadius = 15 + "px";
  food.style.zIndex = 1;
  playground.appendChild(food);
}

function drawSnake() {
  // if(gameover == false){
  snakesElements.forEach((element, index) => {
    var snake = document.createElement("div");
    snake.style.gridColumnStart = element.x;
    snake.style.gridRowStart = element.y;
    snake.style.borderRadius = 15 + "px";
    snake.style.zIndex = 4;
    snake.classList.add("snake");
    if (index == 0) {
        
      snake.classList.add("head");
      if(movingDirection.x == 0 && movingDirection.y == -1)
      {
        snake.style.transform = "rotate(0deg)";
      }
      if(movingDirection.x == 0 && movingDirection.y == 1)
      {
        snake.style.transform = "rotate(180deg)";
      }
      if(movingDirection.x == 1 && movingDirection.y == 0)
      {
        snake.style.transform = "rotate(90deg)";
      }
      if(movingDirection.x == -1 && movingDirection.y == 0)
      {
        snake.style.transform = "rotate(270deg)";
      }
    }
    playground.appendChild(snake);
  });
  //}
}


function drawPortal()
{
    portalPosition.forEach((element)=>{
        var portal = document.createElement("div");
    portal.style.gridColumnStart = element.x;
    portal.style.gridRowStart = element.y;
    portal.style.borderRadius = 15 + "px";
    portal.style.zIndex = 2;
    portal.classList.add("portal");
    playground.appendChild(portal);
    })
}

 function updateSnake() {
  if (ifSnakeEatSnake()) {
    gameover = true;
  }
  if (CheckIfEaten()) {
    createNewFood();
    addElementsToSnake();    
  }
  if(ifMeetPortal()) return 

  for (let i = snakesElements.length - 1; i > 0; --i) {
    snakesElements[i] = { ...snakesElements[i - 1] };
  }
  
  snakesElements[0].x += movingDirection.x;
  snakesElements[0].y += movingDirection.y;
  teleport = true;
  ifMeetPortal();
  
  if (
    snakesElements[0].x == 0 ||
    snakesElements[0].x > PLAYGROUND_SIZE  ||
    snakesElements[0].y == 0 ||
    snakesElements[0].y > PLAYGROUND_SIZE 
  ) {
    gameover = true;
  }
}

function CheckIfEaten() {
  if (
    snakesElements[0].x == foodPosition.x &&
    snakesElements[0].y == foodPosition.y
  ) {
    grow_elements_check += SNAKE_GROW_ELEMENTS;
    
    return true;
  }
  return false;
}

function ifSnakeEatSnake() {
  if (snakesElements.length > grow_elements_check) {
    console.log(snakesElements.length);

    for (let i = snakesElements.length - 1; i > 1; --i) {
      if (
        snakesElements[0].x == snakesElements[i].x &&
        snakesElements[0].y == snakesElements[i].y
      ) {
        var eatenSnake = playground.getElementsByClassName("snake");
        console.log(eatenSnake);
        eatenSnake[i].style.backgroundColor = "purple";
        eatenSnake[i].style.zIndex = 8;
        return true;
      }
    }
  }
  grow_elements_check -= SNAKE_GROW_ELEMENTS;
  return false;
}

function addElementsToSnake() {
  for (let i = 0; i < SNAKE_GROW_ELEMENTS; ++i) {
    snakesElements.splice(1, 0, lastFoodPosition);
    console.log(snakesElements);
  }
  return true;
}

function showScore()
{
    let score = document.createElement("div");
    score.id = "score";
    score.textContent  = `score : ${snakesElements.length - 1}` ; //+ snakesElements.length - 1;
    playground.appendChild(score);
}


function createNewFood()
{
    

do{
    
    lastFoodPosition = {x: foodPosition.x , y: foodPosition.y};
    foodPosition.x = Math.floor(Math.random() * (PLAYGROUND_SIZE) + 1 );
    foodPosition.y = Math.floor(Math.random() * (PLAYGROUND_SIZE) + 1 );
}while(onsnake(foodPosition));

}
function onsnake(object)
{
if(snakesElements.some((element)=>{
    if(element.x  ==  object.x && element.y ==  object.y)
    {    debugger
        return true;
    }
})) return true;
return false;
}


function ifMeetPortal(){
  if(teleport){
  if (
    snakesElements[0].x == portalPosition[0].x && snakesElements[0].y == portalPosition[0].y
  ){
    snakesElements[0].x = portalPosition[1].x;
    snakesElements[0].y = portalPosition[1].y;
    teleport = false;
    return true;
  } 
  if (
    snakesElements[0].x == portalPosition[1].x && snakesElements[0].y == portalPosition[1].y
  ){
    snakesElements[0].x = portalPosition[0].x;
    snakesElements[0].y = portalPosition[0].y;
    teleport = false;
    return true;
  } 
  return false;
}
}

window.requestAnimationFrame(Game);


