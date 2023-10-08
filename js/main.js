// Initialize variables and Audio objects
const characters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let phrases = [
  'Summon Vie',
  'In the dark, close your eyes',
  'Force your eyes upward',
  `Our gaze is burnt into your retina`,
  `O circles endless, O spheres of fate, In you we wander, lost and desolate.`,
  `Our path is twisted, our journey never straight, In circles constant, we lament our state.`,
];
let qna = [
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

let typedString = '';
let text = phrases[0];
let textBox = document.getElementById('text-box');
let answerBox = document.getElementById('answer-box');
let phraseIndex = 0;
let questionIndex = 0;
let i = 0;
let audio = new Audio('../sounds/viespeaks.mp3');
let bgMusic = new Audio('../sounds/ambient-vie-track.mp3');
let bell = new Audio('../sounds/bellbong.mp3');
let isBgMusicStarted = false; // To make sure it starts only once
let canClickDocument = true;

// Initialize AudioContext and gain node
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSrc = audioCtx.createMediaElementSource(audio);
let gainNode = audioCtx.createGain();

// Add this code after defining bgMusic
bgMusic.addEventListener('ended', () => {
  bgMusic.playbackRate = Math.random() * (1.5 - 0.5) + 0.5;
  bgMusic.currentTime = 0;
  bgMusic.play();
});

// Initialize bgMusic properties and start playing
bgMusic.loop = true;
// bgMusic.playbackRate = Math.random() * (1.5 - 0.5) + 0.5;
// bgMusic.play();

audio.addEventListener('loadedmetadata', () => {
  audioDuration = audio.duration;
});

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

const typeText = () => {
  if (i < text.length) {
    let char = text.charAt(i);

    if (Math.random() > 0.5) {
      char = char.toUpperCase();
    }

    if (text.includes('vie')) {
      textBox.style.fontFamily = 'Text Regular';
    }

    // initialize each letter
    let span = document.createElement('span');
    span.innerHTML = char;
    span.style.position = 'relative';

    // Dislocate each letter
    let randomX = Math.floor(Math.random() * 10) - 5; // Between -5 and 5
    let randomY = Math.floor(Math.random() * 10) - 5; // Between -5 and 5

    span.style.top = `${randomY}px`;
    span.style.left = `${randomX}px`;

    if (typeof audioDuration !== 'undefined') {
      audio.currentTime = Math.random() * audioDuration;
      audio.play();
    }

    // spawn new letters
    textBox.appendChild(span);
    i++;
    const minTime = 0; // 100 milliseconds
    const maxTime = 400; // 1000 milliseconds

    setTimeout(typeText, Math.random() * (maxTime - minTime) + minTime);
  } else {
    audio.pause(); // Stop sound when the text is done
    audio.currentTime = 0; // Reset audio to the start
  }
  // Place to trigger sound when text is being typed
};

document.addEventListener('click', () => {
  console.log('click', questionIndex);
  let vie = document.getElementById('vie-img');

  if (!canClickDocument) return;

  vie.classList.remove('fade-in');
  vie.classList.add('fade-in-completely');
  textBox.innerHTML = '';
  i = 0;
  bell.play();
  bgMusic.play();

  // execute if there are phrases
  if (phraseIndex < phrases.length) {
    text = phrases[phraseIndex];
    phraseIndex++;
    typeText();
  } else {
    canClickDocument = false;

    let answerHTML = qna[questionIndex].answer
      .map((answer) => {
        return `<span>${answer}</span>`;
      })
      .join(' ');

    answerBox.innerHTML = answerHTML;
    text = qna[questionIndex].question;
    questionIndex++;
    typeText(); // To show the question
  }
});

answerBox.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    // Logic to handle answer selection
    // window.alert('huh ?? ? ?? ? ');
    if (questionIndex < qna.length) {
      let nextAnswerHTML = qna[questionIndex].answer
        .map((answer) => {
          return `<span id='answer'>${answer}</span>`;
        })
        .join(' ');

      answerBox.innerHTML = nextAnswerHTML;
      text = qna[questionIndex].question;
      questionIndex++;

      textBox.innerHTML = '';
      i = 0;
      typeText();
    }
  }

  if (questionIndex === 2 && e.target.textContent === 'Yes') {
    window.location.href = 'https://www.null00.no';
  }

  if (questionIndex === 2 && e.target.textContent === "I don't know") {
    bgMusic.pause();
    phraseIndex++;
    let vie = document.getElementById('vie-img');
    vie.style.transform = 'scale(3)';
    text = '';
  }
});

document.addEventListener('keydown', (e) => {
  typedString += e.key;
  if (typedString.includes('vie')) {
    textBox.style.fontFamily = 'Text Regular';
  }
  // Optional: Clear the string so it doesn't get too long
  if (typedString.length > 10) {
    typedString = typedString.substring(1);
  }
});

document.addEventListener('contextmenu', (e) => {
  // Prevent the default right-click menu from showing up
  e.preventDefault();

  // Change the font
  textBox.style.fontFamily = 'Text Regular';
});

document.addEventListener('mouseover', function (event) {
  if (event.target.closest('#answer')) {
    bell.currentTime = 0;
    bell.play();
  }
});

// ios
document.addEventListener(
  'touchstart',
  () => {
    console.log('click', questionIndex);
    let vie = (document.getElementById('vie-img').style.transform =
      'translate(-50%, -50%) scale(1.5)');
    vie.classList.remove('fade-in');
    vie.classList.add('fade-in-completely');
    textBox.innerHTML = '';
    i = 0;
    bell.play();
    bgMusic.play();

    if (phraseIndex < phrases.length) {
      text = phrases[phraseIndex];
      phraseIndex++;
      typeText();
    } else if (questionIndex < qna.length) {
      // phraseIndex = 0;
      let answerHTML = qna[questionIndex].answer
        .map((answer) => {
          return `<span>${answer}</span>`;
        })
        .join(' ');
      answerBox.innerHTML = answerHTML;
      text = qna[questionIndex].question;
      questionIndex++;
    }
  },
  false
);
