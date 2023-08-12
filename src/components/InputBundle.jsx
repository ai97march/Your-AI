import React from "react";

export default function InputBundle({ onButtonClick, setInput, isLoading }) {
  return (
    <div className="blk">
      <textarea
        className="text-area"
        cols={80}
        rows={2}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="button grid-child"
        onClick={() => onButtonClick()}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
