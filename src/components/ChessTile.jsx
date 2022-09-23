import { useDrag, DragPreviewImage, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

function ChessTile({ white, piece, getPosition, image, position }) {
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
      let position = getPosition();
      console.log("here is the item", item, "position", position);
    },
  });

  return white ? (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className="tile white"
        ref={drop}
        // onClick={(e) => {
        //   getPosition(e);
        // }}
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
  ) : (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className="tile"
        ref={drop}
        // onClick={(e) => {
        //   getPosition(e);
        // }}
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
