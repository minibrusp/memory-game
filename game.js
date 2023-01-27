var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false



$(".btn").click(function() {

    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)

    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length - 1)

})


$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+ level)
        nextSequence()
        started = true
    }
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed')
    setTimeout(function() {
        $("#" + currentColor).removeClass('pressed')
    },100)
}


function nextSequence() {{
    level++
    userClickedPattern = []
    $("#level-title").text("Level "+ level)
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

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    } else {
        var audio = new Audio('./sounds/wrong.mp3')
        audio.play()
        
        $("h1").text('Game Over, Press Any Key to Restart')
        $("body").addClass('game-over')

        setTimeout(function() {
            $("body").removeClass('game-over')
        }, 200)

        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}




