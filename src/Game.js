import Text from "./Text";
import Keyboard from "./Keyboard";
import Score from "./Score";
import { getWords } from "./TextGenerator";
import { useState, useEffect } from "react";

export default function Game({ gameStatus, setGameStatus, timer, startTimer }) {
  const [pressedKey, setPressedKey] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [words, setWords] = useState(getWords());
  const [wordScores, setWordScores] = useState([[]]);
  const [startWord, setStartWord] = useState(0);
  const [justRestarted, setJustRestarted] = useState(true);

  if (!justRestarted && gameStatus == "INIT") {
    setWordIndex(0);
    setLetterIndex(0);
    setWordScores([[]]);
    setStartWord(0);
    setJustRestarted(true);
  }

  function handlePressedKey(pressedKey) {
    if (
      gameStatus == "ENDED" ||
      (pressedKey.length > 1 && pressedKey.toLowerCase() != "backspace")
    ) {
      return;
    }

    if (gameStatus == "INIT") {
      setGameStatus("STARTED");
      setJustRestarted(false);
      startTimer();
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

  return (
    <div className="game">
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
