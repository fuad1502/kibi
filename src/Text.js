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
      if (status == 0) {
        spans.push(<span className="correctLetter">{letter}</span>);
      } else if (status == 1) {
        spans.push(<span className="incorrectLetter">{letter}</span>);
      } else if (status == 2) {
        spans.push(<span className="additional">{letter}</span>);
      } else if (i == wordIndex && j == letterIndex) {
        spans.push(<span className="currentLetter">{letter}</span>);
      } else if (i == wordIndex + 1 && j == 0) {
        spans.push(<span className="nextLetter">{letter}</span>);
      } else {
        spans.push(<span>{letter}</span>);
      }
    }
  }

  return <div className="text">{spans}</div>;
}
