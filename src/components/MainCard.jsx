import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Die from "./Die";

export default function MainCard() {
  const [dice, setDice] = useState([]);
  const [winning, setWinning] = useState(false);

  const fillDiceArray = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        id: i,
        isHeld: false,
      });
    }
    return arr;
  };

  useEffect(() => {
    setDice(fillDiceArray());
  }, []);

  const rollNewDice = () => {
    if (winning) {
      setDice(fillDiceArray());
      setWinning(false);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (die.isHeld) {
          return die;
        }
        return { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
  };

  const holdDie = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      })
    );
  };

  const checkWinning = () => {
    if (dice.length) {
      const winningValue = dice[0].value;
      const isAllHeld = dice.every((die) => {
        return die.isHeld;
      });
      const isAllEven = dice.every((die) => {
        return winningValue === die.value;
      });
      if (isAllHeld && isAllEven) {
        setWinning(true);
      }
    }
  };
  useEffect(() => {
    checkWinning();
  }, [dice]);

  return (
    <div className="container-outer">
      <div className="container-inner">
        <div className="tenzies-text">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls
          </p>
        </div>
        <div className="tenzies-body">
          {dice.map((die) => {
            return (
              <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDie={() => holdDie(die.id)}
              />
            );
          })}
        </div>
        <button onClick={rollNewDice} className="roll-btn">
          {!winning ? "Roll" : "New Game"}
        </button>
      </div>
    </div>
  );
}
