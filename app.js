// Web Audio API sintético para efectos en móviles
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
  osc.frequency.setValueAtTime(70, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}

// CARGA DE LA PANTALLA INICIAL (MOBILE)
const loadingTexts = [
  "Afilando machetes...",
  "Cargando combustible...",
  "Localizando víctimas cercanas...",
  "Listos para la cacería..."
];

let progress = 0;
const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');
const splashScreen = document.getElementById('splashScreen');
const landingScreen = document.getElementById('landingScreen');

const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 20) + 15;
  if (progress > 100) progress = 100;
  
  progressBar.style.width = progress + '%';
  
  const textIndex = Math.min(
    Math.floor((progress / 100) * loadingTexts.length),
    loadingTexts.length - 1
  );
  loadingText.innerText = loadingTexts[textIndex];

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(finishLoading, 300);
  }
}, 250);

function finishLoading() {
  splashScreen.classList.add('fade-out');
  setTimeout(() => {
    splashScreen.style.display = 'none';
    landingScreen.classList.remove('opacity-0');
  }, 500);
}

// GESTIÓN DE MODALES TÁCTILES
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
  alert(`¡${actionName} exitoso! Redirigiendo a las citas...`);
  closeModal('loginModal');
  closeModal('registerModal');
}
