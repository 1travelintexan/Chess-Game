import React from "react";

function Chessboard() {
  let chessboard = [];
  let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  for (let j = 8; j >= 1; j--) {
    for (let i = 0; i < letters.length; i++) {
      chessboard.push(`${letters[i]}${j}`);
    }
  }
  console.log(chessboard);
  return (
    <div id="chess-page">
      <div id="chessboard-container">
        <div>
          {numbers.reverse().map((num) => (
            <span className="numbers">{num}</span>
          ))}
        </div>
        <div id="chessboard">
          {chessboard.map((e, i) => {
            if (i % 2 === 0 && e[1] % 2 === 0) {
              return <span className="tile white"></span>;
            } else if (i % 2 !== 0 && e[1] % 2 !== 0) {
              return <span className="tile white"></span>;
            } else {
              return <span className="tile "></span>;
            }
          })}
        </div>
      </div>
      <div id="letters-row">
        {letters.map((e) => (
          <span className="letters">{e}</span>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
