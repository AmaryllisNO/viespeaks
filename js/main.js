// Initialize variables and Audio objects
import { initialisations } from './variables.js';
import { initialiseEventListeners } from './eventListeners.js';
let { audio, bgMusic, audioCtx, audioSrc, gainNode } = initialisations;

initialiseEventListeners();

// Initialize bgMusic properties and start playing
bgMusic.loop = true;
// bgMusic.playbackRate = Math.random() * (1.5 - 0.5) + 0.5;
// bgMusic.play();

audioSrc.connect(gainNode);
gainNode.connect(audioCtx.destination);

gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5); // Fade in over 0.5 sec

audio.play();

// Once fade out is done, pause and reset the audio
setTimeout(() => {
  audio.pause();
  audio.currentTime = 0;
}, 500);
