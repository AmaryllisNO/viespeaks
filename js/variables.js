export let phrases = [
  'Summon Vie',
  'In the dark, close your eyes',
  'Force your eyes upward',
  `Our gaze is burnt into your retina`,
  `O circles endless, O spheres of fate, In you we wander, lost and desolate.`,
  `Our path is twisted, our journey never straight, In circles constant, we lament our state.`,
];

export let qna = [
  {
    question: 'Do you feel fear?',
    answer: ['Yes', 'No'],
  },
  {
    question:
      'Do you feel the taunt pull of time weaving you closer to and endless slumber?',
    answer: ['Yes', `I don't know`],
  },
];

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audio = new Audio('../sounds/viespeaks.mp3');

export let initialisations = {
  audioDuration: undefined,
  typedString: '',
  text: phrases[0],
  textBox: document.getElementById('text-box'),
  answerBox: document.getElementById('answer-box'),
  phraseIndex: 0,
  questionIndex: 0,
  i: 0,
  audio: audio,
  bgMusic: new Audio('../sounds/ambient-vie-track.mp3'),
  bell: new Audio('../sounds/bellbong.mp3'),
  canClickDocument: true,
  audioCtx: audioCtx,
  audioSrc: audioCtx.createMediaElementSource(audio),
  gainNode: audioCtx.createGain(),
};
