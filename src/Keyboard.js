export default function Keyboard({ pressedKey, handlePressedKey }) {
  function handleKeyDown(event) {
    handlePressedKey(event.key);
  }

  return (
    <div className="keyboard" tabIndex="0" onKeyDown={handleKeyDown}>
      {pressedKey}
    </div>
  );
}
