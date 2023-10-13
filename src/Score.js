export default function Score ({ gameStatus, timer, wordScores }) {
  if (gameStatus == "ENDED") {
    const wpm = calculateWPM(wordScores, timer);
    return <div className="score">Average WPM: {wpm}</div>;
  } else {
    return <div className="score">Average WPM: -</div>;
  }
}

function calculateWPM(wordScores, timer) {
  let correctWords = 0;
  for(let i = 0; i < wordScores.length - 1; i++) {
    let fail = false;
    const wordScore = wordScores[i];
    for(let j = 0; j < wordScore.length; j++) {
      if(wordScore[j] != 0) {
        fail = true;
        break;
      }
    }
    if(!fail) {
      correctWords++;
    }
  }
  return correctWords / (timer/60);
}
