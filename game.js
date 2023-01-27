var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userChosenPattern = []
var level = 0
var started = false

function nextSequence() {
    level++
    userChosenPattern = []
    $("#level-title").text("Level "+ level)
    var random = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[random]
    gamePattern.push(randomChosenColor)
    makeSound(randomChosenColor)
    $('#' + randomChosenColor ).fadeIn(100).fadeOut(100).fadeIn(100)

}

function makeSound(color) {
    var audio = new Audio('./sounds/'+ color + '.mp3')
    audio.play()
}

function animateButton(color) {
    $('#' + color ).addClass('pressed')

    setTimeout(function() {
        $('#' + color ).removeClass('pressed')
    }, 100)
}

function answerChecker(currentLevel) {
    if(gamePattern[currentLevel] === userChosenPattern[currentLevel]) {

        if(gamePattern.length === userChosenPattern.length) {

            if(currentLevel === 4) {
                var scareAudio = new Audio('./sounds/scream2.mp3')
                // $('#scare-image').css("display", "block")
                $('#scare-image').fadeToggle()
                scareAudio.play()

                setTimeout(function() {
                    $('#scare-image').fadeToggle()
                }, 2000)

                setTimeout(function() {
                    nextSequence()
                }, 3000)

            } else {
                setTimeout(function() {
                    nextSequence()
                }, 1000)
            }
            
            
        }
    } else {

        var audio = new Audio('./sounds/wrong.mp3')
        audio.play()

        $("h1").text('Game Over, Press Any Key to Restart')

        $("body").addClass('game-over')

        setTimeout(function() {
            $("body").removeClass('game-over')
        }, 200)
        
        reset()
    }
}

function reset() {
    gamePattern = []
    userChosenPattern = []
    level = 0
    started = false
}



$('.btn').click(function() {
    var chosenColor = $(this).attr("id")
    makeSound(chosenColor)
    animateButton(chosenColor)

    userChosenPattern.push(chosenColor)

    answerChecker(userChosenPattern.length - 1)

})

$(document).keypress(function(event) {
    if(!started) {
        nextSequence()
        started = true
    }
})

$(document).click(function(event) {

    if(event.target == document.body) {
        if(!started) {
            nextSequence()
            started = true
        }
    }

})