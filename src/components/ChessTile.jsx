function ChessTile({ white, piece }) {
  console.log(piece);
  return (
    <span className={`tile ${white}`}>
      {piece && <img src={piece} alt="piece" className="piece" />}
    </span>
  );
}

export default ChessTile;
