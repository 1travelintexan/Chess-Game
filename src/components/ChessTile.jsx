import { useDrag, DragPreviewImage, useDrop } from "react-dnd";

function ChessTile({
  possibleMoveClass,
  white,
  getPosition,
  image,
  position,
  movePiece,
  color,
  pieceType,
  validMove,
  possibleMoves,
  whitePieceTurn,
  setWhitePieceTurn,
  isInCheck,
}) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "piece",
    item: { type: "piece", id: `${position}_${image}_${color}_${pieceType}` },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      let fromPosition = item.id.split("_")[0];
      let toPosition = getPosition();
      let color = item.id.split("_")[2];
      let type = item.id.split("_")[3];
      const isValidMove = validMove(fromPosition, toPosition, type, color);
      if (isValidMove && color === "white" && whitePieceTurn) {
        movePiece(fromPosition, toPosition, color, type);
        setWhitePieceTurn(!whitePieceTurn);
      } else if (isValidMove && color === "black" && !whitePieceTurn) {
        movePiece(fromPosition, toPosition, color, type);
        setWhitePieceTurn(!whitePieceTurn);
      }
    },
  });
  //console.log("position", position, "piece", pieceType, isInCheck);
  return white ? (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className={isInCheck ? "tile king-in-check" : "tile white "}
        ref={drop}
        onClick={(e) => {
          possibleMoves(e, position, pieceType, color);
        }}
      >
        <div className={`${possibleMoveClass}`}></div>
        {image && (
          <img
            src={image}
            alt={`${color}_${pieceType}`}
            className="chess-piece"
            style={{ opacity: isDragging ? 0 : 1 }}
            ref={drag}
          />
        )}
      </div>
    </>
  ) : (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className={isInCheck ? "king-in-check tile" : "tile "}
        ref={drop}
        onClick={(e) => {
          possibleMoves(e, position, pieceType, color);
        }}
      >
        <div className={`${possibleMoveClass}`}></div>
        {image && (
          <img
            src={image}
            alt="piece"
            className="chess-piece"
            style={{ opacity: isDragging ? 0 : 1 }}
            ref={drag}
          />
        )}
      </div>
    </>
  );
}

export default ChessTile;
