var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []


$(".btn").click(function() {

    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    console.log(userClickedPattern)

    playSound(userChosenColor)

    animatePress(userChosenColor)

})

$(document).keypress(function(event) {
    if(event.key === "a") {
        $("#level-title").text("Level 0")
        nextSequence()
        console.log("Game Pattern " + gamePattern)
    }
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed')
    setTimeout(function() {
        $("#" + currentColor).removeClass('pressed')
    },100)
}


function nextSequence() {{
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

}}

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3')
    audio.play()
}




