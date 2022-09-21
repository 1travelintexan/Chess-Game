function ChessTile({ white, piece }) {
  return (
    <div className={`tile ${white}`}>
      {piece && (
        <div
          style={{
            backgroundImage: `url(${piece})`,
            height: "80px",
            width: "80px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "80px",
          }}
        ></div>
      )}
    </div>
  );
}

export default ChessTile;
