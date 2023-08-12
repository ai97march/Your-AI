import React from "react";

export default function OptionSelection({ optionArray, selectOption }) {
  return (
    <div className="grid-main">
      {optionArray.map((item) => {
        return (
          <div
            key={item.id}
            className="grid-child"
            onClick={() => selectOption(item.option)}
          >
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
