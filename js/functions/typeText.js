export const typeText = ({ i, text, textBox, audio, audioDuration = 0 }) => {
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

    setTimeout(
      () => typeText({ i, text, textBox, audio, audioDuration }),
      Math.random() * (maxTime - minTime) + minTime
    );
  } else {
    audio.pause(); // Stop sound when the text is done
    audio.currentTime = 0; // Reset audio to the start
  }
  // Place to trigger sound when text is being typed
};
