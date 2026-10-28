// Función global indestructible para forzar ocultar la pantalla de carga
function forceHideSplash() {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    splash.style.transition = 'opacity 0.4s ease';
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
      splash.remove(); // Eliminado del DOM para asegurar que no bloquee los clics del inicio
    }, 400);
  }
}

// Inicializador principal al cargar la página
window.addEventListener('load', () => {
  let progress = 0;
  const progressBar = document.getElementById('progressBar');
  const loadingStatus = document.getElementById('loadingStatus');

  const statusMessages = [
    "Afilando el gancho...",
    "Sintonizando frecuencias de terror...",
    "Localizando asesinos cercanos...",
    "Cargando almas de pesadilla..."
  ];

  const loadingInterval = setInterval(() => {
    progress += 25;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = progress + '%';

    const msgIndex = Math.min(Math.floor((progress / 100) * statusMessages.length), statusMessages.length - 1);
    if (loadingStatus) loadingStatus.innerText = statusMessages[msgIndex];

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(forceHideSplash, 300);
    }
  }, 200);

  // Garantía de tiempo máximo (Timeout de respaldo por si falla el intervalo)
  setTimeout(() => {
    clearInterval(loadingInterval);
    forceHideSplash();
  }, 2500);
});

// AUDIO AMBIENTAL Y CONTROLES
let audioCtx = null;
let isMuted = true;

function toggleSound() {
  const icon = document.getElementById('soundIcon');
  isMuted = !isMuted;
  if (icon) {
    icon.innerText = isMuted ? '🔇' : '🔊';
  }
  if (!isMuted) playPulse();
}

function playPulse() {
  if (isMuted) return;
  try {
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
  } catch (e) {
    console.log("Audio no disponible");
  }
}

// CONTROL DE MODALES
function openModal(modalId) {
  playPulse();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function handleAuth(event, actionName) {
  event.preventDefault();
  alert(`¡${actionName} exitoso! Bienvenido a HOOKED.`);
  closeModal('loginModal');
  closeModal('registerModal');
}
