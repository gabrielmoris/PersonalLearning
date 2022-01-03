var buttonColours = ["red", "blue", "green", "yellow"];

// Array con el patrón de colores
var gamePattern = [];

// Array con el patrón de botones pulsados
var userClickedPattern = [];

// Variables para empezar el juego
var started = false;
var level = 0;

// Detector de tecla pulsada

$(document).keypress(function() {
    if (!started) {
        // Cambia el texto del H1
        $("#level-title").text("Level " + level);
        // Corre la función de patrones de colores aleatorios
        nextSequence();
        // cambio el status de la variable started
        started = true;
    }
});


// Respuesta al click del botón
$(".btn").click(function() {
    // Guardo en una variable el id del boton pulsado
    var userChosenColour = $(this).attr("id");
    // Lo meto en un Array para guardar el patrón
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Esto es apra comparar los clicks del usuario y los patrones del ordenador
    checkAnswer(userClickedPattern.length - 1);
});           



// Esta función chequea que coinciden los patrones y decide si estça bien o mal
function checkAnswer (currentLevel) {
    // Compruebo si coinciden mis clicks con los aptrones aleatoerios
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
            }
    } else {
        // qué pasa cuando fallo. Primero sonido
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        // Cambio el tema del body
         $("body").addClass("game-over");
         setTimeout(function () {
            $("body").removeClass("game-over");
            }, 200);
        // Cambio el H1
        $("#level-title").text("Game Over, Press Any Key to Restart. Level: " + level);
        // Llamo a la funciñon de volver a empezar
        startOver()
    }

}

// Función principal para mover el juego
function nextSequence() {
    // reseteo el patrón de clicks y subo nivel
    userClickedPattern = [];
    level++
    // Título del h1 después de empezar el juego
    $("#level-title").text("Level " + level);
    // Aquí escojo un color aleatorio
    var randomNumber = Math.floor((Math.random() * 3)) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    // Meto el color en el gamePattern
    gamePattern.push(randomChosenColour);
    // Añado la animación de flash
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // Añado sonido desde la función correspondiente
    playSound(randomChosenColour);
}

// Función para llamar al sonido
function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    // I add a class to the current color
    $("#" + currentColor).addClass("pressed");
    // I make an animation of 100 miliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

// Esta funciçon es llamada cuando fallas para volver a empezar
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}