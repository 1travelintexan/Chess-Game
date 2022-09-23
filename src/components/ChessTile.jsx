import { useDrag, DragPreviewImage, useDrop } from "react-dnd";

function ChessTile({ white, getPosition, image, position, movePiece }) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "piece",
    item: { type: "piece", id: `${position}_${image}` },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      let fromPosition = item.id.split("_")[0];
      let toPosition = getPosition();
      movePiece(fromPosition, toPosition);
    },
  });

  return white ? (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div className="tile white" ref={drop}>
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
  ) : (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div className="tile" ref={drop}>
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
