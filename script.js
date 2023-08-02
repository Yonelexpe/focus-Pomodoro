var tiempoTrabajo = 1;//recuerda que está emn segundos
var tiempoDescanso = 1;
var ciclosTotales = 4; //en el future se querra que sea ajustable
var ciclosCompletados = 0;
var contadorActivo = false;
var countdown;
var tiempoActual;//variable importante para no joder los valores fijos como trabajo y descanso
var momento = 1; 
var wasPaused= false;
var countdownElement = document.getElementById("countdown");
//countdownElement.innerHTML='ha entrado';


function startCountdown() {
  if (!contadorActivo) {
    contadorActivo = true;
    if (!wasPaused) {// cuando se le da a pausa was pause es true por lo que no reinicia los contadores

    if (momento%2 == 1) {
      tiempoActual = tiempoTrabajo;
    }else{
      tiempoActual = tiempoDescanso;
    }
     }

     wasPaused = false;
     if (momento%2 == 1) {
      countdown = setInterval(updateCountdown, 1000);
    }else{
      countdown = setInterval(updateDescanso, 1000);    
    }
  }
}

function updateCountdown() {
  
  var minutos = Math.floor(tiempoActual / 60);
  var segundos = tiempoActual % 60;
  countdownElement.innerHTML = `Tiempo restante: ${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

  if (tiempoActual <= 0) {
    momento++;
    pitido();
    contadorActivo = false;
    ciclosCompletados++;
    clearInterval(countdown);
    document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
    countdownElement.innerHTML ='empieza el descanso';
    if (ciclosCompletados >= ciclosTotales) {
      
      document.body.style.backgroundColor = "#aa8cc0";
      document.getElementById("countdown").innerHTML = "¡Reto Pomodoro completado!";
      document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
      ocultarBotones();
    }
  } else {
    tiempoActual--;
  }
  
}

function updateDescanso() {
  var minutos = Math.floor(tiempoActual / 60);
  var segundos = tiempoActual % 60;
  countdownElement.innerHTML = `Tiempo restante: ${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

  if (tiempoActual <=0 ) {
    momento++;
    pitido();
    contadorActivo = false;
    clearInterval(countdown);
    document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
    countdownElement.innerHTML ='continuar con el trabajo';
  } else {
    tiempoActual--;
  }
}

function pauseCountdown() { //cuando el contador esta a cero y se da a pausa, como esta en 0, si le das a play se lo salta
if (tiempoActual == 0) {
  
} else {
  clearInterval(countdown);
  contadorActivo = false;
  wasPaused = true;
}
  
}



////la diferencia entre stop y reiniciar es que reiniciar empieza desde el principio pero stop (le voy a cambiar de nombre a algo mas intuitivo) solo reinicia la ronda

function stopCountdown() {
  clearInterval(countdown);
  contadorActivo = false;
  wasPaused = false;
  if (momento%2 == 1) {
    tiempoActual = tiempoTrabajo;
  }else{
    tiempoActual = tiempoDescanso;
  }
  var minutos = Math.floor(tiempoActual / 60);
  var segundos = tiempoActual % 60;
  countdownElement.innerHTML = `Tiempo restante: ${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

  document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
}

function resetTimer() {
  if (ciclosCompletados >= ciclosTotales) { //muestra otra vez los botones cuando se han ocultado 
    document.getElementById("start").style.display = "inline";
    document.getElementById("pause").style.display = "inline";
    document.getElementById("stop").style.display = "inline";
  }
  clearInterval(countdown);
  contadorActivo = false;
  wasPaused = false;
  tiempoActual = 0; 
  momento = 1;
  ciclosCompletados = 0;
  countdownElement.innerHTML = "Tiempo restante: 00:00";
  document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
  document.body.style.backgroundColor = "#ffffff"; // Cambiar al color deseado, lo cambiare a lavanda
  
}

function pitido() {
  var alertSound = document.getElementById("sonido");
  alertSound.play();
}

function ocultarBotones() { // asi evitamos que le den otra vez a play y queda mas curioso
  document.getElementById("start").style.display = "none";
  document.getElementById("pause").style.display = "none";
  document.getElementById("stop").style.display = "none";
}