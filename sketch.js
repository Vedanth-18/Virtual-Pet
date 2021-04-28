var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
//create feed and lastFed variable here
var feed, lastFed;
var feedingButton;
var r;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock, showError);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedingButton = createButton("Feed The Dog");
  feedingButton.position(700, 95);
  feedingButton.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();
  push();
  textStyle(BOLD);
  fill("BLACK");
  text("FOOD STOCK: " + foodS, 20, 30);
  pop();
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
}


function feedDog(data){
  dog.addImage(happyDog);
  foodS = foodS-1;
  console.log(foodS);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
 function showError(){
   textStyle(BOLD);
   textSize(40);
   text("Error occured while processing⚠⚠⚠", 500, 200);
 }