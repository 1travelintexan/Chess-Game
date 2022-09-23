import { v4 as uuidv4 } from "uuid";
import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";
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
import { useEffect, useState } from "react";

function Chessboard() {
  let piecesArr = [
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
  const [chessboard, setChessboard] = useState([]);
  const [pieces, setPieces] = useState(piecesArr);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  useEffect(() => {
    let arr = [];
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const createChessboard = () => {
      for (let j = 8; j >= 1; j--) {
        for (let i = 0; i < letters.length; i++) {
          //set image to undefined and if the coordinates are the same, then update value. Then push to chessboard array with image value
          let image = undefined;
          pieces.forEach((piece) => {
            if (piece.x === letters[i] && piece.y === j) {
              image = piece.image;
            }
          });

          arr.push({ place: `${letters[i]}${j}`, image });
        }
      }
    };
    createChessboard();
    setChessboard(arr);
  }, [pieces]);

  const getPosition = (e) => {
    let boardStartX = window.innerWidth / 2 - 400;
    let boardStartY = window.innerHeight / 2 - 400;

    const mouseX = window.event.clientX - 25;
    const mouseY = window.event.clientY + 20;
    let position = "";

    // set letters of position based on the cursor position
    if (mouseX > boardStartX + 10 && mouseX < boardStartX + 80) {
      position += "a";
    } else if (mouseX > boardStartX + 100 && mouseX < boardStartX + 180) {
      position += "b";
    } else if (mouseX > boardStartX + 210 && mouseX < boardStartX + 280) {
      position += "c";
    } else if (mouseX > boardStartX + 310 && mouseX < boardStartX + 380) {
      position += "d";
    } else if (mouseX > boardStartX + 410 && mouseX < boardStartX + 480) {
      position += "e";
    } else if (mouseX > boardStartX + 510 && mouseX < boardStartX + 580) {
      position += "f";
    } else if (mouseX > boardStartX + 610 && mouseX < boardStartX + 680) {
      position += "g";
    } else if (mouseX > boardStartX + 710 && mouseX < boardStartX + 780) {
      position += "h";
    }

    //set the numbers of the position based on the cursor position
    if (mouseY > boardStartY + 20 && mouseY < boardStartY + 80) {
      position += "8";
    } else if (mouseY > boardStartY + 130 && mouseY < boardStartY + 180) {
      position += "7";
    } else if (mouseY > boardStartY + 230 && mouseY < boardStartY + 280) {
      position += "6";
    } else if (mouseY > boardStartY + 330 && mouseY < boardStartY + 380) {
      position += "5";
    } else if (mouseY > boardStartY + 430 && mouseY < boardStartY + 480) {
      position += "4";
    } else if (mouseY > boardStartY + 530 && mouseY < boardStartY + 580) {
      position += "3";
    } else if (mouseY > boardStartY + 630 && mouseY < boardStartY + 680) {
      position += "2";
    } else if (mouseY > boardStartY + 730 && mouseY < boardStartY + 780) {
      position += "1";
    }
    console.log("postion", position);
    return position;
  };

  const handleMovePiece = (from, to) => {
    console.log("from and to", from, to);
    const newArr = pieces.map((e) => {
      if (to[0] && to[1] && from[0] === e.x && +from[1] === e.y) {
        e.x = to[0];
        e.y = Number(to[1]);
        return e;
      } else {
        return e;
      }
    });
    setPieces([...newArr]);
  };

  return (
    <div id="chess-page">
      <div id="chessboard-container">
        <div>
          {numbers.reverse().map((num) => (
            <span key={uuidv4()} className="numbers">
              {num}
            </span>
          ))}
        </div>
        <div
          id="chessboard"
          onClick={(e) => {
            getPosition(e);
          }}
        >
          {chessboard &&
            chessboard.map((e, i) => {
              // console.log("map", e);
              //checks if its a white or black square and what piece is on that square
              if (
                (i % 2 === 0 && e.place[1] % 2 === 0) ||
                (i % 2 !== 0 && e.place[1] % 2 !== 0)
              ) {
                //white tiles with piece image added
                return (
                  <div key={uuidv4()}>
                    <ChessTile
                      white={"white"}
                      image={e.image}
                      getPosition={getPosition}
                      piece={e}
                      position={e.place}
                      movePiece={handleMovePiece}
                    />
                  </div>
                );
              } else {
                //black tiles with piece image added
                return (
                  <div key={uuidv4()}>
                    <ChessTile
                      image={e.image}
                      piece={e}
                      getPosition={getPosition}
                      position={e.place}
                      movePiece={handleMovePiece}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div id="letters-row">
        {boardLetters.map((e) => (
          <span key={uuidv4()} className="letters">
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
