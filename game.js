let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"]
let level = 1;


function nextSequence() {

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $('#level-title').text('Level ' + level);
    level++;
    
}

$('.btn').on('touchstart', function (e) {
    e.preventDefault ();

    let userChosenColour  = this.id;
    userClickedPattern.push(userChosenColour);  

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern);

});

function playSound(name) {
    let makeSound = new Audio("sounds/" + name + ".mp3");
    makeSound.play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed');

    setTimeout(() => {
        $('.' + currentColor).removeClass('pressed');
    }, 150);
}

$(document).on('keydown', (event) => {
    nextSequence(event.key);
    $('#try-again').addClass('invisible');
})

function checkAnswer(currentLevel) {
    // let currentIndex = userClickedPattern[userClickedPattern.length - 1];

    if (currentLevel[currentLevel.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        console.log('correct');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }

    } else {
        let wrongPick = new Audio('sounds/wrong.mp3');
        wrongPick.play();

        $('body').addClass('game-over');
        $('#try-again').removeClass('invisible')
        startOver();
        
        

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
    } 
}

function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    $('#level-title').text('Game Over!');

}

$('.start').on('click touchstart', function () {
    nextSequence();
});


