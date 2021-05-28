import { useState } from "react";
import { wipeData } from "../../services/api";

const CONFIRMATION_TEXT = "holamundo";

const RemoveAll = () => {
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const wipeDataHandler = async () => {
    try {
      await wipeData();
      setConfirmationMessage("Successfully deleted half of the universe! ");
    } catch (error) {
      setConfirmationMessage(error.response.data.error);
    }
  };

  return (
    <div>
      {`Type "${CONFIRMATION_TEXT}" in order to remove all the data `}
      <br />
      <input
        value={confirmationText}
        onChange={e => setConfirmationText(e.target.value)}
      />
      <button
        disabled={CONFIRMATION_TEXT !== confirmationText}
        onClick={() => wipeDataHandler()}
      >
        Snap
      </button>
      <div>{confirmationMessage}</div>
    </div>
  );
};

export default RemoveAll;
