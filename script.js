var countdown;
var tiempoRestante = 60; // Tiempo en segundos
var contadorActivo = false;

function playCountdown() {
  if (!contadorActivo) {
    clearInterval(countdown);
    contadorActivo = true;
    countdown = setInterval(updateCountdown, 1000);
  }
}

function updateCountdown() {
  var countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = "Segundos restantes: " + tiempoRestante;
  tiempoRestante--;

  if (tiempoRestante < 0) {
    clearInterval(countdown);
    countdownElement.innerHTML = "¡Tiempo terminado!";
    saludos();
    contadorActivo = false;
  }
}

function pauseCountdown() {
  clearInterval(countdown);
  contadorActivo = false;
}

function stopCountdown() {
  clearInterval(countdown);
  tiempoRestante = 60;
  var countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = "";
  contadorActivo = false;
}
