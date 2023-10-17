export default function GameOverlay({ engage, gameStatus, onGameRestart }) {
  function overlayMessage(gameStatus) {
    if (gameStatus == "LOADING") {
      return "Loading words...";
    } else if (gameStatus == "INIT") {
      return "Click here and start typing!";
    } else if (gameStatus == "STARTED") {
      return "Click here and continue typing!";
    } else {
      return "Finished!";
    }
  }

  function handleHiddenProp(engage, gameStatus) {
    if (gameStatus != "ENDED" && gameStatus != "LOADING") {
      return engage;
    } else {
      return false;
    }
  }

  return (
    <div className="gameOverlay" hidden={handleHiddenProp(engage, gameStatus)}>
      <span>
        <p>{overlayMessage(gameStatus)}</p>
        <button onClick={onGameRestart} hidden={gameStatus != "ENDED"}>
          ⟲
        </button>
      </span>
    </div>
  );
}
