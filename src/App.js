import Timer from "./Timer";
import Game from "./Game";
import GameOverlay from "./GameOverlay"
import { useState, useEffect } from "react";

export default function App() {
  const [gameStatus, setGameStatus] = useState("INIT");
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [engage, setEngage] = useState(false);

  function startTimer() {
    setSeconds(timer);
  }

  function handleTimeout() {
    if (seconds == 0 && gameStatus == "STARTED") {
      setGameStatus("ENDED");
    } else if (seconds != 0) {
      setSeconds(seconds - 1);
    }
  }

  useEffect(() => {
    const id = setTimeout(handleTimeout, 1000);
  });

  function handleFocus() {
    document.getElementsByClassName("keyboard")[0].focus();
    setEngage(true);
  }

  function handleBlur() {
    setEngage(false);
  }

  return (
    <div className="app">
      <Timer seconds={seconds} />
      <div
        className="gameContainer"
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <GameOverlay engage={engage} gameStatus={gameStatus}/>
        <Game
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          timer={timer}
          startTimer={startTimer}
        />
      </div>
    </div>
  );
}
