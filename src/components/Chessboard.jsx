import React from "react";
import ChessTile from "./ChessTile";
import whitePawn from "../images/pawn_w.png";
import blackPawn from "../images/pawn_b.png";

function Chessboard() {
  let chessboard = [];
  let pieces = [
    //white pawns
    { image: whitePawn, x: "a", y: 2 },
    { image: whitePawn, x: "b", y: 2 },
    { image: whitePawn, x: "c", y: 2 },
    { image: whitePawn, x: "d", y: 2 },
    { image: whitePawn, x: "e", y: 2 },
    { image: whitePawn, x: "f", y: 2 },
    { image: whitePawn, x: "g", y: 2 },
    { image: whitePawn, x: "h", y: 2 },
    //black pawns
    { image: blackPawn, x: "a", y: 7 },
    { image: blackPawn, x: "b", y: 7 },
    { image: blackPawn, x: "c", y: 7 },
    { image: blackPawn, x: "d", y: 7 },
    { image: blackPawn, x: "e", y: 7 },
    { image: blackPawn, x: "f", y: 7 },
    { image: blackPawn, x: "g", y: 7 },
    { image: blackPawn, x: "h", y: 7 },
  ];
  let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  for (let j = 8; j >= 1; j--) {
    for (let i = 0; i < letters.length; i++) {
      //set image to undefined and if the coordinates are the same, then update value. Then push to chessboard array with image value
      let image = undefined;
      pieces.forEach((piece) => {
        if (piece.x === letters[i] && piece.y === j) {
          image = piece.image;
        }
      });
      //push object with coordinates and image properties to map over later
      chessboard.push({ place: `${letters[i]}${j}`, image });
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
            if (
              (i % 2 === 0 && e.place[1] % 2 === 0) ||
              (i % 2 !== 0 && e.place[1] % 2 !== 0)
            ) {
              //white tiles with piece image added
              return <ChessTile white={"white"} piece={e.image} />;
            } else {
              //black tiles with piece image added
              return <ChessTile piece={e.image} />;
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
