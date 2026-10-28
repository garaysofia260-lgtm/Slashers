// MENSAJES DE CARGA HOOKED
const statusMessages = [
  "Afilando el gancho...",
  "Sintonizando frecuencias de terror...",
  "Localizando asesinos cercanos...",
  "Cargando almas de pesadilla..."
];

let progress = 0;
const progressBar = document.getElementById('progressBar');
const loadingStatus = document.getElementById('loadingStatus');
const splashScreen = document.getElementById('splashScreen');

const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 20) + 12;
  if (progress > 100) progress = 100;
  
  if (progressBar) progressBar.style.width = progress + '%';
  
  const msgIndex = Math.min(Math.floor((progress / 100) * statusMessages.length), statusMessages.length - 1);
  if (loadingStatus) loadingStatus.innerText = statusMessages[msgIndex];

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => {
      splashScreen.classList.add('opacity-0');
      setTimeout(() => splashScreen.style.display = 'none', 500);
    }, 400);
  }
}, 220);

// EFECTOS Y MODALES
let audioCtx = null;
let isMuted = true;

function toggleSound() {
  const icon = document.getElementById('soundIcon');
  isMuted = !isMuted;
  if (!isMuted) {
    icon.innerText = '🔊';
    playPulse();
  } else {
    icon.innerText = '🔇';
  }
}

function playPulse() {
  if (isMuted) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(60, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function openModal(modalId) {
  playPulse();
  document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function handleAuth(event, actionName) {
  event.preventDefault();
  alert(`¡${actionName} exitoso! Bienvenido a HOOKED.`);
  closeModal('loginModal');
  closeModal('registerModal');
}
