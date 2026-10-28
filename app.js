// Audio Context sintético para efectos de sonido sin librerías externas
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playPulseSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(60, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// SIMULACIÓN DE PANTALLA DE CARGA (SPLASH SCREEN)
const loadingTexts = [
  "Afilando machetes...",
  "Sintonizando frecuencias de radio perturbadoras...",
  "Cargando combustible a la motosierra...",
  "Localizando víctimas a menos de 13 metros...",
  "Listos para la cacería..."
];

let progress = 0;
const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');
const splashScreen = document.getElementById('splashScreen');
const landingScreen = document.getElementById('landingScreen');

const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 18) + 12;
  
  if (progress > 100) progress = 100;
  
  progressBar.style.width = progress + '%';
  
  const textIndex = Math.min(
    Math.floor((progress / 100) * loadingTexts.length),
    loadingTexts.length - 1
  );
  loadingText.innerText = loadingTexts[textIndex];

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(finishLoading, 400);
  }
}, 300);

function finishLoading() {
  splashScreen.classList.add('fade-out');
  setTimeout(() => {
    splashScreen.style.display = 'none';
    landingScreen.classList.remove('opacity-0');
  }, 600);
}

// MANEJO DE MODALES DE AUTENTICACIÓN
function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  openModal(openId);
}

function handleAuthSubmit(event, actionName) {
  event.preventDefault();
  alert(`¡${actionName} exitoso! (Aquí conectaremos la vista principal de deslizamiento de perfiles)`);
  closeModal('loginModal');
  closeModal('registerModal');
}
