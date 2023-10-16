import Timer from "./Timer";
import Game from "./Game";
import GameOverlay from "./GameOverlay";
import { useState, useEffect } from "react";

export default function App() {
  const [gameStatus, setGameStatus] = useState("LOADING");
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [engage, setEngage] = useState(false);

  function startTimer() {
    setSeconds(timer);
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

  function restartGame() {
    setGameStatus("LOADING");
    setSeconds(0);
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
          restartGame={restartGame}
        />
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
