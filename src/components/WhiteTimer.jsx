function WhiteTimer({ whiteTime, beatingClass, whitePlayer }) {
  return (
    <div id="white-timer">
      <h1 id="white-player">{whitePlayer}</h1>
      <h1 className={`time ${beatingClass}`}>0{whiteTime}</h1>
    </div>
  );
}

export default WhiteTimer;
