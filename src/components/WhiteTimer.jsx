function WhiteTimer({ whiteTime, beatingClass, whitePlayer, showName }) {
  return (
    <div id="white-timer">
      {showName ? <h1 id="white-player">{whitePlayer}</h1> : null}
      <h1 className={`time ${beatingClass}`}>0{whiteTime}</h1>
    </div>
  );
}

export default WhiteTimer;
