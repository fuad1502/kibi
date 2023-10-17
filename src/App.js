import Timer from "./Timer";
import Game from "./Game";
import GameOverlay from "./GameOverlay";
import { useState, useEffect } from "react";

export default function App() {
  const [gameStatus, setGameStatus] = useState("LOADING");
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [engage, setEngage] = useState(false);

  function handleGameLoaded() {
    setGameStatus("INIT");
  }

  function handleGameStart() {
    setGameStatus("STARTED");
    setSeconds(timer);
  }

  function handleGameRestart() {
    setGameStatus("LOADING");
    setSeconds(0);
  }

  function handleTimeout() {
    if (seconds == 1 && gameStatus == "STARTED") {
      setGameStatus("ENDED");
    }
    if (seconds != 0) {
      setSeconds(seconds - 1);
    }
  }

  useEffect(() => {
    setTimeout(handleTimeout, 1000);
  }, [seconds]);

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
        <GameOverlay
          engage={engage}
          gameStatus={gameStatus}
          onGameRestart={handleGameRestart}
        />
        <Game
          gameStatus={gameStatus}
          timer={timer}
          onGameLoaded={handleGameLoaded}
          onGameStart={handleGameStart}
        />
      </div>
    </div>
  );
}
