var dog,happyDog,database,foodS,foodStock;
var notsmilingdog,smilingdog;

function preload(){

  notsmilingdog = loadImage("Dog.png");
  smilingdog = loadImage("happydog.png");

}

function setup() {
  createCanvas(500,500);
  
  dog = createSprite(250,250);
  dog.addImage(notsmilingdog);
  dog.scale = 0.4;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(smilingdog);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(notsmilingdog);
  }

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();
  
  textSize(20);
  fill("white");
  text("Note : Press UP_ARROW Key to Feed Drago Milk!",5,20);
  text("Food Remaining : "+foodS,150,70);

  if(foodS===undefined){
    text("Loading . . . ",200,250);
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

