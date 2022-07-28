
var backgroundImg;
var bg;
var rockImg;
var rock, rocks;
var ammoImg;
var healthImg;
var boosters, boostersGrp;
var player;
var playerImg;
var ig;
var score=0;

function preload() 
{
  backgroundImg = loadImage("assets/background.png");
  rockImg = loadImage("assets/rocks.png");
  ammoImg = loadImage("assets/ammo.png");
  healthImg = loadImage("assets/health.png");
  playerImg = loadAnimation("assets/S1.png","assets/S2.png",
  "assets/S3.png","assets/S4.png","assets/S5.png","assets/S6.png",
  "assets/S7.png","assets/S8.png");
}

function setup() 
{
  canvas = createCanvas(1450,700);
  bg = createSprite(400,400,200,50);
  bg.addImage(backgroundImg);
  bg.scale = 1.2;

  player = createSprite(150,550,40,40);
  player.addAnimation("running",playerImg);
  player.scale = 3;

  ig = createSprite(150,700,300,10);
  ig.visible = false;

  boostersGrp = createGroup();


}

function draw() 
{
  background("white");
  bg.velocityX = -4;
  if (bg.x < 430)
  {
    bg.x = bg.width/2;
  }

  if (keyDown("space"))
  {
    player.velocityY-=10;
  }

  player.velocityY = player.velocityY + 0.8;
  player.collide(ig);

  if (boostersGrp.isTouching(player))
  {
    boostersGrp.destroyEach();
    score=score+5;
  }

  spawnRocks();
  spawnBoosters();

  drawSprites();

  text("Boosters Collected: "+score,1000,200);

}

function spawnRocks()
{
  if (frameCount % 300==0)
  {

  rock = createSprite(1500,650,40,15);
  rock.velocityX = -4;
  rock.addImage(rockImg);
  rock.scale = 0.3;
  rock.lifetime = 500;
  }

}

function spawnBoosters()
{

  if (frameCount % 523==0)
  {
    boosters = createSprite(1500, 500, 30, 30);
    boosters.y = Math.round(random(300,400));
    boosters.velocityX = -4;
    var number = Math.round(random(1,2));

    boostersGrp.add(boosters);

    if (number==1)
    {
      boosters.addImage(ammoImg);
    }
    else if (number==2)
    {
      boosters.addImage(healthImg);
    }
    boosters.scale = 0.3;
    boosters.lifetime = 500;
  }
}