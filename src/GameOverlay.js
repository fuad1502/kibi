export default function GameOverlay({ engage, gameStatus }) {
  function overlayMessage(gameStatus) {
    if (gameStatus == "INIT") {
      return "Click here and start typing!";
    } else if (gameStatus == "STARTED") {
      return "Click here and continue typing!";
    } else {
      return "Finished!";
    }
  }

  function handleHiddenProp(engage, gameStatus) {
    if (gameStatus != "ENDED") {
      return engage;
    } else {
      return false;
    }
  }

  return (
    <div className="gameOverlay" hidden={handleHiddenProp(engage, gameStatus)}>
      <p>{overlayMessage(gameStatus)}</p>
    </div>
  );
}
