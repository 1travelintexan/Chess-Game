import { v4 as uuidv4 } from "uuid";
import ChessTile from "./ChessTile";
import whitePawn from "../images/pawn_w.png";
import whiteRook from "../images/rook_w.png";
import whiteBishop from "../images/bishop_w.png";
import whiteknight from "../images/knight_w.png";
import whiteQueen from "../images/queen_w.png";
import whiteKing from "../images/king_w.png";
import blackPawn from "../images/pawn_b.png";
import blackRook from "../images/rook_b.png";
import blackBishop from "../images/bishop_b.png";
import blackknight from "../images/knight_b.png";
import blackQueen from "../images/queen_b.png";
import blackKing from "../images/king_b.png";

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
    //white rooks
    { image: whiteRook, x: "a", y: 1 },
    { image: whiteRook, x: "h", y: 1 },
    //white knights
    { image: whiteknight, x: "b", y: 1 },
    { image: whiteknight, x: "g", y: 1 },
    //white bishops
    { image: whiteBishop, x: "c", y: 1 },
    { image: whiteBishop, x: "f", y: 1 },
    //white Queen
    { image: whiteQueen, x: "d", y: 1 },
    //white king
    { image: whiteKing, x: "e", y: 1 },
    //black pawns
    { image: blackPawn, x: "a", y: 7 },
    { image: blackPawn, x: "b", y: 7 },
    { image: blackPawn, x: "c", y: 7 },
    { image: blackPawn, x: "d", y: 7 },
    { image: blackPawn, x: "e", y: 7 },
    { image: blackPawn, x: "f", y: 7 },
    { image: blackPawn, x: "g", y: 7 },
    { image: blackPawn, x: "h", y: 7 },
    //black rooks
    { image: blackRook, x: "a", y: 8 },
    { image: blackRook, x: "h", y: 8 },
    //black knights
    { image: blackknight, x: "b", y: 8 },
    { image: blackknight, x: "g", y: 8 },
    //white bishops
    { image: blackBishop, x: "c", y: 8 },
    { image: blackBishop, x: "f", y: 8 },
    //white Queen
    { image: blackQueen, x: "d", y: 8 },
    //black king
    { image: blackKing, x: "e", y: 8 },
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

  let activePiece = null;
  const handleMouseDown = (e) => {
    if (!e.target.classList.value) {
      let x = e.clientX - 35;
      let y = e.clientY;
      e.target.style.position = "absolute";
      e.target.style.left = `${x}px`;
      e.target.style.top = `${y}px`;
      activePiece = e.target;
    }
  };
  const handleMouseMove = (e) => {
    if (activePiece) {
      let x = e.clientX - 35;
      let y = e.clientY;
      e.target.style.position = "absolute";
      e.target.style.left = `${x}px`;
      e.target.style.top = `${y}px`;
    }
  };

  const handleMouseDrop = (e) => {
    if (activePiece) activePiece = null;
  };

  return (
    <div id="chess-page">
      <div
        id="chessboard-container"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={handleMouseDrop}
      >
        <div>
          {numbers.reverse().map((num) => (
            <span key={uuidv4()} className="numbers">
              {num}
            </span>
          ))}
        </div>
        <div id="chessboard">
          {chessboard.map((e, i) => {
            if (
              (i % 2 === 0 && e.place[1] % 2 === 0) ||
              (i % 2 !== 0 && e.place[1] % 2 !== 0)
            ) {
              //white tiles with piece image added
              return (
                <ChessTile key={uuidv4()} white={"white"} piece={e.image} />
              );
            } else {
              //black tiles with piece image added
              return <ChessTile key={uuidv4()} piece={e.image} />;
            }
          })}
        </div>
      </div>
      <div id="letters-row">
        {letters.map((e) => (
          <span key={uuidv4()} className="letters">
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
