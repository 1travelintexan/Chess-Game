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
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "a",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "b",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "c",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "d",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "e",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "f",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "g",
      y: 2,
      firstMove: true,
    },
    {
      image: whitePawn,
      type: "pawn",
      color: "white",
      x: "h",
      y: 2,
      firstMove: true,
    },
    //white rooks
    { image: whiteRook, type: "rook", color: "white", x: "a", y: 1 },
    { image: whiteRook, type: "rook", color: "white", x: "h", y: 1 },
    //white knights
    { image: whiteknight, type: "knight", color: "white", x: "b", y: 1 },
    { image: whiteknight, type: "knight", color: "white", x: "g", y: 1 },
    //white bishops
    { image: whiteBishop, type: "bishop", color: "white", x: "c", y: 1 },
    { image: whiteBishop, type: "bishop", color: "white", x: "f", y: 1 },
    //white Queen
    { image: whiteQueen, type: "queen", color: "white", x: "d", y: 1 },
    //white king
    { image: whiteKing, type: "king", color: "white", x: "e", y: 1 },
    //black pawns
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "a",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "b",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "c",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "d",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "e",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "f",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "g",
      y: 7,
      firstMove: true,
    },
    {
      image: blackPawn,
      type: "pawn",
      color: "black",
      x: "h",
      y: 7,
      firstMove: true,
    },
    //black rooks
    { image: blackRook, type: "rook", color: "black", x: "a", y: 8 },
    { image: blackRook, type: "rook", color: "black", x: "h", y: 8 },
    //black knights
    { image: blackknight, type: "knight", color: "black", x: "b", y: 8 },
    { image: blackknight, type: "knight", color: "black", x: "g", y: 8 },
    //white bishops
    { image: blackBishop, type: "bishop", color: "black", x: "c", y: 8 },
    { image: blackBishop, type: "bishop", color: "black", x: "f", y: 8 },
    //white Queen
    { image: blackQueen, type: "queen", color: "black", x: "d", y: 8 },
    //black king
    { image: blackKing, type: "king", color: "black", x: "e", y: 8 },
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
          let image;
          let color;
          let type;
          pieces.forEach((piece) => {
            if (piece.x === letters[i] && piece.y === j) {
              image = piece.image;
              color = piece.color;
              type = piece.type;
            }
          });

          arr.push({ place: `${letters[i]}${j}`, image, color, type });
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
    return position;
  };

  const handleMovePiece = (from, to, movingPieceColor, pieceType) => {
    let positionInformation = handleCheckPosition(to);

    //if a piece is on the 'to' square, then filter it from the pieces list and replace the image for that square
    if (
      positionInformation &&
      movingPieceColor === positionInformation["color"]
    ) {
      //   let filteredPieces = pieces.filter((piece) => {
      //     let pieceLocation = `${piece.x}${piece.y}`;
      //     if (pieceLocation !== to) {
      //       return piece;
      //     } else {
      //       return null;
      //     }
      //   });
      //   //now that the pieces are filtered with one less piece that was eaten, we map over them to change the x and y of the correct piece
      //   filteredPieces.map((piece) => {
      //     let pieceLocation = `${piece.x}${piece.y}`;
      //     if (pieceLocation === from) {
      //       piece.x = to[0];
      //       piece.y = +to[1];
      //     }
      //     return piece;
      //   });
      //   setPieces([...filteredPieces]);
    } else {
      const piecesWithNewLocation = pieces.map((e) => {
        //check if from and to are truthy and then if the location matches any pieces
        if (to[0] && to[1] && from[0] === e.x && +from[1] === e.y) {
          e.x = to[0];
          e.y = Number(to[1]);
          return e;
        } else {
          return e;
        }
      });
      setPieces([...piecesWithNewLocation]);
    }
  };

  const handleCheckPosition = (position) => {
    console.log("chessboard", chessboard, "position", position);
    let positionInformation = chessboard.filter(
      (square) => square.place === position
    );
    return positionInformation[0];
  };
  //checks if the piece is allowed to move from the old position to the new position
  const handleValidMove = (fromPosition, toPosition, pieceType, pieceColor) => {
    switch (pieceType) {
      case "pawn":
        //find the pawns information in the state
        let filteredPawn = pieces.filter(
          (piece) => piece.x === fromPosition[0] && piece.y === +fromPosition[1]
        );
        let isFirstMove = filteredPawn[0].firstMove;
        console.log(fromPosition, toPosition);
        //checks if the pawn is on its first move and if its white
        if (isFirstMove && pieceColor === "white") {
          // if it is first and white then checks the y axis if it was one square up or two squares
          if (
            (toPosition[1] - fromPosition[1] === 2 &&
              fromPosition[0] === toPosition[0]) ||
            (toPosition[1] - fromPosition[1] === 1 &&
              fromPosition[0] === toPosition[0])
          ) {
            //change the first move to false
            let updatedPawn = (filteredPawn[0].firstMove = false);
            //create a new array with the updated pawn to false
            let upDatedPieces = pieces.map((piece) => {
              if (piece.x === fromPosition[0] && piece.y === fromPosition[1]) {
                piece = updatedPawn;
              }
              return piece;
            });
            setPieces([...upDatedPieces]);
            return true;
          }
        } else if (!isFirstMove && pieceColor === "white") {
          //checks if the white piece is only moving one square forward bc its not the first move
          if (
            toPosition[1] - fromPosition[1] === 1 &&
            fromPosition[0] === toPosition[0]
          ) {
            return true;
          } else {
            return false;
          }
        }
        break;
      case "bishop":
        console.log("bishop");
        break;
      case "knight":
        console.log("knight");
        break;
      case "rook":
        console.log("rook");
        break;
      case "queen":
        console.log("queen");
        break;
      case "king":
        console.log("king");
        break;
      default:
        return false;
    }
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
                      color={e.color}
                      position={e.place}
                      pieceType={e.type}
                      movePiece={handleMovePiece}
                      validMove={handleValidMove}
                    />
                  </div>
                );
              } else {
                //black tiles with piece image added
                return (
                  <div key={uuidv4()}>
                    <ChessTile
                      image={e.image}
                      color={e.color}
                      getPosition={getPosition}
                      position={e.place}
                      pieceType={e.type}
                      movePiece={handleMovePiece}
                      validMove={handleValidMove}
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
