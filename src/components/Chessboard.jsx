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
import { useEffect, useState } from "react";

function Chessboard({
  handleWhiteTime,
  handleWhiteTimer,
  isWhiteTiming,
  handleBlackTime,
  handleBeatingClass,
}) {
  const [whitePieceTurn, setWhitePieceTurn] = useState(true);
  const [kingInCheck, setKingInCheck] = useState({
    whiteKing: false,
    blackKing: false,
  });
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
    {
      image: whiteRook,
      type: "rook",
      color: "white",
      x: "a",
      y: 1,
      firstMove: true,
    },
    {
      image: whiteRook,
      type: "rook",
      color: "white",
      x: "h",
      y: 1,
      firstMove: true,
    },
    //white knights
    { image: whiteknight, type: "knight", color: "white", x: "b", y: 1 },
    { image: whiteknight, type: "knight", color: "white", x: "g", y: 1 },
    //white bishops
    {
      image: whiteBishop,
      type: "bishop",
      color: "white",
      x: "c",
      y: 1,
      darkSquare: true,
    },
    {
      image: whiteBishop,
      type: "bishop",
      color: "white",
      x: "f",
      y: 1,
      darkSquare: false,
    },
    //white Queen
    { image: whiteQueen, type: "queen", color: "white", x: "d", y: 1 },
    //white king
    {
      image: whiteKing,
      type: "king",
      color: "white",
      x: "e",
      y: 1,
      firstMove: true,
      isInCheck: false,
    },
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
    {
      image: blackRook,
      type: "rook",
      color: "black",
      x: "a",
      y: 8,
      firstMove: true,
    },
    {
      image: blackRook,
      type: "rook",
      color: "black",
      x: "h",
      y: 8,
      firstMove: true,
    },
    //black knights
    { image: blackknight, type: "knight", color: "black", x: "b", y: 8 },
    { image: blackknight, type: "knight", color: "black", x: "g", y: 8 },
    //white bishops
    {
      image: blackBishop,
      type: "bishop",
      color: "black",
      x: "c",
      y: 8,
      darkSquare: true,
    },
    {
      image: blackBishop,
      type: "bishop",
      color: "black",
      x: "f",
      y: 8,
      darkSquare: false,
    },
    //white Queen
    { image: blackQueen, type: "queen", color: "black", x: "d", y: 8 },
    //black king
    {
      image: blackKing,
      type: "king",
      color: "black",
      x: "e",
      y: 8,
      firstMove: true,
      isInCheck: false,
    },
  ];
  const [chessboard, setChessboard] = useState([]);
  const [pieces, setPieces] = useState(piecesArr);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let copyPieces = JSON.parse(JSON.stringify(pieces));

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
          let isFirstMove;
          let darkSquare;
          let isInCheck;
          pieces.forEach((piece) => {
            if (piece.x === letters[i] && piece.y === j) {
              image = piece.image;
              color = piece.color;
              type = piece.type;
              isFirstMove = piece.firstMove;
              darkSquare = piece.darkSquare;
              isInCheck = piece.isInCheck;
            }
          });

          arr.push({
            place: `${letters[i]}${j}`,
            image,
            color,
            type,
            isFirstMove,
            possibleMoveClass: "",
            darkSquare,
            isInCheck,
          });
        }
      }
    };
    createChessboard();
    setChessboard(arr);
  }, [pieces]);

  // setting king is in check css
  useEffect(() => {
    let newArr = copyPieces.map((e) => {
      if (e.type === "king" && e.color === "white") {
        e.isInCheck = kingInCheck.whiteKing;
      } else if (e.type === "king" && e.color === "black") {
        e.isInCheck = kingInCheck.blackKing;
      }
      return e;
    });
    setPieces(newArr);
  }, [kingInCheck.blackKing, kingInCheck.whiteKing]);

  const checkIfKingInCheck = (piece, position) => {
    console.log("checking");
  };
  const filterSquares = (arr, position) => {
    return arr.filter((e) => e.place === position);
  };
  const setClassForAvailableSquares = (position, pieceType) => {
    let isTheBlackKingInCheck = false;
    let isTheWhiteKingInCheck = false;

    //<============all bishop possible moves=========>
    if (pieceType === "bishop") {
      let chessboardCopy = [...chessboard];
      let allSquares = [];
      let availableSquares = [];
      let letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      let number = JSON.parse(JSON.stringify(Number(position[1])));
      let letter = String.fromCharCode(letterNum);

      //<=========up and right available squares with bishop==============>
      while (number <= 8 && letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        console.log(allSquares[i]);
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }

      //<=========up and left available squares with bishop==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number <= 8 && letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }

      //<=========down and left available squares with bishop==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];

      while (number > 0 && letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }

      //<=========down and right available squares with bishop==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number > 0 && letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      chessboardCopy.map((square) => {
        availableSquares.forEach((availableSquare) => {
          if (
            availableSquare.type === "king" &&
            square.place === availableSquare.place
          ) {
            // //sets state for when a king is in check
            if (availableSquare.color === "black") {
              console.log("The black king is now in check");
              setKingInCheck({ ...kingInCheck, blackKing: true });
              isTheBlackKingInCheck = true;
            } else {
              console.log("The white king is now in check");
              setKingInCheck({ ...kingInCheck, whiteKing: true });
              isTheWhiteKingInCheck = true;
            }
          }
          if (square.place === availableSquare.place) {
            square.possibleMoveClass = "possible-move";
          }
        });
        return square;
      });
    }
    //<============all knight possible moves=========>
    if (pieceType === "knight") {
      let chessboardCopy = [...chessboard];
      let allSquares = [];
      let letter1;
      let letter2;
      //<=========available squares with knight==============>
      for (let i = 1; i <= 8; i++) {
        let letterNum1 = JSON.parse(JSON.stringify(position.charCodeAt(0)));
        let letterNum2 = JSON.parse(JSON.stringify(position.charCodeAt(0)));
        let number = JSON.parse(JSON.stringify(Number(position[1])));
        //handles moving the knight up or down 2 (i is up and down)
        if (i === number + 2 || i === number - 2) {
          letterNum1 = letterNum1 - 1;
          letterNum2 = letterNum2 + 1;
          letter1 = String.fromCharCode(letterNum1);
          letter2 = String.fromCharCode(letterNum2);
          let newSquare1 = `${letter1}${i}`;
          let newSquare2 = `${letter2}${i}`;
          allSquares.push(newSquare1, newSquare2);
        }
        //handles moving the knight up and down one
        else if (i === number + 1 || i === number - 1) {
          letterNum1 = letterNum1 - 2;
          letterNum2 = letterNum2 + 2;
          letter1 = String.fromCharCode(letterNum1);
          letter2 = String.fromCharCode(letterNum2);
          let newSquare1 = `${letter1}${i}`;
          let newSquare2 = `${letter2}${i}`;
          allSquares.push(newSquare1, newSquare2);
        }
      }
      chessboardCopy.map((square) => {
        allSquares.forEach((position) => {
          if (
            square.place === position &&
            square.type === "king" &&
            square.color === "white"
          ) {
            console.log("The white king is now in check");
            setKingInCheck({ ...kingInCheck, whiteKing: true });
            isTheWhiteKingInCheck = true;
          }
          if (
            square.place === position &&
            square.type === "king" &&
            square.color === "black"
          ) {
            console.log("The black king is now in check");
            setKingInCheck({ ...kingInCheck, blackKing: true });
            isTheBlackKingInCheck = true;
          }
          if (square.place === position && square.image === undefined) {
            square.possibleMoveClass = "possible-move";
          }
        });
        return square;
      });
    }
    //<============all rook possible moves=========>
    if (pieceType === "rook") {
      let chessboardCopy = [...chessboard];
      let allSquares = [];
      let availableSquares = [];
      let letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      let number = JSON.parse(JSON.stringify(Number(position[1])));
      let letter = String.fromCharCode(letterNum);

      //<=========up available squares with rook==============>
      while (number <= 8) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========down available squares with rook==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number > 0) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========right available squares with rook==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      //a-h letters, 104 is 'h'
      while (letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========left available squares with rook==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      chessboardCopy.map((square) => {
        availableSquares.forEach((availableSquare) => {
          //<=============write function to handle state of if king is in check then add class to piece
          if (
            availableSquare.type === "king" &&
            square.place === availableSquare.place
          ) {
            // //sets state for when a king is in check
            if (availableSquare.color === "black") {
              console.log("The black king is now in check");
              setKingInCheck({ ...kingInCheck, blackKing: true });
              isTheBlackKingInCheck = true;
            } else {
              console.log("The white king is now in check");
              setKingInCheck({ ...kingInCheck, whiteKing: true });
              isTheWhiteKingInCheck = true;
            }
          }
          if (
            square.place === availableSquare.place &&
            availableSquare.type !== "king"
          ) {
            square.possibleMoveClass = "possible-move";
          }
        });
        return square;
      });
    }
    //<============all queen possible moves=========>
    if (pieceType === "queen") {
      let chessboardCopy = JSON.parse(JSON.stringify(chessboard));
      let allSquares = [];
      let availableSquares = [];
      let letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      let number = JSON.parse(JSON.stringify(Number(position[1])));
      let letter = String.fromCharCode(letterNum);
      //<=========up and right available squares with queen==============>
      while (number <= 8 && letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========up and left available squares with queen==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number <= 8 && letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========down and left available squares with queen (diagonal)==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];

      while (number > 0 && letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========down and right available squares with queen (diagonal)==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number > 0 && letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========up available squares with queen==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number <= 8) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========down available squares with queen==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (number > 0) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        number--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========right available squares with queen==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (letterNum <= 104) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        letterNum++;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //<=========left available squares with queen==============>
      //reset the variables to the starting piece position
      letterNum = JSON.parse(JSON.stringify(position.charCodeAt(0)));
      number = JSON.parse(JSON.stringify(Number(position[1])));
      allSquares = [];
      while (letterNum >= 97) {
        letter = String.fromCharCode(letterNum);
        let changingPosition = `${letter}${number}`;
        let square = filterSquares(chessboardCopy, changingPosition);
        letterNum--;
        allSquares.push(square[0]);
      }
      for (let i = 1; i < allSquares.length; i++) {
        if (allSquares[i].type && allSquares[i].type === "king") {
          availableSquares.push(allSquares[i]);
        }
        if (allSquares[i] && allSquares[i].image === undefined) {
          availableSquares.push(allSquares[i]);
        } else {
          break;
        }
      }
      //mapping over the squares to add all of the possible move classes
      chessboardCopy.map((square) => {
        availableSquares.forEach((availableSquare) => {
          //<=============write function to handle state of if king is in check then add class to piece
          if (
            availableSquare.type === "king" &&
            square.place === availableSquare.place
          ) {
            // //sets state for when a king is in check
            if (availableSquare.color === "black") {
              console.log("The black king is now in check");
              setKingInCheck({ ...kingInCheck, blackKing: true });
              isTheBlackKingInCheck = true;
            } else {
              console.log("The white king is now in check");
              setKingInCheck({ ...kingInCheck, whiteKing: true });
              isTheWhiteKingInCheck = true;
            }
          }
          // puts circle on each square that is available for queen to move
          if (
            square.place === availableSquare.place &&
            availableSquare.type !== "king"
          ) {
            square.possibleMoveClass = "possible-move";
          }
        });
        return square;
      });
      setChessboard(chessboardCopy);
    }
    //<===========all possible king moves==============>
    if (pieceType === "king") {
      let chessboardCopy = [...chessboard];
      let allSquares = [];
      let availableSquares = [];
      let number = JSON.parse(JSON.stringify(Number(position[1])));

      //<==============create a variable for every position around the king=============>
      const frontLeft = `${String.fromCharCode(position.charCodeAt(0) - 1)}${
        number + 1
      }`;
      const frontMiddle = `${String.fromCharCode(position.charCodeAt(0))}${
        number + 1
      }`;
      const frontRight = `${String.fromCharCode(position.charCodeAt(0) + 1)}${
        number + 1
      }`;
      const left = `${String.fromCharCode(
        position.charCodeAt(0) - 1
      )}${number}`;
      const right = `${String.fromCharCode(
        position.charCodeAt(0) + 1
      )}${number}`;
      const backLeft = `${String.fromCharCode(position.charCodeAt(0) - 1)}${
        number - 1
      }`;
      const backMiddle = `${String.fromCharCode(position.charCodeAt(0))}${
        number - 1
      }`;
      const backRight = `${String.fromCharCode(position.charCodeAt(0) + 1)}${
        number - 1
      }`;

      //push into the allSquares array
      allSquares.push(
        frontLeft,
        frontMiddle,
        frontRight,
        left,
        right,
        backLeft,
        backMiddle,
        backRight
      );
      //<==========filter out all of the squares that have a piece already on them ==============>
      let filteredSquares = allSquares.filter((e) => !e.includes("0"));
      for (let i = 0; i < filteredSquares.length; i++) {
        let square = filterSquares(chessboardCopy, allSquares[i]);
        if (square && square[0].image === undefined) {
          availableSquares.push(square[0]);
        }
      }
      chessboardCopy.map((square) => {
        availableSquares.forEach((availableSquare) => {
          if (square.place === availableSquare.place) {
            square.possibleMoveClass = "possible-move";
          }
        });
        return square;
      });
    }
    return [isTheWhiteKingInCheck, isTheBlackKingInCheck];
  };

  const findIndexOfObject = (arr, coordinate) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].place === coordinate) {
        return i;
      } else if (arr[i].x === coordinate[0] && arr[i].y === +coordinate[1]) {
        return i;
      }
    }
    return -1;
  };

  const getPosition = () => {
    let boardStartX = window.innerWidth / 2 - (window.innerHeight * 0.8) / 2;
    let boardStartY = (window.innerHeight - window.innerHeight * 0.8) / 2;
    let squareSize = (window.innerHeight * 0.8) / 8;
    let boardSize = window.innerHeight * 0.8;
    const mouseX = window.event.clientX - 25;
    const mouseY = window.event.clientY + 20;
    let position = "";

    // set letters of position based on the cursor position
    if (mouseX > boardStartX && mouseX < boardStartX + squareSize) {
      position += "a";
    } else if (
      mouseX > boardStartX + squareSize &&
      mouseX < boardStartX + squareSize * 2
    ) {
      position += "b";
    } else if (
      mouseX > boardStartX + squareSize * 2 &&
      mouseX < boardStartX + squareSize * 3
    ) {
      position += "c";
    } else if (
      mouseX > boardStartX + squareSize * 3 &&
      mouseX < boardStartX + squareSize * 4
    ) {
      position += "d";
    } else if (
      mouseX > boardStartX + squareSize * 4 &&
      mouseX < boardStartX + squareSize * 5
    ) {
      position += "e";
    } else if (
      mouseX > boardStartX + squareSize * 5 &&
      mouseX < boardStartX + squareSize * 6
    ) {
      position += "f";
    } else if (
      mouseX > boardStartX + squareSize * 6 &&
      mouseX < boardStartX + squareSize * 7
    ) {
      position += "g";
    } else if (
      mouseX > boardStartX + squareSize * 7 &&
      mouseX < boardStartX + squareSize * 8
    ) {
      position += "h";
    }

    //set the numbers of the position based on the cursor position and the screen size
    if (mouseY > boardStartY && mouseY < boardStartY + squareSize) {
      position += "8";
    } else if (
      mouseY < boardStartY + boardSize - squareSize * 6 &&
      mouseY > boardStartY + boardSize - squareSize * 8
    ) {
      position += "7";
    } else if (
      mouseY < boardStartY + boardSize - squareSize * 5 &&
      mouseY > boardStartY + boardSize - squareSize * 7
    ) {
      position += "6";
    } else if (
      mouseY < boardStartY + boardSize - squareSize * 4 &&
      mouseY > boardStartY + boardSize - squareSize * 6
    ) {
      position += "5";
    } else if (
      mouseY < boardStartY + boardSize - squareSize * 3 &&
      mouseY > boardStartY + boardSize - squareSize * 5
    ) {
      position += "4";
    } else if (
      mouseY < boardStartY + boardSize - squareSize * 2 &&
      mouseY > boardStartY + boardSize - squareSize * 4
    ) {
      position += "3";
    } else if (
      mouseY < boardStartY + boardSize - squareSize &&
      mouseY > boardStartY + boardSize - squareSize * 3
    ) {
      position += "2";
    } else if (
      mouseY < boardStartY + boardSize &&
      mouseY > boardStartY + boardSize - squareSize * 2
    ) {
      position += "1";
    }
    return position;
  };

  const handleMovePiece = (from, to, movingPieceColor, pieceType) => {
    let positionInformation = handleCheckPosition(to);
    console.log("falsdkfja", setClassForAvailableSquares(to, pieceType));
    setClassForAvailableSquares(to, pieceType);
    //white king short castle
    if (pieceType === "king" && movingPieceColor === "white" && to === "g1") {
      let whiteKing = pieces.filter(
        (e) => e.type === "king" && e.color === "white"
      );
      let rookH1 = pieces.filter(
        (e) => e.type === "rook" && e.x === "h" && e.y === 1
      );
      let g1SquareIsEmpty = pieces.filter((e) => {
        return e.x === to[0] && e.y === Number(to[1]);
      });
      if (
        g1SquareIsEmpty.length === 0 &&
        whiteKing[0].firstMove &&
        rookH1[0].firstMove
      ) {
        //map over pieces and update the x and y of the white king and rook
        let newPieces = pieces.map((e) => {
          let piecePlace = `${e.x}${e.y}`;
          if (piecePlace === "e1") {
            e.x = "g";
            e.y = 1;
            e.firstMove = false;
          } else if (piecePlace === "h1") {
            e.x = "f";
            e.y = 1;
            e.firstMove = false;
          }
          return e;
        });
        setPieces(newPieces);
      }
    }
    //white king long  castle
    else if (
      pieceType === "king" &&
      movingPieceColor === "white" &&
      to === "c1"
    ) {
      let whiteKing = pieces.filter(
        (e) => e.type === "king" && e.color === "white"
      );
      let rookA8 = pieces.filter(
        (e) => e.type === "rook" && e.x === "a" && e.y === 1
      );
      let c1SquareIsEmpty = pieces.filter((e) => {
        return e.x === to[0] && e.y === Number(to[1]);
      });
      if (
        c1SquareIsEmpty.length === 0 &&
        whiteKing[0].firstMove &&
        rookA8[0].firstMove
      ) {
        //map over pieces and update the x and y of the white king and rook
        let newPieces = pieces.map((e) => {
          let piecePlace = `${e.x}${e.y}`;
          if (piecePlace === "e1") {
            e.x = "c";
            e.y = 1;
            e.firstMove = false;
          } else if (piecePlace === "a1") {
            e.x = "d";
            e.y = 1;
            e.firstMove = false;
          }
          return e;
        });
        setPieces(newPieces);
      }
    } else if (
      //black king short castle
      pieceType === "king" &&
      movingPieceColor === "black" &&
      to === "g8"
    ) {
      let blackKing = pieces.filter(
        (e) => e.type === "king" && e.color === "black"
      );
      let rookH8 = pieces.filter(
        (e) => e.type === "rook" && e.x === "h" && e.y === 8
      );
      let g1SquareIsEmpty = pieces.filter((e) => {
        return e.x === to[0] && e.y === Number(to[1]);
      });
      if (
        g1SquareIsEmpty.length === 0 &&
        blackKing[0].firstMove &&
        rookH8[0].firstMove
      ) {
        //map over pieces and update the x and y of the black king and rook
        let newPieces = pieces.map((e) => {
          let piecePlace = `${e.x}${e.y}`;
          if (piecePlace === "e8") {
            e.x = "g";
            e.y = 8;
            e.firstMove = false;
          } else if (piecePlace === "h8") {
            e.x = "f";
            e.y = 8;
            e.firstMove = false;
          }
          return e;
        });
        setPieces(newPieces);
      }
    }
    //black king long  castle
    else if (
      pieceType === "king" &&
      movingPieceColor === "black" &&
      to === "c8"
    ) {
      let blackKing = pieces.filter(
        (e) => e.type === "king" && e.color === "black"
      );
      let rookA8 = pieces.filter(
        (e) => e.type === "rook" && e.x === "a" && e.y === 8
      );
      let c8SquareIsEmpty = pieces.filter((e) => {
        return e.x === to[0] && e.y === Number(to[1]);
      });
      if (
        c8SquareIsEmpty.length === 0 &&
        blackKing[0].firstMove &&
        rookA8[0].firstMove
      ) {
        //map over pieces and update the x and y of the black king and rook
        let newPieces = pieces.map((e) => {
          let piecePlace = `${e.x}${e.y}`;
          if (piecePlace === "e8") {
            e.x = "c";
            e.y = 8;
            e.firstMove = false;
          } else if (piecePlace === "a8") {
            e.x = "d";
            e.y = 8;
            e.firstMove = false;
          }
          return e;
        });
        setPieces(newPieces);
      }
    }
    //if a piece is on the 'to' square, then filter it from the pieces list and replace the image for that square
    else if (
      positionInformation.image &&
      positionInformation["color"] !== movingPieceColor
    ) {
      let movingPiece = pieces.filter((e) => {
        if (e.x === from[0] && e.y === +from[1]) {
          return e;
        } else {
          return null;
        }
      });
      //eating pieces
      let indexOfEatenPiece = findIndexOfObject(pieces, to);
      let piecesCopy = [...pieces];
      movingPiece[0].x = to[0];
      movingPiece[0].y = +to[1];
      piecesCopy.splice(indexOfEatenPiece, 1);
      setPieces(piecesCopy);
    } else if (positionInformation["color"] === movingPieceColor) {
      // don't do anything if they are the same color
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
    //handles the white and black timer by resetting them back to 5 every move & toggling the classes for the beating timers
    if (isWhiteTiming) {
      handleWhiteTime(5);
      handleWhiteTimer(false);
      handleBeatingClass({ white: undefined, black: "beating-class-black" });
    } else {
      handleBlackTime(5);
      handleWhiteTimer(true);
      handleBeatingClass({ white: "beating-class-white", black: undefined });
    }

    //check when you move a piece if the king is now in check
    // let kingIsInCheck = setClassForAvailableSquares(to, pieceType);

    // if (kingIsInCheck.whiteKing) {
    //   console.log("white king in check!");
    //   setKingInCheck({ ...kingInCheck, whiteKing: true });
    // } else if (kingIsInCheck.blackKing) {
    //   console.log("black king in check!");
    //   setKingInCheck({ ...kingInCheck, blackKing: true });
    // } else if (
    //   kingIsInCheck.blackKing === true &&
    //   kingIsInCheck.whiteKing === true
    // ) {
    //   console.log("both kings in check");
    //   setKingInCheck({ whiteKing: true, blackKing: true });
    // } else {
    //   console.log("neither king in check");
    //   setKingInCheck({ whiteKing: false, blackKing: false });
    // }
  };

  const handleCheckPosition = (position) => {
    let positionInformation = chessboard.filter(
      (square) => square.place === position
    );
    return positionInformation[0];
  };

  //checks what are the possible moves and adds a class to those possible squares
  const handlePossibleMoves = (event, position, pieceType, pieceColor) => {
    let chessboardCopy = [...chessboard];

    //erase all classes of possible moves
    chessboardCopy.map((e) => (e.possibleMoveClass = ""));
    setChessboard(chessboardCopy);

    let clickedPieceArr = chessboard.filter(
      (square) => square.place === position
    );
    let clickedPiece = clickedPieceArr[0];
    switch (clickedPiece.type) {
      case "pawn":
        //<============white pawn possible moves =================>
        if (clickedPiece.color === "white") {
          if (clickedPiece.isFirstMove) {
            let column = clickedPiece.place[0];
            let number = +clickedPiece.place[1];

            let possibleSquares = [
              `${column}${number + 1}`,
              `${column}${number + 2}`,
            ];
            chessboardCopy = [...chessboard];
            let filteredSquares = chessboardCopy
              .filter((e) => {
                if (
                  e.place === possibleSquares[0] ||
                  e.place === possibleSquares[1] ||
                  e.place === possibleSquares[2] ||
                  e.place === possibleSquares[3]
                ) {
                  return e;
                } else {
                  return null;
                }
              })
              .map((e) => {
                if (e.image !== undefined && e.place === possibleSquares[0]) {
                  e.possibleMoveClass = "";
                } else if (e.image === undefined) {
                  e.possibleMoveClass = "possible-move";
                } else {
                  e.possibleMoveClass = "possible-move-with-piece-on-square";
                }
                return e;
              });
            let index1 = findIndexOfObject(
              chessboard,
              filteredSquares[0].place
            );
            let index2 = findIndexOfObject(
              chessboard,
              filteredSquares[1].place
            );

            chessboardCopy.splice(index1, 1, filteredSquares[0]);
            chessboardCopy.splice(index2, 1, filteredSquares[1]);
            setChessboard(chessboardCopy);
          } else {
            //if it is not the white pawns first move
            let column = clickedPiece.place[0];
            let number = +clickedPiece.place[1];
            let columnLeftCharCode = clickedPiece.place.charCodeAt(0) - 1;
            let columnLeftLetter = String.fromCharCode(columnLeftCharCode);
            let columnRightCharCode = clickedPiece.place.charCodeAt(0) + 1;
            let columnRightLetter = String.fromCharCode(columnRightCharCode);

            let possibleSquares = [
              `${column}${number + 1}`,
              `${columnLeftLetter}${number + 1}`,
              `${columnRightLetter}${number + 1}`,
            ];
            chessboardCopy = [...chessboard];
            chessboardCopy
              .filter((e) => {
                if (
                  e.place === possibleSquares[0] ||
                  e.place === possibleSquares[1] ||
                  e.place === possibleSquares[2]
                ) {
                  return e;
                } else {
                  return null;
                }
              })
              .map((e) => {
                if (e.image !== undefined && e.place === possibleSquares[0]) {
                  e.possibleMoveClass = "";
                } else if (e.image === undefined) {
                  e.possibleMoveClass = "possible-move";
                } else {
                  e.possibleMoveClass = "possible-move-with-piece-on-square";
                }
                return e;
              });
            setChessboard(chessboardCopy);
          }
        } else {
          //<===========black pawns=======>
          if (clickedPiece.isFirstMove) {
            let column = clickedPiece.place[0];
            let number = +clickedPiece.place[1];
            let possibleSquares = [
              `${column}${number - 1}`,
              `${column}${number - 2}`,
            ];
            chessboardCopy = [...chessboard];
            let filteredSquares = chessboardCopy
              .filter((e) => {
                if (
                  e.place === possibleSquares[0] ||
                  e.place === possibleSquares[1]
                ) {
                  return e;
                } else {
                  return null;
                }
              })
              .map((e) => {
                if (e.image !== undefined && e.place === possibleSquares[0]) {
                  e.possibleMoveClass = "";
                } else if (e.image === undefined) {
                  e.possibleMoveClass = "possible-move";
                } else {
                  e.possibleMoveClass = "possible-move-with-piece-on-square";
                }
                return e;
              });
            let index1 = findIndexOfObject(
              chessboard,
              filteredSquares[0].place
            );
            let index2 = findIndexOfObject(
              chessboard,
              filteredSquares[1].place
            );
            chessboardCopy.splice(index1, 1, filteredSquares[0]);
            chessboardCopy.splice(index2, 1, filteredSquares[1]);
            setChessboard(chessboardCopy);
          } else {
            let column = clickedPiece.place[0];
            let number = +clickedPiece.place[1];
            let columnLeftCharCode = clickedPiece.place.charCodeAt(0) - 1;
            let columnLeftLetter = String.fromCharCode(columnLeftCharCode);
            let columnRightCharCode = clickedPiece.place.charCodeAt(0) + 1;
            let columnRightLetter = String.fromCharCode(columnRightCharCode);

            let possibleSquares = [
              `${column}${number - 1}`,
              `${columnLeftLetter}${number - 1}`,
              `${columnRightLetter}${number - 1}`,
            ];
            chessboardCopy = [...chessboard];
            let filteredSquares = chessboardCopy
              .filter((e) => {
                if (
                  e.place === possibleSquares[0] ||
                  e.place === possibleSquares[1] ||
                  e.place === possibleSquares[2]
                ) {
                  return e;
                } else {
                  return null;
                }
              })
              .map((e) => {
                if (e.image !== undefined && e.place === possibleSquares[0]) {
                  e.possibleMoveClass = "";
                } else if (e.image === undefined) {
                  e.possibleMoveClass = "possible-move";
                } else {
                  e.possibleMoveClass = "possible-move-with-piece-on-square";
                }
                return e;
              });
            let index1 = findIndexOfObject(
              chessboard,
              filteredSquares[0].place
            );
            chessboardCopy.splice(index1, 1, filteredSquares[0]);
            setChessboard(chessboardCopy);
          }
        }
        break;
      case "bishop":
        setClassForAvailableSquares(clickedPiece.place, clickedPiece.type);
        break;
      case "knight":
        setClassForAvailableSquares(clickedPiece.place, clickedPiece.type);
        break;
      case "rook":
        setClassForAvailableSquares(clickedPiece.place, clickedPiece.type);
        break;
      case "queen":
        setClassForAvailableSquares(clickedPiece.place, clickedPiece.type);
        break;
      case "king":
        setClassForAvailableSquares(clickedPiece.place, clickedPiece.type);
        break;
      default:
        return;
    }
  };

  //checks if the piece is allowed to move from the old position to the new position
  const handleValidMove = (fromPosition, toPosition, pieceType, pieceColor) => {
    switch (pieceType) {
      case "pawn":
        //find the pawns information in the state
        let filteredPawn = pieces.filter(
          (piece) => piece.x === fromPosition[0] && piece.y === +fromPosition[1]
        );
        let toSquare = chessboard.filter(
          (square) => square.place === toPosition
        );
        let isFirstMove = filteredPawn[0].firstMove;
        //attacking squares for white pawns
        let number = +fromPosition[1];
        let columnLeftCharCode = fromPosition.charCodeAt(0) - 1;
        let columnLeftLetter = String.fromCharCode(columnLeftCharCode);
        let columnRightCharCode = fromPosition.charCodeAt(0) + 1;
        let columnRightLetter = String.fromCharCode(columnRightCharCode);
        let squaresAttackedByPawn = [
          `${columnLeftLetter}${number + 1}`,
          `${columnRightLetter}${number + 1}`,
        ];
        //if there is a black piece where the pawn can attack it, remove the black piece and set isFirstMove to false
        if (
          (toPosition === squaresAttackedByPawn[0] ||
            toPosition === squaresAttackedByPawn[1]) &&
          toSquare[0].color === "black"
        ) {
          let updatedPawnWhite = (filteredPawn[0].firstMove = false);
          //create a new array with the updated pawn to false

          let upDatedPieces = pieces.map((piece) => {
            if (piece.x === fromPosition[0] && piece.y === fromPosition[1]) {
              piece = updatedPawnWhite;
            }
            return piece;
          });
          setPieces([...upDatedPieces]);
          console.log("valid move");
          return true;
        }
        //if there is a white piece where a black pawn can take it, the remove the white piece and set first move to false
        //attacking squares for white pawns
        let columnLeftCharCodeBlack = fromPosition.charCodeAt(0) - 1;
        let columnLeftLetterBlack = String.fromCharCode(
          columnLeftCharCodeBlack
        );
        let columnRightCharCodeBlack = fromPosition.charCodeAt(0) + 1;
        let columnRightLetterBlack = String.fromCharCode(
          columnRightCharCodeBlack
        );
        let squaresAttackedByPawnBlack = [
          `${columnLeftLetterBlack}${number - 1}`,
          `${columnRightLetterBlack}${number - 1}`,
        ];
        if (
          (toPosition === squaresAttackedByPawnBlack[0] ||
            toPosition === squaresAttackedByPawnBlack[1]) &&
          toSquare[0].color === "white"
        ) {
          let updatedPawnBlack = (filteredPawn[0].firstMove = false);
          //create a new array with the updated pawn to false

          let upDatedPieces = pieces.map((piece) => {
            if (piece.x === fromPosition[0] && piece.y === fromPosition[1]) {
              piece = updatedPawnBlack;
            }
            return piece;
          });
          setPieces([...upDatedPieces]);
          console.log("valid move");
          return true;
        }
        //<=================white pawns==================>
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
            let updatedPawnWhite = (filteredPawn[0].firstMove = false);
            //create a new array with the updated pawn to false
            let upDatedPieces = pieces.map((piece) => {
              if (piece.x === fromPosition[0] && piece.y === fromPosition[1]) {
                piece = updatedPawnWhite;
              }
              return piece;
            });
            setPieces([...upDatedPieces]);
            console.log("valid move");
            return true;
          }
        } else if (!isFirstMove && pieceColor === "white") {
          //checks if the white piece is only moving one square forward bc its not the first move
          if (
            toPosition[1] - fromPosition[1] === 1 &&
            fromPosition[0] === toPosition[0]
          ) {
            console.log("valid move");
            return true;
          } else {
            console.log("not a valid move");
            return false;
          }
        }
        //<=================black pawns==================>
        else if (isFirstMove && pieceColor === "black") {
          // if it is first and white then checks the y axis if it was one square up or two squares
          if (
            (fromPosition[1] - toPosition[1] === 2 &&
              toPosition[0] === fromPosition[0]) ||
            (fromPosition[1] - toPosition[1] === 1 &&
              toPosition[0] === fromPosition[0])
          ) {
            //change the first move to false
            let updatedPawnBlack = (filteredPawn[0].firstMove = false);
            //create a new array with the updated pawn to false
            let upDatedPieces = pieces.map((piece) => {
              if (piece.x === fromPosition[0] && piece.y === fromPosition[1]) {
                piece = updatedPawnBlack;
              }
              return piece;
            });
            setPieces([...upDatedPieces]);
            return true;
          }
        } else if (!isFirstMove && pieceColor === "black") {
          //checks if the white piece is only moving one square forward bc its not the first move
          if (
            fromPosition[1] - toPosition[1] === 1 &&
            toPosition[0] === fromPosition[0]
          ) {
            return true;
          } else {
            return false;
          }
        }
        break;
      case "bishop":
        return true;
      case "knight":
        return true;
      case "rook":
        return true;
      case "queen":
        return true;
      case "king":
        return true;
      default:
        return true;
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
                      possibleMoveClass={e.possibleMoveClass}
                      white={"white"}
                      image={e.image}
                      getPosition={getPosition}
                      color={e.color}
                      position={e.place}
                      pieceType={e.type}
                      movePiece={handleMovePiece}
                      validMove={handleValidMove}
                      possibleMoves={handlePossibleMoves}
                      whitePieceTurn={whitePieceTurn}
                      setWhitePieceTurn={setWhitePieceTurn}
                      isInCheck={e.isInCheck}
                    />
                  </div>
                );
              } else {
                //black tiles with piece image added
                return (
                  <div key={uuidv4()}>
                    <ChessTile
                      possibleMoveClass={e.possibleMoveClass}
                      image={e.image}
                      color={e.color}
                      getPosition={getPosition}
                      position={e.place}
                      pieceType={e.type}
                      movePiece={handleMovePiece}
                      validMove={handleValidMove}
                      possibleMoves={handlePossibleMoves}
                      whitePieceTurn={whitePieceTurn}
                      setWhitePieceTurn={setWhitePieceTurn}
                      isInCheck={e.isInCheck}
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
