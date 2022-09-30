//function to create game sequence
function nextSequence(){
   level++;
   $("#level-title").text("Level " + level);
   // random number between 0 and 3 to store all 4 colors
   var randomNumber = Math.floor(Math.random() * 4);
   randomChosenColour = buttonColours[randomNumber];
   // add the random color to the game pattern
   gamePattern.push(randomChosenColour);
   // select the button with the same id as the random color
   animatePress(randomChosenColour);
   playSound(randomChosenColour);
}

//function to animate the button - add and remove class (timeout of 100ms)
function animatePress(currentColour){
   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
   }, 100); 
}

//function to play sound
function playSound(name){
   var audio  = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

// detect button clicked:
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
   playSound(userChosenColour);
   animatePress(userChosenColour);
});


// function to check if the user clicked the right button
function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
            userClickedPattern = [];
            nextSequence();
         }, 1000);
      }
   } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
   }
}

//function to start the game
function startGame(){
   if (level === 0){
      nextSequence();
      if (userClickedPattern.length === gamePattern.length){
         checkAnswer(level);
      }
   }
}

//function to start over
function startOver(){
   level = 0;
   gamePattern = [];
   userClickedPattern = [];
   started = false;
}


// Defined array to store all 4 colors
buttonColours = ["red", "blue", "green", "yellow"];

// array to store the game sequence:
gamePattern = [];

//empty array to store the user sequence:
userClickedPattern = [];

var level = 0;

//Start the game if any key was pressed:
$(document).keypress(startGame); 
// or if click anywhere on the screen:
$(document).click(startGame);



