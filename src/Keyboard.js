import { useState } from "react";

export default function Keyboard({ onKeyDown }) {
  const [pressedKey, setPressedKey] = useState(null);

  function handleKeyDown(event) {
    if (event.key.length == 1) {
      setPressedKey(event.key);
    }
    onKeyDown(event);
  }

  return (
    <div className="keyboard" tabIndex="0" onKeyDown={handleKeyDown}>
      {pressedKey}
    </div>
  );
}
