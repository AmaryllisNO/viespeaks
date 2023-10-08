import { phrases, qna, initialisations } from './variables.js';
import { typeText } from './functions/typeText.js';
let {
  audioDuration,
  typedString,
  text,
  textBox,
  answerBox,
  phraseIndex,
  questionIndex,
  i,
  audio,
  bgMusic,
  bell,
  canClickDocument,
} = initialisations;

export const initialiseEventListeners = () => {
  // initialize set audio duration
  audio.addEventListener('loadedmetadata', () => {
    audioDuration = audio.duration;
  });

  //  main click event
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
      console.log('main click event', initialisations);
      typeText({ i, text, textBox, audio, audioDuration });
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
      typeText({ i, text, textBox, audio, audioDuration }); // To show the question
    }
  });

  // answers click event
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
        typeText({ i, text, textBox, audio, audioDuration });
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

  // text input listener
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

  // prevent context menu
  document.addEventListener('contextmenu', (e) => {
    // Prevent the default right-click menu from showing up
    e.preventDefault();
  });

  // play bell sound on answer hover
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
        typeText({ i, text, textBox, audio, audioDuration });
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
};
