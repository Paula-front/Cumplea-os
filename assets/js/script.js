// ===============================
// ELEMENTOS PRINCIPALES
// ===============================

const intro = document.getElementById("intro");
const contenido = document.getElementById("contenido");
const btnStart = document.getElementById("btnStart");
const musicaFiesta = document.getElementById("musicaFiesta");

// ===============================
// PLAYLIST REAL
// ===============================

const canciones = [
  {
  nombre: "Haddaway - What is Love",
  archivo: "assets/music/HaddawayWhatisLove.mp3"
},
  {
    nombre: "Alphaville - Big In Japan",
    archivo: "assets/music/AlphavilleBigInJapan.mp3"
  },
  {
    nombre: "La Bouche - Be My Lover",
    archivo: "assets/music/BeMyLover.mp3"
  },
  {
    nombre: "Shaggy - Boombastic",
    archivo: "assets/music/Boombastic.mp3"
  },
  {
    nombre: "Depeche Mode",
    archivo: "assets/music/DepecheMode.mp3"
  },
  {
    nombre: "Eurythmics - Sweet Dreams",
    archivo: "assets/music/EurythmicsSweetDreams.mp3"
  },
  {
    nombre: "Fugees - Killing Me Softly",
    archivo: "assets/music/FugeesKillingMeSoftlyWith.mp3"
  },
  {
    nombre: "Coolio - Gangsta's Paradise",
    archivo: "assets/music/GangstaParadise.mp3"
  },
  {
    nombre: "Cyndi Lauper - Girls Just Want To Have Fun",
    archivo: "assets/music/GirlsJustWanttoHaveFun.mp3"
  },
 
  {
    nombre: "Blondie - Heart Of Glass",
    archivo: "assets/music/HeartOfGlass.mp3"
  },
  {
    nombre: "Kylie Minogue",
    archivo: "assets/music/kylie.mp3"
  },
  {
    nombre: "Madonna - La Isla Bonita",
    archivo: "assets/music/MadonnaLaIslaBonita.mp3"
  },
  {
    nombre: "Vengaboys - We Like To Party",
    archivo: "assets/music/WeliketoParty.mp3"
  }
  
  
];

let cancionActual = 0;

// ===============================
// ELEMENTOS DEL REPRODUCTOR
// ===============================

const musicPlayer = document.getElementById("musicPlayer");
const nombreCancion = document.getElementById("nombreCancion");
const btnPrev = document.getElementById("btnPrev");
const btnPlayPause = document.getElementById("btnPlayPause");
const btnNext = document.getElementById("btnNext");
const btnPlaylist = document.getElementById("btnPlaylist");
const listaCanciones = document.getElementById("listaCanciones");

// ===============================
// FUNCIONES DE MÚSICA
// ===============================

function cargarCancion(indice) {
  musicaFiesta.src = canciones[indice].archivo;
  nombreCancion.innerText = canciones[indice].nombre;
  actualizarPlaylist();
}

function reproducirCancion() {
  musicaFiesta.play();
  btnPlayPause.innerText = "⏸";
}

function pausarCancion() {
  musicaFiesta.pause();
  btnPlayPause.innerText = "▶";
}

function siguienteCancion() {
  cancionActual++;

  if (cancionActual >= canciones.length) {
    cancionActual = 0;
  }

  cargarCancion(cancionActual);
  reproducirCancion();
}

function cancionAnterior() {
  cancionActual--;

  if (cancionActual < 0) {
    cancionActual = canciones.length - 1;
  }

  cargarCancion(cancionActual);
  reproducirCancion();
}

function crearPlaylist() {
  listaCanciones.innerHTML = "";

  canciones.forEach(function (cancion, indice) {
    const item = document.createElement("li");
    item.innerText = cancion.nombre;

    item.addEventListener("click", function () {
      cancionActual = indice;
      cargarCancion(cancionActual);
      reproducirCancion();
      listaCanciones.classList.add("oculto");
    });

    listaCanciones.appendChild(item);
  });
}

function actualizarPlaylist() {
  const items = listaCanciones.querySelectorAll("li");

  items.forEach(function (item, indice) {
    item.classList.remove("activo");

    if (indice === cancionActual) {
      item.classList.add("activo");
    }
  });
}

// ===============================
// BOTÓN START PARTY
// ===============================

btnStart.addEventListener("click", function () {
  intro.style.display = "none";
  contenido.classList.add("activo");
  musicPlayer.classList.add("activo");

  cargarCancion(cancionActual);
  reproducirCancion();
});

// ===============================
// CONTROLES DEL REPRODUCTOR
// ===============================

btnPlayPause.addEventListener("click", function () {
  if (musicaFiesta.paused) {
    reproducirCancion();
  } else {
    pausarCancion();
  }
});

btnNext.addEventListener("click", siguienteCancion);
btnPrev.addEventListener("click", cancionAnterior);

btnPlaylist.addEventListener("click", function () {
  listaCanciones.classList.toggle("oculto");
});

musicaFiesta.addEventListener("ended", siguienteCancion);

crearPlaylist();

// ===============================
// CUENTA REGRESIVA
// ===============================

const fechaFiesta = new Date("June 19, 2026 20:00:00").getTime();

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function actualizarCuentaRegresiva() {
  const ahora = new Date().getTime();
  const diferencia = fechaFiesta - ahora;

  if (diferencia <= 0) {
    dias.innerText = "00";
    horas.innerText = "00";
    minutos.innerText = "00";
    segundos.innerText = "00";
    return;
  }

  const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  const horasRestantes = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutosRestantes = Math.floor(
    (diferencia % (1000 * 60 * 60)) / (1000 * 60)
  );

  const segundosRestantes = Math.floor(
    (diferencia % (1000 * 60)) / 1000
  );

  dias.innerText = diasRestantes;
  horas.innerText = horasRestantes;
  minutos.innerText = minutosRestantes;
  segundos.innerText = segundosRestantes;
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);