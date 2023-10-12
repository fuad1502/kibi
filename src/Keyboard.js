export default function Keyboard({ pressedKey, handlePressedKey }) {
  function handleKeyDown(event) {
    handlePressedKey(event.key);
  }

  return (
    <div className="keyboard" onKeyDown={handleKeyDown} tabIndex="0">
      {pressedKey}
    </div>
  );
}
