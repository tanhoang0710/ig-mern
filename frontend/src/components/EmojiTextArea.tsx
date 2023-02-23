import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IconEmoji } from "./Icon/IconEmoji";
// import "./styles.css";

interface EmojiTextAreaProps {
  rows?: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}

function EmojiTextArea({ rows = 5, setText, text }: EmojiTextAreaProps) {
  const [showPicker, setShowPicker] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
    setShowPicker(false);
  }

  function handleEmojiSelect(emoji: EmojiClickData, event: MouseEvent) {
    setText(text + emoji.emoji);
  }

  function togglePicker() {
    setShowPicker(!showPicker);
  }

  return (
    <div className="emoji-textarea-container">
      <textarea
        rows={rows}
        value={text}
        onChange={handleInputChange}
        className="block p-2.5 w-full text-gray-900 bg-gray-50 border-none outline-none text-[16px]"
        placeholder="Write a caption..."
      />
      <div className="emoji-picker-container">
        <button onClick={togglePicker} className={"ml-[6px]"}>
          <IconEmoji />
        </button>
        {showPicker && (
          <div className="absolute bottom-0 left-[-350px]">
            <EmojiPicker
              height={300}
              searchDisabled
              categories={undefined}
              previewConfig={{ showPreview: false }}
              onEmojiClick={handleEmojiSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmojiTextArea;
