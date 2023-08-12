var tiempoTrabajo = 25 * 60; //recuerda que está emn segundos
var tiempoDescanso = 5 * 60;
var ciclosTotales = 4; //en el future se querra que sea ajustable
var ciclosCompletados = 0;
var descansosCompletados = 0;
var contadorActivo = false; // sirve para saver si esta la cuenta taras activa o no
var countdown;
var tiempoActual; //variable importante para no joder los valores fijos como trabajo y descanso
var momento = 1; //Encargado de decir si es descanso o trabajo (impar trabajo, par trabajo)
var wasPaused = false;
var countdownElement = document.getElementById("countdown");
document.getElementById("pause").style.display = "none";
//countdownElement.innerHTML='ha entrado';

function startCountdown() {
  //cuando ldas al boton start
  document.getElementById("start").style.display = "none";
  document.getElementById("pause").style.display = "inline";

  if (!contadorActivo) {
    contadorActivo = true;
    if (!wasPaused) {
      // cuando se le da a pausa was pause es true por lo que no reinicia los contadores

      if (momento % 2 == 1) {
        tiempoActual = tiempoTrabajo;
      } else {
        tiempoActual = tiempoDescanso;
      }
    }

    wasPaused = false;
    if (momento % 2 == 1) {
      countdown = setInterval(updateCountdown, 1000);
    } else {
      countdown = setInterval(updateDescanso, 1000);
    }
  }
}

function updateCountdown() {
  //cuenta atras del tiempotrabajo
  var minutos = Math.floor(tiempoActual / 60);
  var segundos = tiempoActual % 60;
  countdownElement.innerHTML = ` ${minutos < 10 ? "0" : ""}${minutos}:${
    segundos < 10 ? "0" : ""
  }${segundos}`;

  if (tiempoActual <= 0) {
    document.getElementById("start").style.display = "inline";
    document.getElementById("pause").style.display = "none";
    momento++;
    pitido();
    contadorActivo = false;
    ciclosCompletados++;
    clearInterval(countdown);
    document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
    countdownElement.innerHTML = "empieza el descanso";
    if (ciclosCompletados >= ciclosTotales) {
      document.getElementById("countdown").innerHTML =
        "¡Reto Pomodoro completado!";
      document.getElementById("ciclosCompletados").innerHTML =
        ciclosCompletados;
      ocultarBotones();
    }
  } else {
    tiempoActual--;
  }
}

function updateDescanso() {
  var minutos = Math.floor(tiempoActual / 60);
  var segundos = tiempoActual % 60;
  countdownElement.innerHTML = ` ${minutos < 10 ? "0" : ""}${minutos}:${
    segundos < 10 ? "0" : ""
  }${segundos}`;

  if (tiempoActual <= 0) {
    momento++;
    descansosCompletados++;
    pitido();
    contadorActivo = false;
    clearInterval(countdown);
    document.getElementById("descansosCompletados").innerHTML =
      descansosCompletados;
    countdownElement.innerHTML = "continuar con el trabajo";
  } else {
    tiempoActual--;
  }
}

function pauseCountdown() {
  //cuando el contador esta a cero y se da a pausa, como esta en 0, si le das a play se lo salta (nota yo del futuro: ni puta idea lo que quise decir aqui)
  document.getElementById("pause").style.display = "none";
  document.getElementById("start").style.display = "inline";
  if (tiempoActual == 0) {
  } else {
    clearInterval(countdown);
    contadorActivo = false;
    wasPaused = true;
  }
}

////la diferencia entre stop y reiniciar es que reiniciar empieza desde el principio pero stop (le voy a cambiar de nombre a algo mas intuitivo) solo reinicia la ronda

function stopCountdown() {
  //es del boton DETENER/patras que soy gilipollas y no se poner nombres
  document.getElementById("start").style.display = "inline";
  document.getElementById("pause").style.display = "none";
  if (wasPaused == true || contadorActivo == true) {
    clearInterval(countdown);
    contadorActivo = false;
    wasPaused = false;
    if (momento % 2 == 1) {
      tiempoActual = tiempoTrabajo;
    } else {
      tiempoActual = tiempoDescanso;
    }
    var minutos = Math.floor(tiempoActual / 60);
    var segundos = tiempoActual % 60;
    countdownElement.innerHTML = `${minutos < 10 ? "0" : ""}${minutos}:${
      segundos < 10 ? "0" : ""
    }${segundos}`;

    document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
  }
}

function resetTimer() {
  document.getElementById("start").style.display = "inline";
  document.getElementById("pause").style.display = "none";
  if (ciclosCompletados >= ciclosTotales) {
    //muestra otra vez los botones cuando se han ocultado
    document.getElementById("start").style.display = "inline";
    document.getElementById("pause").style.display = "inline";
    document.getElementById("stop").style.display = "inline";
    document.getElementById("siguiente").style.display = "inline";
  }
  clearInterval(countdown);
  contadorActivo = false;
  wasPaused = false;
  tiempoActual = 0;
  momento = 1;
  ciclosCompletados = 0;
  countdownElement.innerHTML = "00:00";
  document.getElementById("ciclosCompletados").innerHTML = ciclosCompletados;
  countdownElement.innerHTML = "¿Empezamos?";
}

function pitido() {
  var alertSound = document.getElementById("sonido");
  alertSound.play();
}

function ocultarBotones() {
  // asi evitamos que le den otra vez a play y queda mas curioso
  document.getElementById("start").style.display = "none";
  document.getElementById("pause").style.display = "none";
  document.getElementById("stop").style.display = "none";
  document.getElementById("siguiente").style.display = "none";
}

function saltoSesion() {
  //el bton de SIGUIENTE
  document.getElementById("start").style.display = "inline";
  document.getElementById("pause").style.display = "none";
  if (contadorActivo) {
    clearInterval(countdown);
    contadorActivo = false;
  }
  tiempoActual = 0;

  if (momento % 2 == 1) {
    if (tiempoActual <= 0) {
      momento++;
      contadorActivo = false;
      ciclosCompletados++;
      clearInterval(countdown);
      document.getElementById("ciclosCompletados").innerHTML =
        ciclosCompletados;
      countdownElement.innerHTML = "empieza el descanso";
      if (ciclosCompletados >= ciclosTotales) {
        document.body.style.backgroundColor = "#aa8cc0";
        document.getElementById("countdown").innerHTML =
          "¡Reto Pomodoro completado!";
        document.getElementById("ciclosCompletados").innerHTML =
          ciclosCompletados;
        ocultarBotones();
      }
    }
  } else {
    if (tiempoActual <= 0) {
      momento++;
      contadorActivo = false;
      clearInterval(countdown);
      document.getElementById("ciclosCompletados").innerHTML =
        ciclosCompletados;
      countdownElement.innerHTML = "continuar con el trabajo";
    }
  }
}

function prueba() {
  const seleccion = document.getElementById("musiquita").value;
  const video = document.getElementById("cajamusica");

  switch (seleccion) {
    case "jazz":
      document.getElementById("cajamusica").style.display = "inline";
      video.innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/7l16rt1h2tM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      break;
    case "ambiental":
      document.getElementById("cajamusica").style.display = "inline";
      video.innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/dRatWsgTk5E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      break;
    case "electro":
      document.getElementById("cajamusica").style.display = "inline";
      video.innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/1HN6_KpdJow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      break;
    case "lofihiphop":
      document.getElementById("cajamusica").style.display = "inline";
      video.innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      break;
    case "nada":
      document.getElementById("cajamusica").style.display = "none";
      break;
    default:
      break;
  }
}
