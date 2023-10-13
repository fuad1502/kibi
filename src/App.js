import Text from "./Text";
import Keyboard from "./Keyboard";
import Timer from "./Timer";
import Score from "./Score";
import { getWords } from "./TextGenerator";
import { useState, useEffect } from "react";

export default function App() {
  const [pressedKey, setPressedKey] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [words, setWords] = useState(getWords());
  const [wordScores, setWordScores] = useState([[]]);
  const [startWord, setStartWord] = useState(0);
  const [gameStatus, setGameStatus] = useState("INIT");
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(0);

  function handlePressedKey(pressedKey) {
    if (
      gameStatus == "ENDED" ||
      (pressedKey.length > 1 && pressedKey.toLowerCase() != "backspace")
    ) {
      return;
    }

    if (gameStatus == "INIT") {
      setGameStatus("STARTED");
      setSeconds(timer);
    }

    let updatedStates;
    if (pressedKey.toLowerCase() == "backspace") {
      if (letterIndex == 0) {
        return;
      }
      updatedStates = updateStatesBackspace(
        words,
        wordIndex,
        letterIndex,
        wordScores,
      );
    } else if (pressedKey.length == 1) {
      updatedStates = updateStatesNormalKey(
        pressedKey,
        words,
        wordIndex,
        letterIndex,
        wordScores,
        startWord,
      );
      setPressedKey(pressedKey);
      setWordIndex(updatedStates.wordIndex);
      setStartWord(updatedStates.startWord);
    }
    setWords(updatedStates.words);
    setLetterIndex(updatedStates.letterIndex);
    setWordScores(updatedStates.wordScores);
  }

  function handleTimeout() {
    if (seconds == 1 && gameStatus == "STARTED") {
      setGameStatus("ENDED");
    } else if (seconds != 0) {
      setSeconds(seconds - 1);
    }
  }

  useEffect(() => {
    const id = setTimeout(handleTimeout, 1000);
  });

  return (
    <div className="app">
      <div>
        <h1>KIBI ⌨️ </h1>
        <Timer seconds={seconds} />
      </div>
      <Text
        words={words}
        wordIndex={wordIndex}
        letterIndex={letterIndex}
        wordScores={wordScores}
        startWord={startWord}
      />
      <Keyboard pressedKey={pressedKey} handlePressedKey={handlePressedKey} />
      <Score gameStatus={gameStatus} timer={timer} wordScores={wordScores} />
    </div>
  );
}

function updateStatesNormalKey(
  pressedKey,
  words,
  wordIndex,
  letterIndex,
  wordScores,
  startWord,
) {
  const correct = words[wordIndex][letterIndex] == pressedKey;
  let word = words[wordIndex];

  const newWords = words.slice();
  let newWordIndex = wordIndex;
  let newLetterIndex = letterIndex + 1;
  const newWordScores = wordScores.slice();
  let newStartWord = startWord;

  if (!correct && word[letterIndex] == " ") {
    newWords[wordIndex] = word.substring(0, word.length - 1) + pressedKey + " ";
    newWordScores[wordIndex].push(2);
  } else if (!correct) {
    newWordScores[wordIndex].push(1);
  } else {
    newWordScores[wordIndex].push(0);
    if (word[letterIndex] == " ") {
      newWordIndex = wordIndex + 1;
      newLetterIndex = 0;
      newWordScores.push([]);
    }
  }
  if (word[letterIndex] == " " && correct && isEndOfLine()) {
    newStartWord = newWordIndex;
  }

  return {
    words: newWords,
    wordIndex: newWordIndex,
    letterIndex: newLetterIndex,
    wordScores: newWordScores,
    startWord: newStartWord,
  };
}

function updateStatesBackspace(words, wordIndex, letterIndex, wordScores) {
  let newWords = words.slice();
  const newLetterIndex = letterIndex - 1;
  const newWordScores = wordScores.slice();

  if (wordScores[wordIndex][letterIndex - 1] == 2) {
    const word = newWords[wordIndex];
    newWords[wordIndex] = word.substring(0, word.length - 2) + " ";
  }
  newWordScores[wordIndex].pop();

  return {
    words: newWords,
    letterIndex: newLetterIndex,
    wordScores: newWordScores,
  };
}

function isEndOfLine() {
  const currentLetterOffset =
    document.getElementsByClassName("currentLetter")[0].offsetTop;
  const nextLetterOffset =
    document.getElementsByClassName("nextLetter")[0].offsetTop;
  return nextLetterOffset > currentLetterOffset;
}
