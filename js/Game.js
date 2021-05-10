class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display()
      an1 = createSprite(displayWidth/2-75,displayHeight/2-20,1,1)
      an1.addAnimation("start",animation)
      an1.scale = 0.44
      drawSprites()
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    car1.addImage(c1)
    car2.addImage(c2)
    car3.addImage(c3)
    car4.addImage(c4) 
    cars = [car1, car2, car3, car4];
  }

  play(){
    an1.destroy()
    form.hide();
    Player.getPlayerInfo();
    player.getRank()
  
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767")
      image(tr,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill('yellow')
          ellipse(x,y+50,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

      

    }
    if (player.distance > 3500){
      gameState = 2
      player.rank += 1
      Player.updateRank(player.rank)
    }

var b2 = createButton("Up")
b2.position(displayWidth/2-100, displayHeight/2+100)
b2.mousePressed(()=>{
  player.distance +=10
  player.update()

})
    if(keyIsDown(UP_ARROW) && player.index !== null ){
      player.distance +=10
      player.update();
      s1.play()
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended !")
    console.log(player.rank)
  }
}
