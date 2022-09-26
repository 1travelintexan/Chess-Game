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
      if (isValidMove) {
        movePiece(fromPosition, toPosition, color, type);
      }
    },
  });

  return white ? (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className={`tile white ${possibleMoveClass}`}
        ref={drop}
        onClick={(e) => {
          possibleMoves(e, position, pieceType, color);
        }}
      >
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
        className={`tile ${possibleMoveClass}`}
        ref={drop}
        onClick={(e) => {
          possibleMoves(e, position, pieceType, color);
        }}
      >
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
