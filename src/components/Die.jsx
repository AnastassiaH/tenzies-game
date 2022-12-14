import React from "react";
export default function Die({ value, isHeld, holdDie }) {
  return (
    <div
      onClick={holdDie}
      className="die"
      style={{ backgroundColor: isHeld ? "green" : "white" }}
    >
      {value}
    </div>
  );
}
