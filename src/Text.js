export default function Text({
  words,
  wordIndex,
  letterIndex,
  wordScores,
  startWord,
}) {
  let spans = [];
  for (let i = startWord; i < words.length; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      const letter = word[j];
      let status = wordScores[i];
      if (status != undefined) {
        status = status[j];
      }
      const key = i * 10000 + j;
      if (status == 0) {
        spans.push(
          <span key={key} className="correctLetter">
            {letter}
          </span>,
        );
      } else if (status == 1) {
        spans.push(
          <span key={key} className="incorrectLetter">
            {letter}
          </span>,
        );
      } else if (status == 2) {
        spans.push(
          <span key={key} className="additional">
            {letter}
          </span>,
        );
      } else if (i == wordIndex && j == letterIndex) {
        spans.push(
          <span key={key} className="currentLetter">
            {letter}
          </span>,
        );
      } else if (i == wordIndex + 1 && j == 0) {
        spans.push(
          <span key={key} className="nextLetter">
            {letter}
          </span>,
        );
      } else {
        spans.push(<span key={key}>{letter}</span>);
      }
    }
  }

  return <div className="text">{spans}</div>;
}
