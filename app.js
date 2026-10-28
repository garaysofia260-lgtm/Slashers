function hideSplash() {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    splash.style.transition = 'opacity 0.4s ease';
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
      splash.remove();
    }, 400);
  }
}

// EFECTOS DE AUDIO Y MODALES
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
